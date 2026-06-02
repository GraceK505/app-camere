"use client";

import CardSlider from "@/components/cardSlider";
import Slider from "@/components/slider";
import { useState } from "react";
import { useGetAll } from "@/customHooks/useGetAll";
import Link from "next/link";

export default function HomePage() {
  const { data, loading, error } = useGetAll();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-zinc-40 to-gray-100 dark:from-white dark:to-zinc-100 font-sans transition-colors duration-300">
        {/* CONTENU PRINCIPAL AVEC PADDING POUR HEADER FIXE */}
        <main className="bg-white">
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
          <div className="w-full h-[100px] md:h-[100px]">
            {/* Vous pouvez ajouter un autre composant de slider ou une section ici */}
          </div>
          {/* SECTION HERO / PRÉSENTATION */}
          <section className="max-w-full py-16 md:py-24 bg-white shadow-[inset_0_0_50px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center px-6 mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-black mb-6">
                Benvenuto a{" "}
                <span className="text-colors-gea">GEA Guest House</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-black dark:text-black-300 max-w-3xl mx-auto">
                Una soluzione perfetta per chi cerca efficienza, posizione e
                qualità. Una soluzione perfetta per chi cerca{" "}
                <strong>efficienza</strong>, <strong>posizione</strong> e{" "}
                <strong>qualità</strong>.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/camere"
                  className="px-6 py-3 rounded-buttons text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-md"
                >
                  Nostre camere
                </Link>
                <Link
                  href={`https://wa.me/${process.env.NUMBER_WHATSAPP}?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-colors-gea text-colors-gea dark:text-emerald-400 rounded-full font-semibold rounded-buttons-hover transition-colors"
                >
                  Contatta ci
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
