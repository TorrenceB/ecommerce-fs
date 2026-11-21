# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Coffee Roaster E-commerce

A production-grade coffee roaster storefront by Torrence B, inspired by
firsthand work with coffee farmers in Costa Rica. It is Torrence's **primary
public portfolio demo** (shared with recruiters), meant to show Senior
Fullstack depth in backend and system design, not breadth of features.
Guiding principle: **intentional, documented, and defensible over large.**

Priority order: domain → data model → API → frontend. Don't let frontend work
pull focus before the backend underneath it is solid.

## Division of Labor (read first)

Torrence hand-builds the **learning-critical** work; Claude handles **structural labor**.

- **Torrence owns. Do not pre-write these; review them when asked:** migration files,
  schema/domain decisions, data-access layer design, Stripe webhook logic.
- **Claude owns:** scaffolding, route/handler boilerplate, frontend component
  structure, test harness setup, seed-file plumbing and content, repetitive
  CRUD, wiring.
- When reviewing Torrence's work, give direct findings with reasoning and flag
  divergences from the ERD or the disciplines below. No completed rewrites unless asked.
- If a request would bulldoze a learning-critical piece, say so and offer to pair instead.

## Working Conventions

- Respond in TypeScript unless asked otherwise.
- Treat Torrence as a Senior Engineer: explain the _why_, surface tradeoffs,
  push back on weak choices rather than agreeing.
- When proposing schema or architecture, favor the production-grade option and
  name what's being deferred.
- Keep changes single-responsibility, with clean separation of concerns.

## Current Sprint: Thin Vertical Slice

Goal: **0 → 1 on catalog → cart → Stripe test-mode checkout.** Depth and polish
on this slice beat breadth everywhere else. Commitments, in order:

1. **Schema lands end-to-end.** Torrence hand-writes migrations in dependency order. Claude builds seed files alongside:
   6–8 realistic single-origin coffees, leaning Costa Rican (Tarrazú, West Valley;
   caturra, catuaí, geisha; honest tasting notes), each with 2–4 priced variants.
   _Done when:_ `supabase db reset` runs migrations and seeds cleanly, and a
   catalog query returns fully-joined products.
2. **Catalog read path ships.** Torrence designs the typed data-access layer;
   Claude scaffolds Express routes, Zod schemas, and React catalog list/detail
   pages against it. _Done when:_ the storefront renders real seeded products
   (origin, process, roast level, tasting notes, selectable variants) from the DB.
   No fixtures.
3. **Cart → Stripe test checkout happy path.** Cart holds variant line items;
   checkout creates a test-mode Checkout Session from variant prices; Torrence's
   webhook records the completed order **idempotently** (Stripe delivers duplicate
   events). Replaces the stub `create-checkout-session`, which calls
   `sessions.create({})` with no line items. _Done when:_ a test-card purchase
   completes end-to-end and the order is persisted exactly once.

**Deferred past this sprint. Do not build:** inventory/stock concurrency,
blends, multi-roaster, subscriptions, merchandise, auth-gated accounts beyond
what checkout needs, admin UI.

## Domain Model (settled; do not redesign)

Finalized through two ERD review rounds. The ERD (Excalidraw) is the source of truth.

- **Single roaster** (no Roaster entity) and **single-origin products** (no blends).
  Both are deliberate MVP constraints.
- **Table names are singular** (`country`, `origin`, `product`, ...): Torrence's call.
- Entities: `country`, `origin`, `product`, `variant`, `process`,
  `roast_level`, `variety`, `tasting_note`.
- `products` has NOT NULL FKs → `origin_id`, `process_id`, `roast_level_id`.
- `variants` are the purchasable forms (size × grind), each belonging to exactly one
  product. This mirrors Stripe's product/price split: **carts and checkout reference
  variants, never products.**
- Junctions: `product_variety`, `product_tasting_note`. Each has a composite PK
  of its two FKs; tasting notes carry `sort_order smallint` because note order on
  the bag is curated.
- Vocabulary tables may have zero references (seeded before products).
  "Product has ≥1 variant / tasting note" is **application-enforced**, not a DB constraint.

**Keys & types:**

