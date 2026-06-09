"use client";
import "swiper/css";
import "react-day-picker/dist/style.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Styles Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useEffect, useState } from "react";
import { useGetAll } from "@/customHooks/useGetAll";
import Link from "next/link";
import MailLogo from "@/components/MailLogo";
import WhatsAppLogo from "@/components/WhatsAppLogo";
import { ArrowDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

type RoomStatus = "disponible" | "occupato";
type Card = {
  image: string;
};
export type Room = {
  id: number;
  category: string;
  description: string;
  equipments: string;
  price: number;
  stato: RoomStatus;
  image: string;
};

declare namespace JSX {
  interface IntrinsicElements {
    "switcher-slide": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}

export default function CamerePage() {
  const { data, loading, error } = useGetAll();
  const [parsed, setParsed] = useState<Room[]>([]);

  useEffect(() => {
    setParsed(data);
  }, [data]);
  return (
    <main className="w-full bg-white min-h-screen text-neutral-900 text-[#3a3a3a] sm:text-sm md:text-base lg:text-lg pt-20" style={{ backgroundImage: "url(/sfondo.jpeg)" }}>
      <HeroSection />
      <RoomsSection cardsData={parsed} />
    </main>
  );
}

const HeroSection = () => {
  const t = useTranslations('hero');
  const tButtons = useTranslations('buttons');
  const tAlt = useTranslations('alt');
  return (
    <>
      <section className="relative h-full w-full overflow-hidden">
        <img
          src="/videos/hero-image.png"
          alt={tAlt('heroPlaceholder')}
          className="object-cover object-center md:w-full md:h-[90vh]"
        />
      </section>

      <br />
      <br className="hidden md:block" />
      <br className="hidden md:block" />
      <section className="flex flex-col items-center justify-center text-center">

        <h1 className="text-4xl md:text-6xl font-bold text-[#2b2b2b] mb-4 text-stroke-white">
          {t('title')} <br />
          <span className="text-[#b07a4a]">{t('hotelName')}</span>
        </h1>

        <p className="text-lg text-[#3a3a3a] max-w-2xl">
          {t('subtitle')}
        </p>

        <p className="text-[#3a3a3a]">
          {t('description')}
        </p>

        <p className="text-[#2b2b2b] font-semibold">
          {t('directContact')}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`https://wa.me/${process.env.NUMBER_WHATSAPP}?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera.`}
            className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full 
               bg-gradient-to-r from-green-50 to-emerald-50 
               border border-[#cbbfae] bg-white/30
               shadow-md hover:shadow-lg 
               hover:scale-105 active:scale-95
               transition-all duration-300 ease-in-out
               focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{tButtons('bookNow')}</span>
            <WhatsAppLogo color="#25D366" />
          </Link>

          <Link
            href="mailto:gea.siracusa@hotmail.com?subject=Richiesta%20prenotazione%20-%20GEA%20Guest%20House&body=Ciao%2C%20vorrei%20prenotare%20una%20camera."
            className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full 
               bg-gradient-to-r from-amber-50 to-yellow-50 
               border border-[#cbbfae] bg-white/30
               shadow-md hover:shadow-lg 
               hover:scale-105 active:scale-95
               transition-all duration-300 ease-in-out
               focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{tButtons('bookNow')}</span>
            <MailLogo color="#2b2b2b" />
          </Link>
        </div>
      </section>
    </>
  );
};

const RoomsSection = ({ cardsData }: { cardsData: any[] }) => {
  const roomName = cardsData.at(0)?.category || "Chambre de luxe";
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const t = useTranslations("camere");
  const locale = useLocale();

  return (
    <section

      className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 py-10 md:px-10 md:py-10"
    >
      {cardsData.map((room, index) => {
        const reverse = index % 2 !== 0;

        return (
          <article
            key={index}
            className={`grid items-center gap-10 md:gap-16 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
          >
            {/* Image */}
            <div className="group relative overflow-hidden rounded-3xl">
              <img
                src={
                  ["giulio", "aria", "eva"].filter((name) =>
                    room.category.toLowerCase().includes(name),
                  )[0]
                    ? `/camere/${room.category.replace("Camera", "").toLowerCase().trim()}.png`
                    : "/placeholder.jpeg"
                }
                alt={room.image}
                className="h-[420px] w-full object-cover transition duration-2000 group-hover:scale-105 md:h-[520px]"
              />

              <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
                {/* Suite {String(index + 1).padStart(2, "0")} */}
              </p>

              <h2 className="text-3xl font-light tracking-tight md:text-5xl">
                {room.category}
              </h2>

              <p className="mt-6 max-w-xl text-[#3a3a3a] text-base leading-relaxed md:text-lg">
                {room.description}
              </p>

              <p className="mt-6 max-w-xl text-[#3a3a3a] text-base leading-relaxed md:text-lg">
                {room.equipments?.split(",").map((equip: string, index: number) => (
                  <span className="inline-block mr-2 semi-bold" key={index}>✓ {equip}</span>
                ))}
              </p>

              <div className="mt-8 flex flex-col md:flex-row flex-wrap gap-4">
                <Link
                  href="https://wa.me/+393519999999?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20la%20camera%20${roomName}."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-2 border-[#000000bd] text-white bg-[#6b4e3d] hover:bg-[#5a4133]  px-6 py-3 text-sm font-medium text-white transition hover:scale-105"
                >
                  {t("book_now")}
                </Link>
                <Link
                  href={`/${locale}/camere/camera/${room.id.toString()}`}
                  className="rounded-full border-2 border-[#000000bd] text-[#2b2b2b] bg-white/40 hover:bg-white/70 py-2 px-6 transition hover:scale-105"
                >
                  {t("details")}
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};
