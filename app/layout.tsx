import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="font-sans">
      <body className="antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        <div className="min-h-screen p-4 space-y-4 rounded-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
