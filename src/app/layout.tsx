import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solar Panel Hub - Authentication & Information Center",
  description: "Centralized hub for solar panel information and authentication. Find your solar panel brand and access barcode verification systems.",
  keywords: "solar panels, authentication, barcode, Longi, Canadian Solar, solar energy, solar verification",
  authors: [{ name: "Solar Panel Hub" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
