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
import { useDispatch } from "react-redux";
import Link from "next/link";
import MailLogo from "@/components/MailLogo";
import WhatsAppLogo from "@/components/WhatsAppLogo";
import { ArrowDown } from "lucide-react";

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
    <main className="w-full min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-white">
      <HeroSection />
      <RoomsSection cardsData={parsed} />
      <BigCardSwiper />
    </main>
  );
}

const HeroSection = () => {
  const dispatch = useDispatch();
  return (
    <>
      <section className="relative h-full w-full overflow-hidden">
        <img
          src="/videos/hero-image.png"
          alt="Hero Video Placeholder"
          className={`object-fit object-center md:w-full md:h-[90vh] transition-opacity duration-1000`}
        />

      </section>
      <br />
      <br className="hidden md:block"/>
      <br className="hidden md:block"/>
      <section id="hero" className="relative inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6 md:pt-10 pb-10">
        <div className="relative inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Prenota direttamente con &nbsp;
            <span className="text-[#c98b67]">GEA Guest House</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Contattaci su WhatsApp o via e-mail per verificare la disponibilità delle camere.
          </p>
          <br />
          <p>
            Ti risponderemo personalmente nel più breve tempo possibile, 
            aiutandoti a scegliere la soluzione più adatta alle 
            tue esigenze e fornendoti consigli utili per vivere al meglio Siracusa.
          </p>
          <br />
          <p>
            <strong>Un contatto diretto, semplice e senza intermediari.</strong>
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href={`https://wa.me/${process.env.NUMBER_WHATSAPP}?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera.`}
              className="text-gray-700 flex items-center border border-gray-300 dark:border-gray-600 rounded-full gap-2 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-2 px-8 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prenota ora <WhatsAppLogo />
            </Link>

            <Link
              href="mailto:gea.siracusa@hotmail.com"
              className="text-gray-700 flex items-center border border-gray-300 dark:border-gray-600 rounded-full gap-2 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-2 px-8 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prenota ora <MailLogo color="#fff" />
            </Link>
          </div>
          <br />
          <br />
          <br />
          <ArrowDown className="mt-12 animate-bounce text-white" size={32} />
        </div>
      </section>
    </>
  );
};

const RoomsSection = ({ cardsData }: { cardsData: any[] }) => {
  const roomName = cardsData.at(0)?.category || "Chambre de luxe";
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
                Suite {String(index + 1).padStart(2, "0")}
              </p>

              <h2 className="text-3xl font-light tracking-tight md:text-5xl">
                {room.category}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
                {room.description}
              </p>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
                {room.equipments?.split(",").map((equip: string, index: number) => (
                  <span className="inline-block mr-2 semi-bold" key={index}>✓ {equip}</span>
                ))}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="https://wa.me/+393519999999?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20la%20camera%20${roomName}."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:scale-105 dark:bg-white dark:text-black"
                >
                  Prenota ora
                </Link>
                <Link
                  href={`/camere/camera/${room.id.toString()}`}
                  className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
                >
                  Dettagli
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

const slidesData = [
  {
    id: 1,
    title: "Mountain Adventure",
    description: "Explore the highest peaks and breathe the purest air.",
    bgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Forest Escape",
    description: "Walk through ancient woods and discover hidden waterfalls.",
    bgColor: "bg-gradient-to-r from-emerald-500 to-teal-600",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Desert Sunset",
    description: "Witness the sky turn into a canvas of warm colors.",
    bgColor: "bg-gradient-to-r from-orange-500 to-red-600",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Coastal Serenity",
    description: "Let the waves and seabreeze wash away your stress.",
    bgColor: "bg-gradient-to-r from-cyan-500 to-blue-600",
    image: "/home-slider/IMG-1.jpeg",
  },
  // Add more slides as needed
];

function BigCardSwiper() {
  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 1.2, centeredSlides: true },
          1024: { slidesPerView: 1.5, centeredSlides: true },
        }}
        className="big-card-swiper"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay + text description */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-10">
                <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-white/90 text-base md:text-lg mt-2 max-w-2xl drop-shadow">
                  {slide.description}
                </p>
                {/* Optional button */}
                <button className="mt-4 w-fit bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition">
                  Learn more →
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
