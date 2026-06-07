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
    id: 8,
    title: "Slide 8",
    description: "Comfort moderno e design curato per un soggiorno semplice e senza pensieri.",
    bgColor: "bg-gradient-to-r from-fuchsia-500 to-pink-600",
    image: "/home-slider/B711BE29-BC58-4E64-8226-959C33B73E1D.png",
  },
  // {
  //   id: 2,
  //   title: "Slide 4",
  //   description: "Interni accoglienti e curati, con un’atmosfera calda perfetta per un soggiorno rilassante.",
  //   bgColor: "bg-gradient-to-r from-pink-500 to-rose-600",
  //   image: "/home-slider/IMG-1.jpeg",
  // },
  // {
  //   id: 4,
  //   title: "Slide 5",
  //   description: "Spazi moderni e funzionali che uniscono design, comfort e praticità.",
  //   bgColor: "bg-gradient-to-r from-indigo-500 to-purple-600",
  //   image: "/home-slider/IMG_7696.webp",
  // },
  // {
  //   id: 5,
  //   title: "Slide 6",
  //   description: "Un soggiorno fresco e luminoso, dove semplicità e comfort si incontrano.",
  //   bgColor: "bg-gradient-to-r from-green-500 to-emerald-600",
  //   image: "/home-slider/copy_F0F3C459-6DB1-4AD2-AE74-DCD5C65502BB.jpeg",
  // },
  // {
  //   id: 7,
  //   title: "Slide 7",
  //   description: "Toni caldi e dettagli eleganti creano un’atmosfera rilassante e piacevole.",
  //   bgColor: "bg-gradient-to-r from-yellow-500 to-amber-600",
  //   image: "/home-slider/copy_A79AB742-4C47-48A3-A739-748DE6735CC2.jpeg",
  // },

];

export default function Slider() {
  const { data } = useGetAll();

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
            <div className="relative h-screen md:h-[100vh] w-full">
              {/* Image de fond */}
              <div
                className="absolute inset-0 md:bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Overlay gradient */}
              <div className={`absolute inset-0 opacity-80`} />

              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full flex flex-col items-center justify-end text-white text-center px-6">
                <div className="mt-8 flex items-center flex-col md:flex-row justify-center gap-4 sm:flex-row">
                  <a
                    href="https://wa.me/+393921094730?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full flex hover:text-white border-2 border-[#000000bd] text-white bg-[#6b4e3d] hover:bg-[#5a4133] items-center gap-2 px-8 py-2 text-sm font-medium text-black transition hover:scale-105"
                  >
                    Prenota ora <WhatsAppLogo color="#25D366" />
                  </a>
                  <a
                    href="/camere#hero"
                    className="rounded-full border-2 border-[#000000] text-[#2b2b2b] px-8 py-3 text-sm font-medium transition hover:bg-gray-500/50"
                  >
                    Scopri le camere
                  </a>
                </div>
              </div>
              {/* Contenu */}
              <div className="absolute bottom-[30px] h-auto left-1/2 transform -translate-x-1/2 text-white text-center px-6">
                <h2 className="text-sm text-stroke md:text-2xl max-w-2xl">
                  {slide.description}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
