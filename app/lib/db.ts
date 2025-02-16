import { PrismaClient } from "@prisma/client";

declare global {
    var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!globalThis.cachedPrisma) {
        console.log("creating new prisma client", process.env.NODE_ENV);
        globalThis.cachedPrisma = new PrismaClient({
        });

    }
    prisma = global.cachedPrisma;
}

export const db = prisma;