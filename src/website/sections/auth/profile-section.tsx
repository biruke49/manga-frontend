"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/website/components/container";
import { logout } from "@/entities/auth/api/auth-repository";
import type { AuthProfile } from "@/entities/auth/model/types";

export function ProfileSection() {
	const router = useRouter();
	const [profile, setProfile] = useState<AuthProfile | null>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("auth_profile");
		const token = localStorage.getItem("auth_token");
		if (stored && token) {
			try {
				setProfile(JSON.parse(stored) as AuthProfile);
			} catch {
				setProfile(null);
			}
		}
		setReady(true);
	}, []);

	useEffect(() => {
		if (ready && !profile) {
			router.push("/login");
		}
	}, [profile, ready, router]);

	const handleLogout = async () => {
		const token = localStorage.getItem("auth_token");
		if (token) await logout(token);
		localStorage.removeItem("auth_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("auth_profile");
		router.push("/login");
	};

	if (!ready || !profile) return null;

	return (
		<section className="section-space">
			<Container className="max-w-lg">
				<div className="rounded-lg border border-white/10 bg-card p-8 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
					<p className="eyebrow text-accent">Account</p>
					<h1 className="mt-2 text-2xl font-black text-foreground">Profile</h1>

					<div className="mt-6 space-y-4">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
								Name
							</p>
							<p className="mt-0.5 text-sm text-foreground">{profile.name}</p>
						</div>
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
								Phone
							</p>
							<p className="mt-0.5 text-sm text-foreground">
								{profile.phoneNumber}
							</p>
						</div>
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
								Account Type
							</p>
							<p className="mt-0.5 text-sm capitalize text-foreground">
								{profile.type}
							</p>
						</div>
						{profile.email ? (
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
									Email
								</p>
								<p className="mt-0.5 text-sm text-foreground">{profile.email}</p>
							</div>
						) : null}
					</div>

					<div className="mt-8 flex gap-3">
						{profile.type === "creator" ? (
							<a
								href={process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001/admin"}
								className="rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition hover:bg-accent/90"
							>
								Creator Dashboard
							</a>
						) : null}
						<button
							type="button"
							onClick={handleLogout}
							className="rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted"
						>
							Sign Out
						</button>
					</div>
				</div>
			</Container>
		</section>
	);
}
