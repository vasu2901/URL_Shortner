import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000/api/shorten"; // Use your API route

describe("GET /api/shorten", () => {
    it("should return a shortened URL when alias is provided", async () => {
        const alias = "serpwev1";
        const response = await fetch(`${BASE_URL}?alias=${alias}`);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toHaveProperty("message");
        expect(data.message).toBeDefined();
    });

    it("should return 404 when alias is missing", async () => {
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();

        expect(response.status).toBe(404);
        expect(data).toHaveProperty("error", "No alias found");
    });

    it("should return 400 for POST requests", async () => {
        const response = await fetch(`${BASE_URL}`, { method: "POST" });

        expect(response.status).toBe(400);
    });
});
