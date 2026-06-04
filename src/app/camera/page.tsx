"use client";

import Link from "next/link";
import { useGetAll } from "@/customHooks/useGetAll";

export default function CameraPage() {
  const { data, loading, error } = useGetAll();
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold">Nos Chambres</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {data?.map((room) => (
          <Link
            key={room.id}
            href={`/camera/${room.id}`}
            className="p-6 rounded-2xl border hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{room.title}</h2>
            <p className="mt-2 text-sm text-gray-500">Voir les détails</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
