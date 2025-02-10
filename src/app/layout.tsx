import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Providers, { prefetchVehicles } from "@/components/Providers";
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
  title: "mCarz",
  description: "The only safe way to buy and sell cars in Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} select-none relative
         antialiased grainy-light`
        }
        onMouseOver={prefetchVehicles}
        onTouchStart={prefetchVehicles}
      >
        <Header />
        <Providers>
          <main>
            {children}
          </main>
        </Providers>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
