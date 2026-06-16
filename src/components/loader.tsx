"use client";

export default function Loader({ isLoading = true }: { isLoading?: boolean; fadeOut?: boolean }) {


return (
  <div
    className={`
      fixed top-0 left-0 w-full h-full z-100
      flex items-center justify-center
      bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900
      transition-opacity duration-500 ease-out
      overflow-hidden
      ${isLoading ? "opacity-100" : "opacity-0 hidden"}
    `}
  >
    <div className="w-full h-full flex items-center justify-center bg-black/20">
      <div className="text-4xl font-bold text-white animate-pulse flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-30 h-30 mr-4 object-contain rounded-full"
        />
      </div>
    </div>
  </div>
);
}
