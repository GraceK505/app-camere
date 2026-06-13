"use client";

export default function Loader({ isLoading = true }: { isLoading?: boolean; fadeOut?: boolean }) {


  return (
    <div
    style={{ backgroundImage: "url(/sfondo.jpeg)" }}
      className={`
        fixed top-0 left-0 w-full h-full z-100
        flex items-center justify-center
        bg-gradient-to-br from-gray-100 to-gray-200 from-gray-900 to-black
        transition-opacity duration-500 ease-out
        ba
        overflow-hidden
        ${isLoading ? "opacity-100" : "opacity-0 hidden"}
      `}
    >
      <div className="w-full h-full flex items-center justify-center top-0 left-0">
        <div className="text-4xl font-bold text-gray-800 text-gray-200 animate-pulse flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="w-30 h-30 mr-4 object-contain rounded-full" />
        </div>
      </div>
    </div>
  );
}
