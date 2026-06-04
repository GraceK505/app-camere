"use client";

export default function Loader({ isLoading = true }: { isLoading?: boolean; fadeOut?: boolean }) {


  return (
    <div
      className={`
        fixed top-0 left-0 w-full h-screen z-100
        flex items-center justify-center
        bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black
        transition-opacity duration-500 ease-out
        overflow-hidden
        ${isLoading ? "opacity-100" : "opacity-0 hidden"}
      `}
    >
      <div className="w-full h-full flex items-center justify-center top-0 left-0">
        <div className="text-4xl font-bold text-gray-800 dark:text-gray-200 animate-pulse flex items-center justify-center">
          <svg
            width={200}
            height={200}
            viewBox="0 0 150 150"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 55 V35 A20 20 0 0 1 70 35 V55"
              fill="none"
              stroke="#C98B67"
              strokeWidth="8"
              strokeLinecap="round"
            />

            <rect
              x="43"
              y="35"
              width="14"
              height="14"
              transform="rotate(45 50 42)"
              fill="#A9B5A2"
            />

            <path d="M38 56 H48 L43 62 H38 Z" fill="#D9C9A7" />
            <path d="M52 56 H62 L57 62 H52 Z" fill="#D9C9A7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
