// src/app/layout.tsx
"use client";

import { Providers } from "./providers";
import { ReactNode } from "react";
import './globals.css'
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
