"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import LenisProvider from "@/components/LenisProvider";
import { store } from "@/app/[locale]/store";

import { Provider } from "react-redux";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import Loader from "@/components/loader";
import { useGetAll } from "@/customHooks/useGetAll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface MainPageProps {
  children: React.ReactNode;
}
export default function MainPage({children}: MainPageProps) {
  const {loading} = useGetAll();
  const pathName = usePathname();

  return (
    <>
      <html
        
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <Provider store={store}>
          <body style={{ backgroundImage: "url(/sfondo.jpeg)" }} className="min-h-full flex flex-col bg-white font-sans transition-colors duration-300">
            
            {loading && <Loader />}
            <Header />
            <LenisProvider>
              <br />
              <br />
              <br />
              {children}
            </LenisProvider>
            <footer className="bg-black border-t border-gray-800 mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <p className="text-center text-gray-500 text-gray-400 text-sm">
                  © {new Date().getFullYear()} GEA GUEST HOUSE Tous droits réservés.
                </p>
              </div>
            </footer>
          </body>
        </Provider>
      </html>
    </>
  );
}
