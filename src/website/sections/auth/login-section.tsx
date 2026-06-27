"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/entities/auth/api/auth-repository";
import { Container } from "@/website/components/container";

export function LoginSection() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("reader");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await login(phoneNumber, password, type);
      localStorage.setItem("auth_token", result.accessToken);
      localStorage.setItem("refresh_token", result.refreshToken);
      localStorage.setItem("auth_profile", JSON.stringify(result.profile));
      if (type === "creator") {
        window.location.assign("/profile");
      } else {
        window.location.assign("/profile");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-space">
      <Container className="max-w-md">
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-primary">Sign In</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="type"
                className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
              >
                Account Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-primary outline-none transition focus:border-ring focus:ring-1 focus:ring-ring"
              >
                <option value="reader">Reader</option>
                <option value="creator">Creator</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="0912345678"
                required
                className="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-primary outline-none transition focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-primary outline-none transition focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/88 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/login" className="text-primary underline">
              Contact admin
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
