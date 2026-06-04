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
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
      
      {/* ================= LEFT: INFO ================= */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Contattaci
        </h2>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Siamo a tua disposizione per qualsiasi informazione su disponibilità,
          prezzi o servizi della struttura.
        </p>

        <div className="space-y-4 text-gray-700 dark:text-gray-200">
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
      <div className="bg-white dark:bg-white/10 shadow-lg rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Il tuo nome"
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            type="email"
            placeholder="La tua email"
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="message"
            placeholder="Il tuo messaggio"
            rows={5}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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