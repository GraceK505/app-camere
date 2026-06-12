"use client";

import { useMemo, useState } from "react";

export default function ClientGallery({ data, title }: any) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [unblur, setUnblur] = useState(false);

  const folder = useMemo(
    () =>
      data.category
        .replace("Camera", "")
        .toLowerCase()
        .trim(),
    [data.category]
  );

  const images = useMemo(() => {
    return data.images.map((img: string) => `/${folder}/${img.slice(0, 8)}.jpeg`);
  }, [data.images, folder]);

  const openGallery = () => {
    setIndex(0);
    setUnblur(true);
    setOpen(true);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold mt-3 text-[#2b2b2b]">
        {title}
      </h1>

      <br />

      {/* PREVIEW */}
      <div
        onClick={openGallery}
        className="relative h-[400px] w-full overflow-hidden cursor-pointer flex items-center justify-center group"
      >
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            backgroundImage: `url(${images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: unblur ? "blur(0px)" : "blur(12px)",
            opacity: unblur ? 1 : 0.3,
            transform: unblur ? "scale(1)" : "scale(1.1)",
          }}
        />

        <div className="absolute inset-0 bg-black/20" />

        {/* PLUS ICON */}
        <svg
          className="relative z-10 w-14 h-14 text-white opacity-70 group-hover:opacity-100 transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          {/* CLOSE */}
          <button
            onClick={() => {
              setOpen(false);
              setUnblur(false);
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl"
          >
            ×
          </button>

          {/* IMAGE */}
          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
            <img
              src={images[index]}
              alt={`Image ${index + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            {/* NEXT */}
            <div
              onClick={next}
              className="absolute right-0 top-0 h-full w-1/2 cursor-e-resize"
            />

            {/* PREV */}
            <div
              onClick={prev}
              className="absolute left-0 top-0 h-full w-1/2 cursor-w-resize"
            />
          </div>

          {/* COUNTER */}
          <div className="absolute bottom-6 text-white">
            {index + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}