import { cache } from "react";
import { getPublicConfiguration } from "@/entities/configuration/api/public-configuration-repository";
import {
	type ContactPoint,
	footerNavigation,
	heroContent,
	mainNavigation,
	type NavItem,
	siteConfig,
} from "@/website/config/site-content";

const navigationOrder = [
	"/",
	"/browse",
	"#library",
	"/login",
	"/profile",
	"#about",
	"#faq",
];

export const getPublicSiteContent = cache(async () => {
	const configuration = await getPublicConfiguration();
	const resolvedPhone = safeText(configuration?.supportPhone, siteConfig.phoneDisplay);
	const resolvedEmail = safeText(configuration?.supportEmail, siteConfig.email);
	const resolvedAddress = safeText(configuration?.address, siteConfig.address);
	const parsedContactPoints = parseContactPoints(safeConfigText(configuration?.contactPointsText), [
		{ label: "Call", value: resolvedPhone, href: phoneToHref(resolvedPhone) },
		{ label: "Email", value: resolvedEmail, href: `mailto:${resolvedEmail}` },
		{ label: "Coverage", value: resolvedAddress },
	]);
	const resolvedSiteConfig = {
		...siteConfig,
		name: safeText(configuration?.companyName, siteConfig.name),
		title: safeText(configuration?.defaultMetaTitle, siteConfig.title),
		description: safeText(configuration?.defaultMetaDescription, siteConfig.description),
		announcement: safeText(configuration?.announcement, siteConfig.announcement),
		announcementSecondary: safeText(configuration?.announcementSecondary, siteConfig.announcementSecondary),
		phoneDisplay: resolvedPhone,
		phoneHref: parsedContactPoints.find((point) => point.href?.startsWith("tel:"))?.href || phoneToHref(resolvedPhone),
		email: resolvedEmail,
		address: resolvedAddress,
		primaryCtaLabel: safeText(configuration?.primaryCtaLabel, siteConfig.primaryCtaLabel),
		primaryCtaHref: safeHref(configuration?.primaryCtaHref, siteConfig.primaryCtaHref),
		secondaryCtaLabel: safeText(configuration?.secondaryCtaLabel, siteConfig.secondaryCtaLabel),
		secondaryCtaHref: safeHref(configuration?.secondaryCtaHref, siteConfig.secondaryCtaHref),
		serviceAreaLabel: safeText(configuration?.serviceAreaLabel, siteConfig.serviceAreaLabel),
		licenses: parseLicenses(safeConfigText(configuration?.licensesText), siteConfig.licenses),
	};
	const resolvedMainNavigation = mainNavigation;

	return {
		siteConfig: resolvedSiteConfig,
		contactPoints: parsedContactPoints,
		heroContent: {
			...heroContent,
			eyebrow: safeText(configuration?.heroEyebrow, heroContent.eyebrow),
			title: [safeText(configuration?.heroTitle, heroContent.title.join(" "))],
			description: safeText(configuration?.heroDescription, heroContent.description),
			primaryCta: {
				label: resolvedSiteConfig.primaryCtaLabel,
				href: resolvedSiteConfig.primaryCtaHref,
			},
			secondaryCta: {
				label: resolvedSiteConfig.secondaryCtaLabel,
				href: resolvedSiteConfig.secondaryCtaHref,
			},
			statusNote: resolvedSiteConfig.serviceAreaLabel,
			announcement: resolvedSiteConfig.announcement,
			announcementSecondary: resolvedSiteConfig.announcementSecondary,
		},
		mainNavigation: resolvedMainNavigation,
		footerNavigation: {
			services: resolvedMainNavigation.filter((item) => item.href !== "/" && item.href !== "#contact").slice(0, 4),
			company: footerNavigation.company,
		},
		isBeingMaintained: configuration?.isBeingMaintained ?? false,
	};
});

function hasLegacyContent(value: string | null | undefined) {
	return Boolean(
		value &&
			/(vantagefleet|apply now|\b(fleet|vantage|hvac|driver|drivers|car|cars|vehicle|vehicles|rideshare|delivery|washington|dc)\b)/i.test(value),
	);
}

function safeConfigText(value: string | null | undefined) {
	return hasLegacyContent(value) ? undefined : value;
}

function safeText(value: string | null | undefined, fallback: string) {
	const trimmed = value?.trim();
	return trimmed && !hasLegacyContent(trimmed) ? trimmed : fallback;
}

function safeHref(value: string | null | undefined, fallback: string) {
	const trimmed = value?.trim();
	return trimmed && trimmed !== "#apply" && !hasLegacyContent(trimmed) ? trimmed : fallback;
}

function phoneToHref(value: string) {
	const normalized = value.replace(/[^\d+]/g, "");
	return normalized ? `tel:${normalized.startsWith("+") ? normalized : `+1${normalized}`}` : siteConfig.phoneHref;
}

function parseNavigation(value: string | null | undefined, fallback: NavItem[]): NavItem[] {
	const parsed = value?.split("\n")
		.map((line) => {
			const [label, href] = line.split("|").map((part) => part?.trim());
			return label && href && !hasLegacyContent(`${label} ${href}`) ? { label, href } : null;
		})
		.filter((item): item is { label: string; href: string } => Boolean(item));

	return parsed && parsed.length >= 3 ? parsed : fallback;
}

function orderNavigation(items: NavItem[]) {
	return [...items].sort((a, b) => {
		const aIndex = navigationOrder.indexOf(a.href);
		const bIndex = navigationOrder.indexOf(b.href);
		const normalizedA = aIndex === -1 ? navigationOrder.length : aIndex;
		const normalizedB = bIndex === -1 ? navigationOrder.length : bIndex;
		return normalizedA - normalizedB;
	});
}

function parseContactPoints(value: string | null | undefined, fallback: ContactPoint[]): ContactPoint[] {
	const parsed = value?.split("\n")
		.map((line) => {
			const [label, displayValue, href] = line.split("|").map((part) => part?.trim());
			return label && displayValue ? { label, value: displayValue, ...(href ? { href } : {}) } : null;
		})
		.filter((item): item is { label: string; value: string; href?: string } => Boolean(item));

	return parsed?.length ? parsed : fallback;
}

function parseLicenses(value: string | null | undefined, fallback: Array<{ label: string; number: string }>) {
	const parsed = value?.split("\n")
		.map((line) => {
			const [label, number] = line.split("|").map((part) => part?.trim());
			return label && number ? { label, number } : null;
		})
		.filter((item): item is { label: string; number: string } => Boolean(item));

	return parsed?.length ? parsed : fallback;
}

function parseCoverageAreas(value: string | null | undefined, address: string) {
	const points = parseContactPoints(value, []);
	const offices = points.filter((point) => point.label.toLowerCase().includes("office"));
	return [offices[0]?.value || address, "Downtown DC", "Capitol Hill"].filter(Boolean);
}
