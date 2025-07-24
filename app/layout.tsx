import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Geist_Mono } from "next/font/google";
import "./globals.css";

// Load Inter as the main UI font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Optional: keep Geist_Mono for monospaced content
// const geistMono = Geist_Mono({
//   subsets: ["latin"],
//   variable: "--font-geist-mono",
// });

export const metadata: Metadata = {
  title: "School Management System",
  description: "A modern platform for managing schools efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}  font-sans antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
