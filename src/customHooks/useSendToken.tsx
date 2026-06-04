// hooks/useVerifyTokenOnly.ts
import { useState } from 'react';

interface UseVerifyTokenOnlyReturn {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  verifyToken: (token: string) => Promise<boolean>;
}

export function useVerifyTokenOnly(endpoint = '/api/sendToken'): UseVerifyTokenOnlyReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyToken = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }), // only token
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid or expired token');
      }

      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      setError(err.message);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, isAuthenticated, verifyToken };
}