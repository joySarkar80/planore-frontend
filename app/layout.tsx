import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/(commonRoute)/_component/shared/navbar/Navbar";
import { Footer } from "@/app/(commonRoute)/_component/shared/footer/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Planora | Secure Event Management",
  description: "A secure event management platform for creating, discovering, and joining events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>

        <main className="flex-1">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
