"use client";

import { useState } from "react";

export default function ClientGallery({ data }: any) {
  const [openGallery, setOpenGallery] = useState(false);
  const [counter, setCounter] = useState(0);
  const [unblur, setUnblur] = useState(false);

  const nextImage = () => {
    setCounter((prev) => (prev + 1) % data.images.length);
  };

  return (
    <>
    <div >

      {/* OPEN BUTTON (your plus icon trigger) */}
      
      <div
        onClick={() => {
          setUnblur(true);
          setOpenGallery(true);
        }}
        className="relative h-[400px] w-full overflow-hidden cursor-pointer flex items-center justify-center group"
      >
        {/* Background image (blurred preview) */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            backgroundImage: `url(/${data.category
              .replace("Camera", "")
              .toLowerCase()
              .trim()}/${data.images[0].slice(0, 8)}.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: unblur ? "blur(0px)" : "blur(12px)",
            opacity: unblur ? 1 : 0.3,
            transform: unblur ? "scale(1)" : "scale(1.1)",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Plus icon */}
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

      {/* =========================
              POPUP
      ========================== */}
      {openGallery && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          {/* CLOSE */}
          <button
            onClick={() => {setOpenGallery(false); setUnblur(false)}}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* IMAGE */}
          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
            <img
              src={`/${data.category
                .replace("Camera", "")
                .toLowerCase()
                .trim()}/${data.images[counter].slice(0, 8)}.jpeg`}
              alt={`Image ${counter + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            {/* NEXT */}
            <div
              onClick={nextImage}
              className="absolute right-0 top-0 h-full w-1/2 cursor-e-resize"
            />

            {/* PREV */}
            <div
              onClick={() =>
                setCounter((prev) =>
                  prev === 0 ? data.images.length - 1 : prev - 1
                )
              }
              className="absolute left-0 top-0 h-full w-1/2 cursor-w-resize"
            />
          </div>
        </div>
      )}
    </div>
    </>
  );
}