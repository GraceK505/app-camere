"use client";

import CardSlider from "@/components/cardSlider";
import Slider from "@/components/slider";
import { useEffect, useState } from "react";
import { useGetAll } from "@/customHooks/useGetAll";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function HomePage() {
    const { data, loading, error } = useGetAll();
    const [isLoading, setIsLoading] = useState(true);
    const t = useTranslations("home")
    const tMessage = useTranslations("message")
    const pathName = usePathname();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-zinc-40 to-gray-100 from-white to-zinc-100 font-sans transition-colors duration-300">
                {/* CONTENU PRINCIPAL AVEC PADDING POUR HEADER FIXE */}
                <main style={{ backgroundImage: "url(/sfondo.jpeg)" }} className="relative w-full min-h-screen text-neutral-900 text-[#3a3a3a] sm:text-sm md:text-base lg:text-lg">
                    {/* Slider avec espacement adapté */}
                    <div className="w-full">
                        <Slider />
                    </div>
                    <div className="relative block w-full h-auto">
                        <CardSlider getData={data} />
                    </div>
                    {/* <div className="w-full h-[500px] md:h-[600px]">
          <BookingCalendar />
        </div> */}
                    <div className="bg-gradient-to-t from-black via-[#9c9076] to-transparent"></div>
                    {/* SECTION HERO / PRÉSENTATION */}
                    <section className="max-w-full py-16 md:py-24 bg-white shadow-[inset_0_0_50px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center px-6 mx-auto">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1f1f1f] text-black mb-6">
                                {t('welcome_title_normal')}
                                <span className="text-colors-gea">{t('welcome_title_bold')}</span>
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-black text-black-300 max-w-3xl mx-auto">
                                {t('welcome_subtitle_normal1')}
                                {t('welcome_subtitle_normal2')}
                                <strong>{t('welcome_subtitle_bold1')}</strong>,{' '}
                                <strong>{t('welcome_subtitle_bold2')}</strong> e{' '}
                                <strong>{t('welcome_subtitle_bold3')}</strong>
                                {t('welcome_subtitle_normal3')}
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/camere#hero"
                                    className="px-6 py-3 border-2 border-[#000000bd] text-[#fff] bg-[#6b4e3d] hover:bg-[#5a4133] hover:text-white rounded-full font-semibold transition-all transform hover:scale-105"
                                >
                                    {t('discover_rooms')}
                                </Link>
                                <Link
                                    href={`https://wa.me/+393921094730?text=${encodeURIComponent(tMessage('whatsapp_message'))}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 border border-colors-gea text-colors-gea text-emerald-400 rounded-full font-semibold rounded-buttons-hover transition-colors"
                                >
                                    {t('book_now')}
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Vous pouvez ajouter d'autres sections ici (grille de chambres, avis, etc.) */}
                </main>
            </div>
        </>
    );
}
