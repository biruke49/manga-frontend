export interface NavItem {
	label: string;
	href: string;
	children?: NavItem[];
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
		"Discover, read, and share Ethiopian manga and comics. A community for creators and readers.",
	url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000",
	locale: "en_US",
	tagline: "Read. Create. Share Ethiopian Manga.",
	announcement: "NEW MANGA RELEASES EVERY WEEK",
	announcementSecondary: "CREATORS WELCOME TO PUBLISH",
	phoneDisplay: "+251 913 922 700",
	phoneHref: "tel:+251913922700",
	email: "hello@yishakmanga.com",
	address: "Addis Ababa, Ethiopia",
	primaryCtaLabel: "Browse Manga",
	primaryCtaHref: "/browse",
	secondaryCtaLabel: "Start Reading",
	secondaryCtaHref: "/browse",
	serviceAreaLabel: "Join the Ethiopia Manga Community today.",
	licenses: [
		{ label: "Free to Read", number: "Always" },
		{ label: "Creator Tools", number: "Available" },
		{ label: "Community", number: "Growing" },
		{ label: "Support", number: "24/7" },
	],
};

export const mainNavigation: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Browse", href: "/browse" },
	{ label: "Library", href: "#library" },
	{ label: "Creators", href: "/login" },
];

export const footerNavigation = {
	services: [
		{ label: "Browse Manga", href: "/browse" },
		{ label: "Latest Releases", href: "/browse" },
		{ label: "Popular Series", href: "/browse" },
		{ label: "Genres", href: "/browse" },
	],
	company: [
		{ label: "About Yishak", href: "/" },
		{ label: "For Creators", href: "/login" },
		{ label: "Library", href: "#library" },
		{ label: "Contact", href: "#contact" },
	],
};

