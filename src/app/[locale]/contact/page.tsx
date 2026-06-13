"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setLoading(true)
      setStatus({ type: 'success', text: 'Message sent! We’ll get back to you soon.' });
      setFormData({ name: '', email: '', message: '' }); // reset form
    } catch (err: any) {
      setStatus({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-1 gap-10 min-h-screen">

      <h2 className="text-3xl font-bold text-[#3a3a3a]">
        {t("title")}
      </h2>
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 min-h-screen" >

        {/* ================= LEFT: INFO ================= */}
        <div className="space-y-6 row-span-2 h-[40vh]">


          <div className="space-y-4 text-[#3a3a3a]">
            <strong>
              <p className="text-[#3a3a3a] leading-relaxed">
                {t("description")}
              </p>
            </strong>
            <br />
            <br />
            <div>
              <strong>
                <p className="font-semibold">{t("address.label")}</p>
                <p>Siracusa, Italia</p>
              </strong>

            </div>

            <div>
              <strong>
                <p className="font-semibold">{t("phone.label")}</p>
                <p>+39 000 000 0000</p>
              </strong>
            </div>

            <div>
              <strong>

                <p className="font-semibold">{t("email.label")}</p>
                <p>info@geaguesthouse.it</p>
              </strong>
            </div>

            <div>
              <strong>
                <p className="font-semibold">{t("checkin.label")}</p>
                <p>{t("checkin.value")}</p>
              </strong>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: FORM ================= */}
        <div className="bg-white bg-white/10 shadow-lg rounded-2xl h-[40vh]">
          <form onSubmit={handleSubmit} className="space-y-4 text-[#3a3a3a] p-6 bg-white rounded-2xl">
            <input
              name="name"
              type="text"
              placeholder={t('form.namePlaceholder')}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 border-gray-700 bg-transparent text-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="email"
              type="email"
              placeholder={t('form.emailPlaceholder')}
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 border-gray-700 bg-transparent text-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="message"
              placeholder={t('form.messagePlaceholder')}
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 border-gray-700 bg-transparent text-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? t('form.sendingButton') : t('form.submitButton')}
            </button>

            {status && (
              <p className="text-green-500 text-center mt-2">
                {t('form.successMessage')}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}