- Public entities (product, order): UUID PKs, v7 preferred.
- Curated reference tables (origin, process, roast_level, variety, tasting_note):
  `smallint GENERATED ALWAYS AS IDENTITY`. Origin moved here from UUID: a small,
  curated list never addressed by id in a public URL (Torrence's call; ERD updated).
  Never hardcode identity ids in seeds; look rows up by their natural attributes.
- `country` PK is the natural key `iso_2` (ISO 3166-1 alpha-2) so child FKs are
  readable (`origin.country_id = 'CR'`). Decided by Torrence.
- `timestamptz` always; `text` over `varchar(n)`; identity over serial
  (per PostgreSQL "Don't Do This").

## Engineering Disciplines (non-negotiable)

1. **Migrations are immutable and forward-only.** Never edit a committed migration.
   `20260628162035_create_origin_table.sql` (`origin` with inline `country text`,
   `int4range` altitude, UUID PK) is committed. Country normalization happens via
   forward migrations: create `country` → add nullable `country_id` → backfill →
   enforce NOT NULL → drop `country`.
2. **Migration order follows FK dependencies:** vocabularies → country/origin
   transition → products → variants → junction tables.
3. **Seed data lives in seed files, never in schema migrations.**
4. **ERD first.** Schema changes get drawn and reviewed before they're coded.
5. **Validate at the edge with Zod**, with a typed data-access layer between routes and Supabase.

## Commands

Two independent npm packages (`backend/`, `frontend/`), no root workspace.
Each has its own Dockerfile + `.devcontainer/`; there is no docker-compose.
Neither package has a test runner yet.

**Backend** (`cd backend`, Node 23 per `.nvmrc`):

- `npm run dev`: nodemon watches `src/` and runs `npm start` on change.
- `npm start`: runs `prestart` (`tsc`) first, then `node --env-file=.env src/index.ts`.
  Node executes the `.ts` source directly via type stripping; the trailing
  `ts-node ... dist/index.js` half of the script is effectively dead.
- `npm run build`: `tsc` with `emitDeclarationOnly`, so it is a **typecheck**,
  not a JS build. A type error blocks `dev`/`start` from booting.
- Port: `PORT` env or 3000 (the Dockerfile exposes 8080, so set `PORT=8080` in Docker).

**Frontend** (`cd frontend`): `npm run dev` (Vite, :5173), `npm run build`
(`tsc -b && vite build`), `npm run lint` (ESLint flat config).

**Database** (`cd backend`; Supabase CLI is a devDependency, so use `npx supabase`; Postgres 17):

- Local stack: `npx supabase start`. Full rebuild (migrations + seeds): `npx supabase db reset`.
- Seed files: `backend/supabase/seeds/NN_<table>.sql`, loaded in lexical order via
  the `./seeds/*.sql` glob, so number them in FK-dependency order.
- Migrations are **hand-written** (no declarative schemas / `db diff`; a deliberate
  learning choice) and live in `backend/supabase/migrations/`. Seed files are configured
  via `[db.seed] sql_paths` in `backend/supabase/config.toml`.

## Environment Variables

Backend `.env` (loaded via `node --env-file`, not dotenv): `SUPABASE_URL`,
`SUPABASE_KEY`, `SUPABASE_JWKS_URI`, `SUPABASE_JWT_KID`, `STRIPE_SECRET_KEY`
(test-mode key only), `PORT`. Frontend: `VITE_API_URL` (backend base URL).

## Backend Architecture

- **ESM + `#` subpath imports.** Aliases (`#routes`, `#database`, `#utility`,
  `#auth`, `#middleware/*`, `#plugins/*`, `#data-access/*`) are defined in
  `package.json` `"imports"`, which is what Node resolves at runtime. tsconfig
  `paths` only adds `#/*` (used for `#/types/...`). New aliases go in
  `package.json`. Relative imports must include the `.ts` extension.
- **Layering:** `routes/index.ts` (single router, all endpoints) → domain modules
  (`auth/`; `data-access/` is aliased but not yet created. It's Torrence's to design.)
  → `database/index.ts` (singleton Supabase client). `plugins/` wraps third-party
  clients (JWKS, Stripe). Route handlers extracted to their own file currently
  live in `middleware/`.
- **Errors:** throw `AppError(message, statusCode)` from `#utility` and pass it to
  `next(err)`; `middleware/error-handler.ts` serializes `{ statusCode, status, message }`
  (`status` is `"fail"` for 4xx, `"error"` otherwise).
- **`req.user`** is typed via global augmentation in `src/types/Express.ts` and set
  by `authenticateToken` to the verified JWT payload.

## Auth Flow (spans backend + frontend)

1. `POST /auth/login` proxies to Supabase `signInWithPassword`. The access token
   is returned in the JSON body; the refresh token is set as an httpOnly,
   `sameSite=strict` cookie scoped to `path=/auth/refresh`.
2. The frontend keeps the access token in memory only (`AuthContext` state) and
   sends it as the raw `Authorization` header value: **no `Bearer ` prefix**.
   `authenticateToken` verifies it as-is.
3. `authenticateToken` verifies against Supabase's JWKS using a fixed key id
   from `SUPABASE_JWT_KID` (not the token header's `kid`).
4. `POST /auth/refresh` reads the cookie and calls Supabase `refreshSession`.
   It does not yet write the rotated refresh token back to the cookie.

## Frontend Architecture

Vite + React 19, React Router v7 (library mode, routes declared in `src/main.tsx`),
Tailwind v4 via `@tailwindcss/vite`. Backend calls live in `src/api/` (plain
`fetch` against `VITE_API_URL`); auth state via `useAuth()` from
`src/contexts/AuthContext.tsx`.

## Key Documents

- `docs/field-notes.md`: Torrence's session notes.
- `ROADMAP.md`: phased plan and progress tracking (to be created).
- `ARCHITECTURE.md` or `docs/adr/`: architecture decision records (to be created).
- `README.md`: human-facing project documentation (to be created).
