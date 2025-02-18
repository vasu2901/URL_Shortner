import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Invalid User" }, { status: 401 });
    }

    try {
        const userEmail = session.user?.email || "";

        // Check Redis cache
        // const cacheKey = `overall_analytics:${userEmail}`;
        // const cachedData = await redis.get(cacheKey);

        // if (cachedData) {
        //     console.log("Cache Hit");
        //     return NextResponse.json(JSON.parse(cachedData), { status: 200 });
        // }

        const user = await db.user.findUnique({
            where: { email: userEmail },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const urls = await db.url.findMany({
            where: { user_id: user.id },
            select: {
                alias: true,
                analytics: true,
            },
        });

        if (!urls.length) {
            return NextResponse.json({ message: "No URLs found for this user" }, { status: 200 });
        }

        let totalClicks = 0;
        let uniqueUsers = new Set();
        let _clicksByDate: Record<any, number> = {};
        let osTypeStats: any = {};
        let deviceTypeStats: any = {};
        let aliasurls: string[] = []

        urls.forEach(url => {

            if (!url.analytics) return;

            aliasurls.push(url.alias)

            totalClicks += url.analytics.totalClicks;

            url.analytics.IPS?.forEach(ip => uniqueUsers.add(ip));

            url.analytics.clicksByDate.forEach((entry: any) => {
                console.log(entry)
                if (!_clicksByDate[entry?.date]) {
                    _clicksByDate[entry?.date] = 0;
                }
                _clicksByDate[entry?.date] += entry?.count;
            });


            url.analytics.osType.forEach((osEntry: any) => {
                if (!osTypeStats[osEntry?.osName]) {
                    osTypeStats[osEntry?.osName] = { uniqueClicks: 0, uniqueUsers: 0 };
                }
                osTypeStats[osEntry?.osName].uniqueClicks += osEntry.uniqueClicks;
                osTypeStats[osEntry?.osName].uniqueUsers += osEntry.uniqueUsers;
            });

            url.analytics.deviceType.forEach((deviceEntry: any) => {
                if (!deviceTypeStats[deviceEntry.deviceName]) {
                    deviceTypeStats[deviceEntry.deviceName] = { uniqueClicks: 0, uniqueUsers: 0 };
                }
                deviceTypeStats[deviceEntry.deviceName].uniqueClicks += deviceEntry.uniqueClicks;
                deviceTypeStats[deviceEntry.deviceName].uniqueUsers += deviceEntry.uniqueUsers;
            });
        });
        console.log(_clicksByDate)
        const analyticsResponse = {
            totalUrls: urls.length,
            totalClicks,
            uniqueUsers: uniqueUsers.size,
            clicksByDate: Object.keys(_clicksByDate).map(date => ({
                date,
                clicks: _clicksByDate[date],
            })),
            osType: Object.keys(osTypeStats).map(osName => ({
                osName,
                ...osTypeStats[osName],
            })),
            deviceType: Object.keys(deviceTypeStats).map(deviceName => ({
                deviceName,
                ...deviceTypeStats[deviceName],
            })),
            alias: aliasurls
        };

        // await redis.setex(cacheKey, 300, JSON.stringify(analyticsResponse));

        return NextResponse.json(analyticsResponse, { status: 200 });

    } catch (error) {
        console.error("Error fetching overall analytics:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
