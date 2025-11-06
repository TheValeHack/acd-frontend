"use client";

import { useEffect, useState, useCallback } from "react";
import { getSession } from "next-auth/react";

interface UseFetchOptions extends RequestInit {
  autoFetch?: boolean;
  auth?: boolean; // true kalau butuh Bearer Token
}

export function useFetch<T = any>(
  endpoint: string,
  options: UseFetchOptions = { autoFetch: true, auth: true }
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(options.autoFetch ?? true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let token: string | null = null;
      if (options.auth) {
        const session = await getSession();
        token = session?.accessToken as string | null;
      }

      const res = await fetch(
        endpoint.startsWith("http")
          ? endpoint
          : `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  useEffect(() => {
    if (options.autoFetch) fetchData();
  }, [fetchData, options.autoFetch]);

  return { data, error, loading, refetch: fetchData };
}
