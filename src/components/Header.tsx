"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrop, toggleDrop } from "../store/dropSlice";
import { RootState } from "../store";
import Link from "next/link";
import WhatsAppLogo from "./WhatsAppLogo";
import MailLogo from "./MailLogo";

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
          className="fixed z-200 top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
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
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-black shadow-md"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 md:w-12 md:h-12 text-emerald-600 dark:text-emerald-400">
                <div className="flex w-[60px] h-[60px]">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 10 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Roof shape */}
                    <path
                      d="M30 55 V35 A20 20 0 0 1 70 35 V55"
                      fill="none"
                      stroke="#C98B67"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Diamond window */}
                    <rect
                      x="43"
                      y="35"
                      width="14"
                      height="14"
                      transform="rotate(45 50 42)"
                      fill="#E0B28A"
                    />
                    {/* Left ear */}
                    <path d="M38 56 H48 L43 62 H38 Z" fill="#D9C9A7" />
                    {/* Right ear */}
                    <path d="M52 56 H62 L57 62 H52 Z" fill="#D9C9A7" />
                    {/* Text "GEA" centered below */}
                    <text
                      x="50"
                      y="85"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                      fontSize="24"
                      fill="currentColor"
                      className="text-gray-800 dark:text-white"
                    >
                      GEA
                    </text>
                  </svg>
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { label: "Home", href: "/" },
                { label: "Camere ", href: "/camere" },
                { label: "Servizi", href: "/servizi" },
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
                className="text-menu flex items-center border border-gray-300 dark:border-gray-600 rounded-full gap-2 dark:text-gray-200 py-1 px-8 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prenota su WhatsApp <WhatsAppLogo />
              </a>

              <a
                href="mailto:gea.siracusa@hotmail.com"
                className="text-menu flex items-center border border-gray-300 dark:border-gray-600 rounded-full gap-2 dark:text-gray-200 py-1 px-8 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prenota per email <MailLogo color="#fff" />
              </a>

            </div>


            {/* Mobile button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                {["Home", "Camere", "Servizi", "Contatti"].map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-menu dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-2 px-2 rounded-md transition-colors"
                    onClick={() => dispatch(toggleDrop())}
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="https://wa.me/+393921094730?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-menu flex items-center gap-2 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-2 px-2 rounded-md transition-colors"

                >
                  Prenota su WhatsApp <WhatsAppLogo />
                </a>
                <a
                  href="mailto:gea.siracusa@hotmail.com"
                  className="text-menu flex items-center border border-gray-300 dark:border-gray-600 rounded-full gap-2 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-2 px-8 transition-colors"
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
