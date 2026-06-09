"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Hotel } from "lucide-react";
import { useGetAuth } from "@/customHooks/useGetAuth";
import { useVerifyTokenOnly } from "@/customHooks/useSendToken";
import { setCredentials } from "@/store/authSlice";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showTokenField, setShowTokenField] = useState(false);
  const [error, setError] = useState("");
  const { isLoading, login } = useGetAuth();
  const { verifyToken } = useVerifyTokenOnly();
  const emailRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email !== null) {
      login(email);

      router.push("/sendToken");
      document.cookie = "auth-token=admin-session; path=/; max-age=86400";
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-gray-100 dark:from-black dark:to-zinc-900">
      <div className="w-full max-w-md p-8">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
            <Hotel size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Hotel Admin
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sign in to manage your hotel
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              onClick={() => {
                if (emailRef.current?.value === "") return;

                setShowTokenField(true);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Demo credentials: admin@example.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic'; 