"use client";

import { useState } from "react";
import { login } from "@/entities/auth/api/auth-repository";
import { Container } from "@/website/components/container";

export function LoginSection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("employee");
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
			window.location.assign("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-space">
      <Container className="max-w-md">
        <div className="rounded-lg border border-white/10 bg-card p-8 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
          <p className="eyebrow text-accent">Account</p>
          <h1 className="mt-2 text-2xl font-black text-foreground">Sign in</h1>
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
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-ring focus:ring-1 focus:ring-ring"
              >
                <option value="employee">Employee</option>
                <option value="creator">Creator</option>
                <option value="reader">Reader</option>
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
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-ring focus:ring-1 focus:ring-ring"
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
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

        </div>
      </Container>
    </section>
  );
}
