import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alfi Sofa Bandung - Produsen Sofa Berkualitas",
  description:
    "Alfi Sofa Bandung adalah produsen sofa berkualitas premium di Bandung Barat. Menyediakan berbagai koleksi sofa modern dengan material terbaik, harga terjangkau, dan garansi resmi. Hubungi 0851-9877-8338.",
  keywords: [
    "sofa bandung barat",
    "produsen sofa bandung",
    "sofa minimalis",
    "sofa custom",
    "sofa l-shaped",
    "sofa bed",
    "alfi sofa",
    "alfi official sofa",
    "furniture bandung barat",
    "gudang sofa bandung",
  ],
  authors: [{ name: "Alfi Sofa Bandung" }],
  openGraph: {
    title: "Alfi Sofa Bandung - Produsen Sofa Berkualitas",
    description:
      "Sofa berkualitas premium untuk rumah impian Anda. Produsen sofa terpercaya di Bandung Barat.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
