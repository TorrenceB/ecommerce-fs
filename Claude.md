# Fullstack E-commerce Project

E-commerce platform by Torrence B — a coffee roaster storefront offering
single-origin and blended coffees plus coffee-oriented merchandise.
Supports both one-time purchases and subscription-based pricing.

## Purpose & Audience

This is a portfolio project intended to demonstrate Senior Fullstack
Engineer ability — specifically depth in backend and system design, not
breadth of features. The guiding principle is **intentional, documented,
and defensible over large**. A smaller surface area with well-reasoned
architecture and clear documentation is the goal, not a sprawling feature set.

## Objectives

1. Demonstrate the ability to build a complete product end-to-end with
   production-grade practices.
2. Grow from Frontend-leaning to true Fullstack by focusing on backend
   concepts: system design, API development, data modeling, database
   administration, networking, and payments.

## Priority Order

Domain → data model → API → frontend. Data modeling and API design are the
primary focus. The frontend follows once the backend is solid; do not let
frontend work pull focus prematurely.

## Tech Stack

- **Frontend:** React, TypeScript, Docker
- **Backend:** Express.js, TypeScript, Docker
- **Database:** PostgreSQL via Supabase
- **Payments:** Stripe (client configured; integration pending)
- **Auth:** Supabase auth + custom JWT verification/refresh middleware

## Current Functionality (as of 6.22.26)

1. Login flow via Supabase auth
2. JWT verification middleware on protected routes
3. Access-token refresh + refresh-token rotation endpoint
4. Custom error-handling middleware
5. Request logging middleware (currently to local files)
6. Frontend shell (scaffolded; storefront not yet built)

## Working Conventions

- Respond in TypeScript unless asked otherwise.
- Treat me as a Senior Engineer: explain _why_ behind design decisions,
  surface tradeoffs, and push back on weak choices rather than agreeing.
- When proposing schema or architecture, favor the production-grade option
  and name what we're deferring.
- Keep changes single-responsibility; I value clean separation of concerns.

## Key Documents

- `ROADMAP.md` — phased plan and progress tracking (to be created)
- `ARCHITECTURE.md` or `/docs/adr/` — architecture decision records (to be created)
- `README.md` — human-facing project documentation
