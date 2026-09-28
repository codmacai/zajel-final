import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/Footer"; // Adjust the import path based on where your Footer component is located
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zajel",
  description: "Intelligent Movement, Nationwide and Beyond",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}