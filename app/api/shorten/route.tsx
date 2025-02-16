import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function POST(req: NextRequest) {
    console.log(req)
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Invalid User" }, { status: 400 })
    }
    const json = await req.json();

    try {


    } catch (error) {

    }

    return NextResponse.json({ message: "Api Working" }, { status: 200 })
}