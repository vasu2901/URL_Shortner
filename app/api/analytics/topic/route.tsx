import { db } from "@/app/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Invalid User" }, { status: 400 })
    }
    try {
        const url = new URL(req.url)
        const topic: string = url.searchParams.get('topic') || ""
        const data = await db.url.findMany({
            where: {
                topic: topic
            },
            select: {
                url_id: true,
                analytics: true
            }
        })
        return NextResponse.json(data, { status: 200 })
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}