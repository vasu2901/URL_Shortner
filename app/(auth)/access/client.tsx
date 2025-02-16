"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import va from "@vercel/analytics";
import { signIn } from "next-auth/react";

export const Access = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [userIntent, setUserIntent] = useState(
        searchParams?.get("intent") === "signup" ? "signup" : "signin",
    );



    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
            <button
                className="flex h-12 w-full gap-x-4 border-2 bg-white text-slate-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                onClick={() => {
                    va?.track("login-google");
                    signIn("google", { callbackUrl: "/dashboard" });
                }}
            >
                {/* <Icons.google className="h-8 w-8 rounded-full bg-white p-1" /> */}
                Continue with Google
            </button>
        </div>
    );
};