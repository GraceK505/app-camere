"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

// Styles Swiper
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import WhatsAppLogo from "./WhatsAppLogo";

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

  useEffect(() => {
    setData(getData);
  }, [getData]);
  console.log("Données combinées pour CardSlider :", data);
  return (
    <div className="w-full py-8 md:py-12 bg-gray-100 dark:bg-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-black mb-8">
          GEA Guest House
        </h2>

        <div className="text-center text-gray-600 dark:text-gray-900 mb-12 max-w-2xl mx-auto space-y-5 leading-relaxed">
          <p>
            Una struttura <strong>moderna</strong> e <strong>funzionale</strong>{" "}
            situata in una delle zone più <strong>strategiche</strong> di
            Siracusa.
          </p>

          <p>
            A pochi minuti dal <strong>Teatro Greco di Siracusa</strong>, nelle
            immediate vicinanze dell’<strong>Ospedale Umberto I</strong> e
            facilmente collegata con <strong>Ortigia</strong>, la struttura è
            ideale sia per soggiorni <strong>turistici</strong> che per esigenze{" "}
            <strong>lavorative</strong> o personali.
          </p>

          <p>
            Le camere sono progettate per offrire <strong>comfort</strong>,{" "}
            <strong>praticità</strong> e <strong>indipendenza</strong>, con{" "}
            <strong>self check-in</strong> e tutti i servizi essenziali per un
            soggiorno senza complicazioni.
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
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
          }}
          className="card-swiper pb-12"
        >
          {data.map((card: Room) => (
            <SwiperSlide key={card.id} className="bg-white dark:bg-white/10 rounded-2xl shadow-lg overflow-hidden">
              <Link
                href={`/camera/${card.id}`}
                className="bg-white dark:bg-white/10 overflow-hidden"
              >
                <div className="relative h-[300px] w-full rounded-t-lg overflow-hidden">
                  <Image
                    src={`/camere/${card.category.replace("Camera", "").toLowerCase().trim()}.png`}
                    alt={card.category || "Chambre d'hôtel"}
                    fill
                    className="object-cover transition-all duration-300 filter grayscale hover:grayscale-0 w-auto h-full"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-900 mb-2">
                    {card.category}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-900 text-sm mb-3">
                    {card.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <Link
                      href="https://wa.me/+393519999999?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-full transition-colors"
                    >
                      Prenota ora <WhatsAppLogo color="#25D366" />
                    </Link>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
