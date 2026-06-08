"use client";

import { useState } from "react";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const data = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 min-h-screen" >
      
      {/* ================= LEFT: INFO ================= */}
      <div className="space-y-6 row-span-2 h-[40vh]">
        <h2 className="text-3xl font-bold text-[#3a3a3a]">
          Contattaci
        </h2>

        <p className="text-[#3a3a3a] leading-relaxed">
          Siamo a tua disposizione per qualsiasi informazione su disponibilità,
          prezzi o servizi della struttura.
        </p>

        <div className="space-y-4 text-[#3a3a3a]">
          <div>
            <p className="font-semibold">📍 Indirizzo</p>
            <p>Siracusa, Italia</p>
          </div>

          <div>
            <p className="font-semibold">📞 Telefono</p>
            <p>+39 000 000 0000</p>
          </div>

          <div>
            <p className="font-semibold">✉️ Email</p>
            <p>info@geaguesthouse.it</p>
          </div>

          <div>
            <p className="font-semibold">🕒 Check-in</p>
            <p>Self check-in 24h disponibile</p>
          </div>
        </div>
      </div>

      {/* ================= RIGHT: FORM ================= */}
      <div className="bg-white dark:bg-white/10 shadow-lg rounded-2xl h-[40vh]">
        <form onSubmit={handleSubmit} className="space-y-4 text-[#3a3a3a]  p-6 bg-white rounded-2xl">
          <input
            name="name"
            type="text"
            placeholder="Il tuo nome"
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            type="email"
            placeholder="La tua email"
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="message"
            placeholder="Il tuo messaggio"
            rows={5}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Invio..." : "Invia messaggio"}
          </button>

          {success && (
            <p className="text-green-500 text-center mt-2">
              Messaggio inviato con successo ✔
            </p>
          )}
        </form>
      </div>
    </div>
  );
}