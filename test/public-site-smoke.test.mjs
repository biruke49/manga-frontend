import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, it } from "node:test";

const root = process.cwd();

async function source(path) {
	return readFile(join(root, path), "utf8");
}

describe("public website smoke coverage", () => {
	it("renders API-backed manga on the home and browse pages", async () => {
		const home = await source("src/website/pages/home-page.tsx");
		const browse = await source("src/website/pages/browse-page.tsx");

		assert.match(home, /getPublicMangas\(\)/);
		assert.match(home, /<HomeHeroSection/);
		assert.match(browse, /getPublicMangas\(\)/);
		assert.match(browse, /<BrowseSection mangas=\{mangas\}/);
	});

	it("uses the public manga and chapter API routes without fake data fallbacks", async () => {
		const repository = await source("src/entities/manga/api/manga-repository.ts");
		const hero = await source("src/website/sections/home-hero-section.tsx");
		const detail = await source("src/website/sections/manga/manga-detail-section.tsx");
		const pdfReader = await source("src/website/sections/manga/pdf-reader-section.tsx");

		assert.match(repository, /\/manga\/public-mangas/);
		assert.match(repository, /\/manga\/public-manga-detail\/\$\{id\}/);
		assert.match(repository, /\/chapters\/reader\/\$\{chapterId\}/);
		assert.doesNotMatch(hero, /fallbackGenres|FauxCover|"New"|"Fresh"/);
		assert.match(detail, /manga\.pdfUrl/);
		assert.match(detail, /Open book/);
		assert.match(detail, /\/manga\/\$\{manga\.id\}\/read/);
		assert.doesNotMatch(detail, /<iframe/);
		assert.match(pdfReader, /<iframe/);
		assert.match(pdfReader, /page=1&view=FitH&pagemode=none&toolbar=0&navpanes=0/);
	});

	it("keeps navigation on routes and anchors that exist", async () => {
		const content = await source("src/website/config/site-content.ts");
		const sitemap = await source("src/app/sitemap.ts");

		assert.match(content, /href: "\/#library"/);
		assert.match(content, /href: "\/browse"/);
		assert.match(content, /href: "\/login"/);
		assert.doesNotMatch(content, /href: "#library"/);
		assert.doesNotMatch(sitemap, /\/booking/);
	});

	it("includes real public pages and published manga in the sitemap", async () => {
		const sitemap = await source("src/app/sitemap.ts");

		assert.match(sitemap, /"\/browse"/);
		assert.match(sitemap, /"\/login"/);
		assert.match(sitemap, /getPublicMangas/);
		assert.match(sitemap, /\/manga\/\$\{manga\.id\}/);
	});

	it("uses API configuration without exposing legacy fleet content or local dashboard links", async () => {
		const content = await source("src/website/lib/public-site-content.ts");
		const profile = await source("src/website/sections/auth/profile-section.tsx");

		assert.match(content, /getPublicConfiguration/);
		assert.match(content, /hasLegacyContent/);
		assert.doesNotMatch(profile, /localhost:3001/);
	});
});