export const contactPoints: ContactPoint[] = [
	{ label: "Call", value: siteConfig.phoneDisplay, href: siteConfig.phoneHref },
	{ label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
	{ label: "Location", value: siteConfig.address },
];

export const heroContent = {
	eyebrow: "Ethiopia Manga Community",
	title: ["Discover Ethiopian Manga."],
	description:
		"A platform for Ethiopian manga creators and readers. Browse, read, and connect with the growing community.",
	primaryCta: { label: "Browse Manga", href: "/browse" },
	secondaryCta: { label: "Start Reading", href: "/browse" },
	statusTitle: "Community",
	statusLabel: "Active readers",
	statusValue: "Growing daily",
	statusNote: "Join the Ethiopia Manga Community today.",
};

export const serviceHighlights = [
	{
		title: "Read Free",
		description:
			"Access a growing library of Ethiopian manga and comics at no cost. Support creators by reading and sharing.",
		price: "Always Free",
		duration: "No Subscription",
		href: "/browse",
	},
	{
		title: "Publish Your Work",
		description:
			"Creators can upload and publish their manga chapters. Reach readers across Ethiopia and beyond.",
		price: "Creator Tools",
		duration: "Easy Upload",
		href: "/login",
	},
	{
		title: "Community Driven",
		description:
			"Comment, bookmark, and follow your favorite series. Connect with fellow manga enthusiasts.",
		price: "Engage & Share",
		duration: "Growing Community",
		href: "/browse",
	},
	{
		title: "Diverse Genres",
		description:
			"From action and adventure to romance and slice of life - discover stories that resonate with Ethiopian culture.",
		price: "Variety",
		duration: "Curated Content",
		href: "/browse",
	},
];

export const processSteps = [
	{
		title: "Browse",
		description:
			"Explore our collection of Ethiopian manga across multiple genres and categories.",
	},
	{
		title: "Read",
		description:
			"Dive into chapters with our smooth reader. Bookmark your place and pick up where you left off.",
	},
	{
		title: "Connect",
		description:
			"Follow creators, leave comments, and be part of the growing Ethiopian manga community.",
	},
	{
		title: "Create",
		description:
			"Publish your own manga and share your stories with readers who appreciate Ethiopian creativity.",
	},
];

export const proofGallery = {
	eyebrow: "Featured Manga",
	title: "Discover stories from Ethiopian creators.",
	description:
		"A curated selection of the best Ethiopian manga and comics on the platform.",
	items: [
		{
			title: "Action & Adventure",
			label: "Popular",
			meta: "Trending",
			description:
				"High-stakes stories set in Ethiopian landscapes and beyond.",
			image:
				"https://lh3.googleusercontent.com/aida-public/AB6AXuA3VG0vw2dO7nOLYw1uNMve6RK_YJJh1orWZYBluQ1uAKIjPzgfhpfYXX3BmAG9-J9AZL77sD5Ni7DdohZxMvtV2CGmIVbEfe65iDcsReZuUM3v4MfdJ550hi-O5b6bO24Mxfw9AvBIE2Ynq0s6EGtJNNrtz92fT6eeu-4FKY5ncAJ_gjrBTl38OBs6KUFKSVsykqiBQGVeWn_nbjGnJ4zSWnafWoCv8UM0OtvqfByO0YheYq9aqUTNO36pelXZX4XqIb1-ghV13tGP",
			alt: "Ethiopian manga cover art.",
		},
		{
			title: "Romance & Drama",
			label: "New",
			meta: "Updated",
			description:
				"Captivating love stories and dramatic tales set in modern Ethiopia.",
			image:
				"https://lh3.googleusercontent.com/aida-public/AB6AXuB5WlNBwzokrlLWBYiIjPF1b34sasTOnEDqNLrhE6PeafepCzIwyZZ5WRpyo8VYNBg8L7BF09qFPHrn5uY1x7pRHQgf9Qt58ZPNmpDnl8lRM0fp463crW1ycj0ULKlC7weYik0T6nRgqSoojvbS1U84KtT-nYgtLaQnwvWMQsuiduoquGGyXRSpEJwOeT9XXwFnZd3cBjo3fJPiTKPRu0JWnFa36bb9eMWSmH-CYN9Cu5KW91thRYdQ-uRBtEnmtV4cYNtmMAkuHglS",
			alt: "Ethiopian romance manga artwork.",
		},
		{
			title: "Fantasy & Mythology",
			label: "Featured",
			meta: "Editor's Pick",
			description:
				"Epic fantasy inspired by Ethiopian folklore and mythology.",
			image:
				"https://lh3.googleusercontent.com/aida-public/AB6AXuDYA1GvcPhu2B2S75-VLvk6LQL8B5Y7ovimYgFEpMAWRqyz_yFwc1DPM1DJkjfbjzg0oHct0NlnhrsbF89TOvcHbKb8wEF2aspbYnmAUw4b9mgSBoKhzaRn1hCQC9Q-vVImLZQdKFCReaMa6wnHBnRlnXAqwlM6CXddStNt2enEIHODp-KoXXBjbb24i2ckYP1LbLmvscDcLDCx9XqqtgMM5OQ4MM3BzumL2fwXrb2A-a7HsmmaItnNCxNQ93mJ5Q_YNv7zigyWOdXb",
			alt: "Ethiopian fantasy manga illustration.",
		},
	],
};

export const testimonials = [
	{
		name: "Great platform",
		location: "Reader",
		quote:
			"Finally a place where I can read Ethiopian manga. The community is growing and the content keeps getting better.",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuB7fNQyhoQsGAkCUmdIVYDWsDej94Fc558boBfW01DgBUEPxpWLrYXhNWWtcOxLCPRpQ92PISnBYjE7pZxIc6IcqKPn7x4J9Adgw2ODUn2oO_z-1JVh647L4WEIjaRolcvVKE2V9hNconrM2ltUATzbpnQpLMnrSfVQvZABe4Ybe9TxWScZ8abxY8Z0aZEwgq-G7cqRoxdn2WnyUUdvuN6vb8W0GfS8_DAHYdSGZPsFadrJcgiXqhZlAKEKB7bwhBADzomfgbXtOuY2",
		alt: "Manga reader enjoying content.",
	},
	{
		name: "Creator friendly",
		location: "Artist",
		quote:
			"As a creator, I love how easy it is to publish chapters and connect with readers. The tools are exactly what I need.",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuDoSelw4crnb_sdMXqS5x46ekVuR8clXRN-W0BmvPwhQ061vtsMfUA2GZz69kyRpTmyeCG6vnGfN5cfawADukTXrjhmwP4TrQR1HolU35dG9KX_ZXoTDn7ObMTkC_3ASlBEIUUq7kwJLaLnrO4SVxRAmUBOfOHKqZYzbkFKsPxHaYj5V4TeX8PQD-G_9hyf7A6dlInlZej7mp82CfIFRhw4j2YLfZvcs5LqILYa5P-5krbnYVCFbZvfDdBKGUldqGv6J3PcxHMKxpL_",
		alt: "Manga artist at work.",
	},
];

export const aboutStory = {
	title: "About Yishak",
	intro:
		"Yishak is the Ethiopia Manga Community - a platform where creators publish and readers discover Ethiopian manga.",
	body: [
		"We believe Ethiopian stories deserve a dedicated space. Our platform makes it easy for artists to share their work and for readers to find quality content.",
		"From action-packed adventures to heartfelt dramas, Yishak showcases the best of Ethiopian creativity in manga form.",
		"We are building more than a reading platform - we are building a community around Ethiopian manga culture.",
	],
};

export const contactDetails = {
	title: "Contact Yishak",
	description:
		"Have questions or want to get involved? Reach out to the Yishak team.",
	hours: "Our team is available to support both readers and creators.",
	activeSupport: "For urgent matters, contact us directly.",
	address: siteConfig.address,
};

export const seoDescriptions = {
	home: siteConfig.description,
	gallery:
		"Browse featured Ethiopian manga and comics on Yishak.",
	about:
		"Learn about Yishak - the Ethiopia Manga Community platform for creators and readers.",
	testimonials:
		"What readers and creators say about Yishak.",
	services:
		"Read, publish, and connect - everything you need for Ethiopian manga.",
	plans:
		"Free manga reading and creator tools for Ethiopian artists.",
	blog:
		"Yishak community updates, creator spotlights, and manga news.",
	contact:
		"Get in touch with the Yishak team.",
	serviceArea:
		"Yishak serves the Ethiopian manga community worldwide.",
	resources: "Creator guidelines, FAQs, and community resources for Yishak manga platform.",
	terms: "Terms of Service and Privacy Policy for Yishak.",
};
