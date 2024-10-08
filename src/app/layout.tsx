import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "storyphilia",
  description: "Create your own AI powered stories",
  openGraph: {
    title: "storyphilia",
    description: "Create your own AI powered stories",
    type: "website",
    url: "https://storyphilia.vercel.app",
    siteName: "storyphilia",
    images: [
      {
        url: "https://storyphilia.vercel.app/logo.png",
      },
    ],
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="cursor-custom min-h-[100vh]">{children}</div>
      </body>
    </html>
  );
}
