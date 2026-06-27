"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/website/components/container";
import { logout } from "@/entities/auth/api/auth-repository";
import type { AuthProfile } from "@/entities/auth/model/types";

export function ProfileSection() {
  const router = useRouter();
  const [profile, setProfile] = useState<AuthProfile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_profile");
    const token = localStorage.getItem("auth_token");
    if (!stored || !token) {
      router.push("/login");
      return;
    }
    try {
      setProfile(JSON.parse(stored));
    } catch {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");
    if (token) await logout(token);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("auth_profile");
    router.push("/login");
  };

  if (!profile) return null;

  return (
    <section className="section-space">
      <Container className="max-w-lg">
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-primary">Profile</h1>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Name
              </p>
              <p className="mt-0.5 text-sm text-primary">{profile.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Phone
              </p>
              <p className="mt-0.5 text-sm text-primary">
                {profile.phoneNumber}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Account Type
              </p>
              <p className="mt-0.5 text-sm text-primary capitalize">
                {profile.type}
              </p>
            </div>
            {profile.email && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Email
                </p>
                <p className="mt-0.5 text-sm text-primary">{profile.email}</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            {profile.type === "creator" && (
              <a
                href={process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001/admin"}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/88"
              >
                Creator Dashboard
              </a>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted"
            >
              Sign Out
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
