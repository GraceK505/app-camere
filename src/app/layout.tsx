"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/loader";
import { Provider } from "react-redux";
import { store } from "@/store";
import LenisProvider from "@/components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isLoading, setIsLoading] = useState(true);

  const pathName = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Provider store={store}>
        <body style={{backgroundImage: "url(/sfondo.jpg)"}} className="min-h-full flex flex-col bg-[#e3dac8] font-sans transition-colors duration-300">
          {pathName === "/camere" && isLoading && <Loader isLoading={isLoading} />}
          <Header />
          <LenisProvider>
            <main className="flex-1 pt-16 md:pt-20 bg-[#e3dac8]">{children}</main>
          </LenisProvider>
          <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} B&B_App. Tous droits réservés.
              </p>
            </div>
          </footer>
        </body>
      </Provider>
    </html>
  );
}
