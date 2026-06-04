"use client";
import "swiper/css";
import "react-day-picker/dist/style.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useGetAll } from "@/customHooks/useGetAll";
import WhatsAppLogo from "./WhatsAppLogo";

const slidesData = [
  {
    id: 1,
    title: "Slide 1",
    description: "Rilassati in uno spazio moderno e luminoso, pensato per il massimo comfort e benessere.",
    bgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Slide 4",
    description: "Interni accoglienti e curati, con un’atmosfera calda perfetta per un soggiorno rilassante.",
    bgColor: "bg-gradient-to-r from-pink-500 to-rose-600",
    image: "/home-slider/IMG-1.jpeg",
  },
  {
    id: 3,
    title: "Slide 2",
    description: "Un ambiente tranquillo ed elegante, ideale per relax e lavoro in totale serenità.",
    bgColor: "bg-gradient-to-r from-emerald-500 to-teal-600",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Slide 5",
    description: "Spazi moderni e funzionali che uniscono design, comfort e praticità.",
    bgColor: "bg-gradient-to-r from-indigo-500 to-purple-600",
    image: "/home-slider/IMG_7696.webp",
  },
  {
    id: 5,
    title: "Slide 6",
    description: "Un soggiorno fresco e luminoso, dove semplicità e comfort si incontrano.",
    bgColor: "bg-gradient-to-r from-green-500 to-emerald-600",
    image: "/home-slider/copy_F0F3C459-6DB1-4AD2-AE74-DCD5C65502BB.jpeg",
  },
  {
    id: 6,
    title: "Slide 3",
    description: "Un’accoglienza calda e autentica per rendere ogni soggiorno indimenticabile.",
    bgColor: "bg-gradient-to-r from-orange-500 to-red-600",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=600&fit=crop",
  },
  {
    id: 7,
    title: "Slide 7",
    description: "Toni caldi e dettagli eleganti creano un’atmosfera rilassante e piacevole.",
    bgColor: "bg-gradient-to-r from-yellow-500 to-amber-600",
    image: "/home-slider/copy_A79AB742-4C47-48A3-A739-748DE6735CC2.jpeg",
  },
  {
    id: 8,
    title: "Slide 8",
    description: "Comfort moderno e design curato per un soggiorno semplice e senza pensieri.",
    bgColor: "bg-gradient-to-r from-fuchsia-500 to-pink-600",
    image: "/home-slider/B711BE29-BC58-4E64-8226-959C33B73E1D.png",
  },
];

export default function Slider() {
const {data} = useGetAll();

  return (
    <div className="w-full h-[100vh] max-w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={false}
        pagination={{ clickable: false, type: "progressbar" }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        className="shadow-2xl overflow-hidden"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[100vh] md:h-[100vh] w-full">
              {/* Image de fond */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Overlay gradient */}
              <div className={`absolute inset-0 opacity-80`} />

              {/* Contenu */}
              <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl max-w-2xl">
                  {slide.description}
                </p>
                <div className="mt-8 flex items-center justify-center gap-4 sm:flex-row">
                  <a
                    href="https://wa.me/+393921094730?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full flex items-center gap-2 bg-white px-8 py-2 text-sm font-medium text-black transition hover:scale-105"
                  >
                    Prenota ora <WhatsAppLogo color="#25D366" />
                  </a>
                <a
                  href="/camere#hero"
                  className="rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Scopri le camere
                </a>
                </div>
                
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
