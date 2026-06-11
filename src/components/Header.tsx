"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/[locale]/store";
import Link from "next/link";
import WhatsAppLogo from "./WhatsAppLogo";
import MailLogo from "./MailLogo";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isOpen = useSelector((state: RootState) => state.drop.isOpen);
  const t = useTranslations("menu");
  const t1 = useTranslations("home");
  const tMessage = useTranslations("message");
  const locale = useLocale();
  const locales = ['it', 'en', 'fr', 'es'];
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.innerWidth > 768 && setIsMenuOpen(true);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  function switchLocale(pathname: string, locale: string) {
    const segments = pathname.split('/');

    if (locales.includes(segments[1])) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }

    return segments.join('/');
  }

  const labels: Record<string, string> = {
    it: 'IT',
    en: 'EN',
    fr: 'FR',
    es: 'ES'
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-black/90 backdrop-blur shadow-lg"
          : "bg-black shadow-md"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <div className="w-10 h-10 md:w-12 md:h-12 relative">
                <div className="flex w-[80px] h-[55px] absolute -top-2">
                  <Image src="/logo.png" alt="Logo" fill className="!relative w-full h-full object-contain rounded-full" />
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { label: t("home"), href: `/${locale}` },
                { label: t("camere"), href: `/${locale}/camere` },
                { label: t("contatti"), href: `/${locale}/contact` },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-menu text-gray-200 transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex gap-2 items-center space-x-4">
              <a
                href={`https://wa.me/+393921094730?text=${encodeURIComponent(tMessage('whatsapp_message'))}`}
                className="text-menu flex items-center justify-between border border-gray-300 border-gray-600 rounded-full gap-2 text-gray-200 py-1 px-8 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t1("book_now")} <WhatsAppLogo />
              </a>

              <a
                href="mailto:gea.siracusa@hotmail.com"
                className="text-menu flex items-center justify-between border border-gray-300 border-gray-600 rounded-full gap-2 text-gray-200 py-1 px-8 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t1("book_now")} <MailLogo color="#fff" />
              </a>

            </div>
            <select
              value={locale}
              onChange={(e) => {
                const newUrl = switchLocale(pathname, e.target.value);
                window.location.href = newUrl;
              }}
            >
              {locales.map((l) => (
                <option className="text-[#3a3a3a]" key={l} value={l}>
                  {labels[l]}
                </option>
              ))}
            </select>

            {/* Mobile button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-md text-gray-700 text-[#3a3a3a] hover:bg-gray-100 hover:bg-gray-800"
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
            <div className="md:hidden py-4 border-t border-gray-200 border-gray-800">
              <div className="flex flex-col space-y-3">
                {["Home", "Camere", "Contatti"].map((item) => (
                  <a
                    key={item}
                    href={`/${locale}/${item.toLowerCase()}`}
                    className="text-[#3a3a3a] text-gray-200 py-2 px-2 rounded-md transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="https://wa.me/+393921094730?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera."
                  className="flex items-center justify-between border border-gray-300 border-gray-600 rounded-full gap-2 text-gray-200 py-1 px-8 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t1("book_now")} <WhatsAppLogo />
                </a>
                <a
                  href="mailto:gea.siracusa@hotmail.com"
                  className="flex items-center justify-between border border-gray-300 border-gray-600 rounded-full gap-2 text-gray-200 py-1 px-8 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t1("book_now")} <MailLogo color="#fff" />
                </a>
              </div>
            </div>
          )}


        </div>
      </header>
    </>
  );
}
