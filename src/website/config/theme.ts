import type { CSSProperties } from "react";

type ThemeColor = `#${string}`;

interface ThemeTokens {
	primary: ThemeColor;
	primaryForeground: ThemeColor;
	secondary: ThemeColor;
	secondaryForeground: ThemeColor;
	accent: ThemeColor;
	accentForeground: ThemeColor;
	background: ThemeColor;
	foreground: ThemeColor;
	muted: ThemeColor;
	mutedForeground: ThemeColor;
	border: ThemeColor;
	card: ThemeColor;
	cardForeground: ThemeColor;
}

const defaultTheme: ThemeTokens = {
	primary: "#f5f1e8",
	primaryForeground: "#111217",
	secondary: "#272a34",
	secondaryForeground: "#f5f1e8",
	accent: "#e9563f",
	accentForeground: "#fffaf2",
	background: "#0c0d11",
	foreground: "#f5f1e8",
	muted: "#20222b",
	mutedForeground: "#a9a291",
	border: "#2b2d36",
	card: "#15161c",
	cardForeground: "#f5f1e8",
};

function readHexColor(value: string | undefined, fallback: ThemeColor): ThemeColor {
	if (!value) return fallback;
	const normalized = value.trim();
	return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(normalized)
		? (normalized as ThemeColor)
		: fallback;
}

export function getThemeTokens(): ThemeTokens {
	return {
		...defaultTheme,
		primary: readHexColor(process.env.NEXT_PUBLIC_THEME_PRIMARY, defaultTheme.primary),
		secondary: readHexColor(process.env.NEXT_PUBLIC_THEME_SECONDARY, defaultTheme.secondary),
		accent: readHexColor(process.env.NEXT_PUBLIC_THEME_ACCENT, defaultTheme.accent),
	};
}

export function getThemeStyleVariables() {
	const tokens = getThemeTokens();

	return {
		"--background": tokens.background,
		"--foreground": tokens.foreground,
		"--card": tokens.card,
		"--card-foreground": tokens.cardForeground,
		"--popover": tokens.card,
		"--popover-foreground": tokens.cardForeground,
		"--primary": tokens.primary,
		"--primary-foreground": tokens.primaryForeground,
		"--secondary": tokens.secondary,
		"--secondary-foreground": tokens.secondaryForeground,
		"--accent": tokens.accent,
		"--accent-foreground": tokens.accentForeground,
		"--muted": tokens.muted,
		"--muted-foreground": tokens.mutedForeground,
		"--border": tokens.border,
		"--input": tokens.border,
		"--ring": tokens.accent,
		"--destructive": "#d64545",
		"--surface-panel": "#15161c",
		"--surface-panel-strong": "#20222b",
		"--surface-inverse": "#f5f1e8",
		"--surface-inverse-foreground": "#111217",
	} as CSSProperties;
}

export const themeSourceOfTruth = {
	description:
		"Theme tokens live in src/website/config/theme.ts. Primary, secondary, and accent can also be overridden with NEXT_PUBLIC_THEME_PRIMARY, NEXT_PUBLIC_THEME_SECONDARY, and NEXT_PUBLIC_THEME_ACCENT.",
};
