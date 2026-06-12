"use client";

import { ReactNode, useMemo, useState } from "react";

interface ImageSliderProps {
  images: string[] | any;
  category: string;
  title?: string;
  children: ReactNode;
}

export default function ImageSlider({
  images,
  category,
  title,
  children,
}: ImageSliderProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const imageUrls = useMemo(
    () => images?.splice(",").map((img: any) => `/${category}/${img}.jpeg`),
    [images]
  );

  const next = () => {
    setIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            ×
          </button>

          <button
            onClick={prev}
            className="absolute left-6 text-white text-5xl"
          >
            ‹
          </button>

          <img
            src={imageUrls[index]}
            alt={`${title}-${index}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button
            onClick={next}
            className="absolute right-6 text-white text-5xl"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}