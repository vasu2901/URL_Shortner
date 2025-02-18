import { db } from "@/app/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Invalid User" }, { status: 400 })
    }
    try {
        const url = new URL(req.url)
        const alias: string = url.searchParams.get('alias') || ""
        const Url = await db.url.findFirst({
            where: {
                alias: alias
            },
            select: {
                url_id: true,
                analytics: true
            }
        })
        if (!Url) {
            throw new Error("Invalid Alias.")
        }
        return NextResponse.json(Url.analytics, { status: 200 })
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}