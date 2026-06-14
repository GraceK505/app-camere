"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

// Styles Swiper
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import WhatsAppLogo from "./WhatsAppLogo";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, PlusIcon } from "lucide-react";

type RoomStatus = "disponible" | "occupato";
type Card = {
  image: string;
};
type Room = {
  id: number;
  category: string;
  description: string;
  equipments: string;
  price: number;
  stato: RoomStatus;
  image: string;
  imagesPath: string;
};

export default function CardSlider({ getData }: { getData: Room[] }) {
  const [data, setData] = useState<Room[]>([]);
  const imgRef: React.RefObject<HTMLImageElement[]> = useRef([]);
  const t = useTranslations("home")
  const tMessage = useTranslations("message")
  const locale = useLocale();
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setData(getData);

    window.innerWidth < 768 && setIsMobile(true);

  }, [getData]);
  console.log("Données combinées pour CardSlider :", data);
  return (
    <div className="w-full py-8 md:py-12 bg-[#00000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 text-black mb-8">
          GEA Guest House
        </h2>

        <div className="text-center text-gray-600 text-gray-900 mb-12 max-w-2xl mx-auto space-y-5 leading-relaxed">
          <p className="description">
            <strong>{t('description_bold1')}</strong>
            {t('description_normal1')}
            <strong>{t('description_bold2')}</strong>
            {t('description_normal2')}
            </p>
            <p>
            <strong>{t('description_bold3')}</strong>
            {t('description_normal3')}
          </p>
        </div>

        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={20}
          grabCursor={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          breakpoints={{
            200: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
          }}
          effect="swipe"
          className="card-swiper pb-12"
        >
          {data.map((card: Room) => (
            <SwiperSlide key={card.id} className={`bg-white bg-white/10 rounded-2xl shadow-lg overflow-hidden md:!w-[450px]`}>
              <div
                className="bg-white bg-white/10 overflow-hidden flex flex-col"
              >
                <div className="relative h-auto md:h-[300px] w-full rounded-t-lg overflow-hidden">
                  <img
                    ref={(el) => { el !== null ? imgRef.current[card.id] = el : el }}
                    src={`/camere/${card.category.replace("Camera", "").toLowerCase().trim()}.png`}
                    alt={card.category || "Chambre d'hôtel"}
                    className="relative md:object-cover transition-all duration-300 hover:scale-105 w-auto h-full"
                  />
                </div>
                <div className="relative p-5 bg-white">
                  <h3 className="text-xl font-bold text-gray-800 text-gray-900 mb-2">
                    {card.category}
                  </h3>
                  <p className="text-gray-600 text-gray-900 text-sm mb-3">
                    {card.description}
                  </p>
                  <div className="flex gap-10 items-center justify-start mt-3">
                    <Link
                      href={`https://wa.me/+393921094730?text=${encodeURIComponent(tMessage('whatsapp_message'))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#000000bd] text-[#2b2b2b] bg-emerald-500 hover:bg-[#059669] text-white text-sm rounded-full transition-colors"
                    >
                      { !isMobile ? t("book_now") : null} <WhatsAppLogo color="#fff" />
                    </Link>

                    <Link
                      href={`${locale}/camere/camera/${card.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#000000bd] text-[#906b47] hover:bg-[#059669] bg-gray-700/50  text-white text-sm rounded-full transition-colors"
                    >
                      { !isMobile ? t("discover_room") : null} <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
