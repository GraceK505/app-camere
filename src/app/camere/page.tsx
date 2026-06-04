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
    <main className="w-full bg-[#e3dac8] min-h-screen text-neutral-900 text-[#3a3a3a] sm:text-sm md:text-base lg:text-lg">
      <HeroSection />
      <RoomsSection cardsData={parsed} />
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
          className="object-cover object-center md:w-full md:h-[90vh]"
        />
      </section>

      <br />
      <br className="hidden md:block" />
      <br className="hidden md:block" />

      <section
        id="hero"
        className="relative flex flex-col items-center justify-center text-center px-6 md:pt-10 pb-10"
        style={{ backgroundColor: "#e3dac8" }}
      >
        <div className="flex flex-col items-center justify-center text-center px-4">

          <h1 className="text-4xl md:text-6xl font-bold text-[#2b2b2b] mb-4">
            Prenota direttamente con{" "}<br />
            <span className="text-[#b07a4a]">GEA Guest House</span>
          </h1>

          <p className="text-lg text-[#3a3a3a] max-w-2xl">
            Contattaci su WhatsApp o via e-mail per verificare la disponibilità delle camere.
          </p>

          <br />

          <p className="text-[#3a3a3a]">
            Ti risponderemo personalmente nel più breve tempo possibile, aiutandoti a scegliere la soluzione più adatta alle tue esigenze.
          </p>

          <br />

          <p className="text-[#2b2b2b] font-semibold">
            Un contatto diretto, semplice e senza intermediari.
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              href={`https://wa.me/${process.env.NUMBER_WHATSAPP}?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera.`}
              className="flex items-center gap-2 rounded-full border border-[#cbbfae] bg-white/40 text-[#2b2b2b] hover:bg-white/70 py-2 px-8 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prenota ora <WhatsAppLogo color="#2b2b2b" />
            </Link>

            <Link
              href="mailto:gea.siracusa@hotmail.com"
              className="flex items-center gap-2 rounded-full border border-[#cbbfae] bg-white/40 text-[#2b2b2b] hover:bg-white/70 py-2 px-8 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prenota ora <MailLogo color="#2b2b2b" />
            </Link>
          </div>

          <br /><br /><br />

          <ArrowDown className="mt-12 animate-bounce text-[#2b2b2b]" size={32} />
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

              <p className="mt-6 max-w-xl text-[#3a3a3a] text-base leading-relaxed md:text-lg">
                {room.description}
              </p>

              <p className="mt-6 max-w-xl text-[#3a3a3a] text-base leading-relaxed md:text-lg">
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
