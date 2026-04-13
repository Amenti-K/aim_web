"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   metadataBase: new URL("https://aimstock.aimtechgroups.com/"),
//   title: {
//     default: "AIM Stock",
//     template: "%s | AIM Stock",
//   },
//   description:
//     "AIM Stock is a mobile-first ERP system built to help businesses manage stock, sales, and expenses with simplicity and control.",
//   keywords: [
//     "AIM Stock",
//     "Trading Company",
//     "Logistics Company",
//     "Import-Export",
//     "General Trade",
//     "Ethiopia",
//   ],
//   authors: [
//     {
//       name: "AIM Stock",
//       url: "https://aimstock.aimtechgroups.com/",
//     },
//   ],
//   creator: "AIM Stock",
//   publisher: "AIM Stock",
//   robots: {
//     index: true,
//     follow: true,
//     nocache: false,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   referrer: "origin-when-cross-origin",
//   // themeColor: "#ffffff",
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: "https://aimstock.aimtechgroups.com/",
//     siteName: "AIM Stock",
//     title: "AIM Stock",
//     description:
//       "AIM Stock is a mobile-first ERP system built to help businesses manage stock, sales, and expenses with simplicity and control.",
//     images: [
//       {
//         url: "/favicon-32x32.png",
//         width: 1200,
//         height: 630,
//         alt: "AIM Stock",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "AIM Stock",
//     description:
//       "AIM Stock is a mobile-first ERP system built to help businesses manage stock, sales, and expenses with simplicity and control.",
//     images: ["/favicon-32x32.png"],
//   },
//   icons: {
//     icon: [
//       { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
//       { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
//     ],
//     apple: "/apple-touch-icon.png",
//     shortcut: "/favicon.ico",
//   },
//   manifest: "/site.webmanifest",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SubscriptionProvider>
                {children}
              </SubscriptionProvider>
              <Toaster />
              <SonnerToaster position="top-right" expand={true} richColors />
            </ThemeProvider>

          </ReactQueryProvider>
        </Provider>
      </body>
    </html>
  );
}
