export interface NavItem {
	label: string;
	href: string;
}

export interface ContactPoint {
	label: string;
	value: string;
	href?: string;
}

export const siteConfig = {
	name: "YISHAK",
	title: "YISHAK | Ethiopia Manga Community",
	description:
		"Discover and read manga and comics from Ethiopian creators.",
	url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:6003",
	locale: "en_US",
	tagline: "Read. Create. Share Ethiopian Manga.",
	phoneDisplay: "",
	phoneHref: "",
	email: "",
	address: "",
	primaryCtaLabel: "Browse Manga",
	primaryCtaHref: "/browse",
	secondaryCtaLabel: "Creator Sign In",
	secondaryCtaHref: "/login",
};

export const mainNavigation: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Browse", href: "/browse" },
	{ label: "Library", href: "/#library" },
	{ label: "Creators", href: "/login" },
];

export const footerNavigation = {
	manga: [
		{ label: "Browse Manga", href: "/browse" },
		{ label: "Latest Series", href: "/#library" },
	],
	account: [
		{ label: "Creator Sign In", href: "/login" },
		{ label: "Profile", href: "/profile" },
	],
};

export const heroContent = {
	eyebrow: "Ethiopia Manga Community",
	primaryCta: { label: "Browse Manga", href: "/browse" },
	secondaryCta: { label: "Creator Sign In", href: "/login" },
};
