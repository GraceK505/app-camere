"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export function useGetAll() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const res = await fetch(`${locale == "it" ? "": "/"}${locale}/api/getAll`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}