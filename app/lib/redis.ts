// @ts-ignore
import { Redis } from "@upstash/redis";

const isLive = process.env.KV_REST_API_URL !== undefined;
let redis: Redis;
if (!isLive) {
    console.log('Using "local" for Redis connection');
    redis = new Redis({
        url: process.env.KV_URL as string,
        token: process.env.KV_REST_API_TOKEN as string,
        // agent: new https.Agent({ keepAlive: true }),
        enableTelemetry: false,
    });
} else {
    console.log('Using "upstash integration" for Redis connection');
    redis = Redis.fromEnv();
}

export { redis };