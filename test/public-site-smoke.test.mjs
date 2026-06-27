import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, it } from "node:test";

const root = process.cwd();

async function source(path) {
	return readFile(join(root, path), "utf8");
}

describe("public website smoke coverage", () => {
	it("renders the homepage through the public site shell and core sections", async () => {
		const page = await source("src/website/pages/home-page.tsx");

		for (const section of [
			"SiteShell",
			"HomeHeroSection",
			"ServicesOverviewSection",
			"PlansSection",
			"ProcessSection",
			"AboutSection",
			"CommunitySection",
			"TestimonialsSection",
			"HomeFaqSection",
			"CtaSection",
		]) {
			assert.match(page, new RegExp(`<${section}\\b|import \\{ ${section} \\}`));
		}
	});

	it("loads fleet data from the public API and does not render fake fallback vehicles", async () => {
		const plans = await source("src/website/sections/plans-section.tsx");
		const repository = await source("src/entities/fleet/api/public-fleet-repository.ts");

		assert.match(plans, /getPublicFleetVehicles/);
		assert.match(plans, /<FleetFilteredList fleet=\{apiFleet\}/);
		assert.doesNotMatch(plans, /fallbackFleet|fallback-prius|VAN-214/);
		assert.match(repository, /\/fleet\/public-vehicles/);
	});

	it("supports client-side fleet filtering and a clean empty state", async () => {
		const filters = await source("src/website/sections/fleet-filtered-list.tsx");

		assert.match(filters, /useState\("all"\)/);
		assert.match(filters, /locationFilter/);
		assert.match(filters, /typeFilter/);
		assert.match(filters, /filteredFleet/);
		assert.match(filters, /No vehicles match those filters/);
		assert.match(filters, /Fleet availability is being updated/);
		assert.match(filters, /Clear Filters/);
	});

	it("submits public vehicle applications through the real API endpoint", async () => {
		const form = await source("src/website/sections/application-form.tsx");
		const repository = await source("src/entities/fleet/api/public-application-repository.ts");

		for (const field of ["name", "phone", "email", "location", "vehicleInterest", "workType", "notes"]) {
			assert.match(form, new RegExp(field));
		}
		assert.match(form, /submitPublicVehicleApplication/);
		assert.match(repository, /method: "POST"/);
		assert.match(repository, /\/fleet\/public-application/);
	});

	it("uses public configuration for metadata and shell content", async () => {
		const appPage = await source("src/app/page.tsx");
		const layout = await source("src/app/layout.tsx");
		const content = await source("src/website/lib/public-site-content.ts");

		assert.match(appPage, /generateMetadata/);
		assert.match(appPage, /getPublicSiteContent/);
		assert.match(layout, /getPublicSiteContent/);
		assert.match(content, /getPublicConfiguration/);
		assert.match(content, /announcement/);
		assert.match(content, /aboutContent/);
	});
});
