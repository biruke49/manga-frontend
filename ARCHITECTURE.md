## Architecture

This project uses a simple layered structure tailored for public-facing websites.

### Layers

- `src/app`
  App Router entry points only.
  Owns route files such as `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx`.
  Route files should stay thin and delegate rendering to the website layer.

- `src/website`
  Website-specific composition layer.
  Owns navigation config, site content/config, reusable website sections, and composed page components.
  This is where most future website work should happen.

- `src/shared`
  Low-level reusable primitives and utilities only.
  Keep this layer generic.
  It should not know about specific pages, website sections, or business/domain concepts.

### Design Intent

- This is not a product-dashboard architecture.
- This is not strict FSD.
- It is a lightweight composition-based website architecture.

The goal is to keep public website work easy:

- routes are clear
- pages are composed from reusable sections
- shared code stays low-level
- site-specific composition stays out of `shared`

### Dependency Direction

- `app` may import from `website` and `shared`
- `website` may import from `shared`
- `shared` must not import from `website` or `app`

### Folder Guidelines

- Put route-level files in `src/app`
- Put page composition in `src/website/pages`
- Put reusable website blocks in `src/website/sections`
- Put navigation, copy, and site configuration in `src/website/config`
- Put generic helpers and UI primitives in `src/shared`

### What To Avoid

- Reintroducing dashboard or CRUD-oriented domain layers unless the project genuinely becomes a product app
- Moving site-specific copy or layout composition into `shared`
- Adding API clients, auth flows, or backend abstractions before a real website requirement exists
- Creating deep abstractions for one-off sections

### How To Extend

- Add a new public page:
  Create the route in `src/app`, then compose it from `src/website/pages` and `src/website/sections`.

- Add a reusable section:
  Place it in `src/website/sections` and keep it content-driven through props or `src/website/config`.

- Add a low-level primitive:
  Only place it in `src/shared` if it is genuinely generic and reusable across multiple website sections.
