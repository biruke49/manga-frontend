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
	primary: "#151522",
	primaryForeground: "#f1f0f7",
	secondary: "#202844",
	secondaryForeground: "#f1f0f7",
	accent: "#e94560",
	accentForeground: "#ffffff",
	background: "#090910",
	foreground: "#f1f0f7",
	muted: "#202033",
	mutedForeground: "#a6a3ba",
	border: "#2b2b42",
	card: "#151522",
	cardForeground: "#f1f0f7",
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
		"--ring": tokens.secondary,
		"--destructive": "#ba1a1a",
		"--surface-panel": "#151522",
		"--surface-panel-strong": "#202033",
		"--surface-inverse": "#f1f0f7",
		"--surface-inverse-foreground": "#090910",
	} as CSSProperties;
}

export const themeSourceOfTruth = {
	description:
		"Theme tokens live in src/website/config/theme.ts. Primary, secondary, and accent can also be overridden with NEXT_PUBLIC_THEME_PRIMARY, NEXT_PUBLIC_THEME_SECONDARY, and NEXT_PUBLIC_THEME_ACCENT.",
};
