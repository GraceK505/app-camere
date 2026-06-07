"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrop, toggleDrop } from "../store/dropSlice";
import { RootState } from "../store";
import Link from "next/link";
import WhatsAppLogo from "./WhatsAppLogo";
import MailLogo from "./MailLogo";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isOpen = useSelector((state: RootState) => state.drop.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.innerWidth > 768 && setIsMenuOpen(true);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {isOpen && (
        <button
          onClick={() => dispatch(closeDrop())}
          className="fixed z-200 top-4 right-4 text-[#3a3a3a] hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur shadow-lg"
          : "bg-white dark:bg-black shadow-md"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 md:w-12 md:h-12 relative">
                <div className="flex w-[80px] h-[90px] absolute -top-2">
                  <img src="/logo.png" alt="Logo" className="!relative w-full h-full object-contain rounded-full" />
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { label: "Home", href: "/" },
                { label: "Camere ", href: "/camere" },
                { label: "Contatti", href: "/contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-200 text-menu transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex gap-2 items-center space-x-4">
              <a
                href="https://wa.me/+393921094730?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera."
                className="text-menu flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-full gap-2 dark:text-gray-200 py-1 px-8 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prenota su WhatsApp <WhatsAppLogo />
              </a>

              <a
                href="mailto:gea.siracusa@hotmail.com"
                className="text-menu flex items-center justify-between border border-gray-300  rounded-full gap-2 text-[#3a3a3a] py-1 px-8 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prenota per email <MailLogo color="#fff" />
              </a>

            </div>


            {/* Mobile button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-md text-gray-700 text-[#3a3a3a] hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col space-y-3">
                {["Home", "Camere", "Contatti"].map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-menu text-[#3a3a3a] hover:text-emerald-600 dark:hover:text-emerald-400 py-2 px-2 rounded-md transition-colors"
                    onClick={() => dispatch(toggleDrop())}
                  >
                    {item}
                  </a>
                ))}
              <a
                href="https://wa.me/+393921094730?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera."
                className="text-menu flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-full gap-2 text-[#3a3a3a] py-1 px-8 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prenota su WhatsApp <WhatsAppLogo />
              </a>
                <a
                  href="mailto:gea.siracusa@hotmail.com"
                  className="text-menu flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-full gap-2 text-[#3a3a3a] hover:text-emerald-600 dark:hover:text-emerald-400 py-2 px-8 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prenota per email <MailLogo color="#fff" />
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
