"use client";

import { useState } from "react";

interface User {
  id?: number;
  email: string;
}

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export function useGetAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const login = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Basic validation
      if (!email.trim()) {
        throw new Error("Email is required");
      }

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      // Handle invalid JSON safely
      const data = await response.json().catch(() => null);
      console.log("Login response data:", data);
      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Authentication failed"
        );
      }

      setIsAuthenticated(true);

      setUser(
        data?.user || {
          email: email.trim(),
        }
      );
    } catch (err) {
      console.error("Login error:", err);

      setIsAuthenticated(false);
      setUser(null);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown authentication error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setError(null);
    }
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
  };
}