import Navbar from "@/components/custom/Navbar";
import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";
import Providers from "@/providers/Providers";

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
        <Providers>
          <Navbar />
          <div className="cursor-custom min-h-[100vh]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
