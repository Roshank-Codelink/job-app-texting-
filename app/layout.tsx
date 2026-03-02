import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/Components/Common/ToastProvider";
import AuthProvider from "@/Providers/auth-provider";
import PageLoader from "@/Components/Common/PageLoader";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Jobito",
  description: "Job Platform",
  generator: "Next.js",
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/icons/icon-192x192.png" },
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" },
  ]
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* MANDATORY for Android PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider >
          <PageLoader>
            {children}
          </PageLoader>
        </AuthProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
