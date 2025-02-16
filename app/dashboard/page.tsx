"use client";

import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        return (
            window.location.href = '/access'
        );
    }
    const checkstatus = async () => {
        try {
            const res = await fetch('/api/shorten', { method: "POST" })
            const json = await res.json();
            console.log(json)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
            <div className="mt-4">
                <p><strong>Name:</strong> {session?.user?.name}</p>
                <p><strong>Email:</strong> {session?.user?.email}</p>
                {session?.user?.image && (
                    <img src={session.user.image} alt="User Avatar" className="w-20 h-20 rounded-full" />
                )}
            </div>
            <button
                onClick={checkstatus}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
                Check
            </button>

            <button
                onClick={() => signOut()}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
                Sign Out
            </button>
        </div>
    );
}
