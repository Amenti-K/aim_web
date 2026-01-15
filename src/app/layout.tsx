"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import store from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "AIM Admin Panel",
//   description: "Admin panel for AIM ERP system",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </Provider>
      </body>
    </html>
  );
}
