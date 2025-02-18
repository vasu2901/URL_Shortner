import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { db } from "@/app/lib/db";
import { parseUserAgent, updateClicksByDate, updateOSType, updateDeviceType } from '@/app/lib/analyticsUtils';
function generateRandomAlias(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let alias = '';
    for (let i = 0; i < length; i++) {
        alias += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return alias;
}

export async function GET(req: NextRequest) {
    const _url = new URL(req.url)
    const slug = _url.searchParams.get("alias")
    if (!slug) {
        return NextResponse.json({ error: "No alias found" }, { status: 404 })
    }
    try {
        console.log(req.headers)
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        const userAgent = req.headers.get('user-agent') || '';
        const { osName, deviceName } = parseUserAgent(userAgent);
        const today = new Date().toISOString().split('T')[0];

        // Find the URL
        const url = await db.url.findUnique({
            where: { alias: slug },
            include: { analytics: true }
        });

        if (!url) {
            return NextResponse.json({ error: 'URL not found' }, { status: 404 });
        }

        let analytics = await db.analytics.findUnique({
            where: { url_id: url.url_id }
        });
        if (!analytics) {
            analytics = await db.analytics.create({
                data: {
                    url_id: url.url_id,
                    totalClicks: 0,
                    uniqueUsers: 0,
                    clicksByDate: [],
                    osType: [],
                    deviceType: [],
                    IPS: []
                }
            });
        }

        const totalClicks = analytics.totalClicks + 1;

        let uniqueUsers = analytics.uniqueUsers;
        if (!analytics.IPS.includes(ip)) {
            uniqueUsers += 1;
            analytics.IPS.push(ip);
        }

        const clicksByDate = updateClicksByDate(analytics.clicksByDate, today);

        const osType = updateOSType(analytics.osType, osName, ip);

        const deviceType = updateDeviceType(analytics.deviceType, deviceName, ip);

        await db.analytics.update({
            where: { url_id: url.url_id },
            data: {
                totalClicks,
                uniqueUsers,
                clicksByDate,
                osType,
                deviceType,
                IPS: analytics.IPS
            }
        });
        return NextResponse.json({ message: url?.long_url }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Api not Working" }, { status: 400 })
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Invalid User" }, { status: 400 })
    }
    try {
        let { longUrl, customAlias, topic } = await req.json();
        if (!customAlias) {
            customAlias = generateRandomAlias()
        }
        const user = await db.user.findUnique({
            where: {
                email: session.user?.email as string
            },
            select: {
                id: true
            }
        })
        await db.url.create({
            data: {
                long_url: longUrl as string,
                alias: customAlias as string,
                topic: topic as string,
                user_id: user?.id as string,
            }
        })
        return NextResponse.json({ message: `${process.env.NEXTAUTH_URL}${customAlias}` }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Api not Working" }, { status: 400 })
    }


}