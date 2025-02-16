// src/app/api/auth/[...nextauth]/route.tsx
import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth";

// ✅ Correctly export for both GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
