import { cache } from "react";
import { getPublicConfiguration } from "@/entities/configuration/api/public-configuration-repository";
import {
	type ContactPoint,
	footerNavigation,
	heroContent,
	mainNavigation,
	siteConfig,
} from "@/website/config/site-content";

export const getPublicSiteContent = cache(async () => {
	const configuration = await getPublicConfiguration();
	const phone = safeText(configuration?.supportPhone, siteConfig.phoneDisplay);
	const email = safeText(configuration?.supportEmail, siteConfig.email);
	const address = safeText(configuration?.address, siteConfig.address);
	const contactPoints = buildContactPoints(phone, email, address);
	const resolvedSiteConfig = {
		...siteConfig,
		name: safeText(configuration?.companyName, siteConfig.name),
		title: safeText(configuration?.defaultMetaTitle, siteConfig.title),
		description: safeText(configuration?.defaultMetaDescription, siteConfig.description),
		phoneDisplay: phone,
		phoneHref: phoneToHref(phone),
		email,
		address,
		primaryCtaLabel: safeText(configuration?.primaryCtaLabel, siteConfig.primaryCtaLabel),
		primaryCtaHref: safeHref(configuration?.primaryCtaHref, siteConfig.primaryCtaHref),
		secondaryCtaLabel: safeText(configuration?.secondaryCtaLabel, siteConfig.secondaryCtaLabel),
		secondaryCtaHref: safeHref(configuration?.secondaryCtaHref, siteConfig.secondaryCtaHref),
	};

	return {
		siteConfig: resolvedSiteConfig,
		contactPoints,
		heroContent: {
			...heroContent,
			eyebrow: safeText(configuration?.heroEyebrow, heroContent.eyebrow),
			primaryCta: {
				label: resolvedSiteConfig.primaryCtaLabel,
				href: resolvedSiteConfig.primaryCtaHref,
			},
			secondaryCta: {
				label: resolvedSiteConfig.secondaryCtaLabel,
				href: resolvedSiteConfig.secondaryCtaHref,
			},
		},
		mainNavigation,
		footerNavigation,
		isBeingMaintained: configuration?.isBeingMaintained ?? false,
	};
});

function hasLegacyContent(value: string | null | undefined) {
	return Boolean(
		value &&
			/(vantagefleet|apply now|\b(fleet|vantage|hvac|driver|drivers|car|cars|vehicle|vehicles|rideshare|delivery|washington|dc)\b)/i.test(value),
	);
}

function safeText(value: string | null | undefined, fallback: string) {
	const trimmed = value?.trim();
	return trimmed && !hasLegacyContent(trimmed) ? trimmed : fallback;
}

function safeHref(value: string | null | undefined, fallback: string) {
	const trimmed = value?.trim();
	if (!trimmed || hasLegacyContent(trimmed) || trimmed === "#apply") return fallback;
	return trimmed.startsWith("/") || trimmed.startsWith("#") ? trimmed : fallback;
}

function phoneToHref(value: string) {
	const normalized = value.replace(/[^\d+]/g, "");
	return normalized ? `tel:${normalized}` : "";
}

function buildContactPoints(phone: string, email: string, address: string): ContactPoint[] {
	return [
		phone ? { label: "Call", value: phone, href: phoneToHref(phone) } : null,
		email ? { label: "Email", value: email, href: `mailto:${email}` } : null,
		address ? { label: "Location", value: address } : null,
	].filter((point): point is ContactPoint => point !== null);
}
