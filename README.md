# ⚠️ Disclaimer
I have extensively used AI while building this project. My AI chat transcripts can be found at the links below. I also extensively used Copilot in my development environment VSCode I was unable to find the chat history for this as they were session based
- https://gemini.google.com/share/4f94388f5f32
---
# Website Images

<img width="2553" height="1397" alt="Screenshot 2025-12-03 005421" src="https://github.com/user-attachments/assets/11ad783f-1a30-4e10-bd90-fb58aa5e4115" />
<img width="2544" height="1398" alt="Screenshot 2025-12-03 005455" src="https://github.com/user-attachments/assets/f4faa33a-d4ee-4bc0-a0cb-37e58deccb80" />

-----
# Pokedex Assessment

Full-stack Pokédex web application built with **Next.js 14** on the frontend and **Laravel 11** on the backend. The app showcases Pokémon data with a hero carousel, sticky promotional banners, infinite scrolling, and search functionality powered by a custom Laravel API.

---

## Table of Contents
1. [Features](#features)
2. [Architecture Overview](#architecture-overview)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Frontend](#frontend)
6. [Backend](#backend)
7. [API Reference](#api-reference)
8. [Development Workflow](#development-workflow)
9. [Troubleshooting](#troubleshooting)
10. [Roadmap](#roadmap)
11. [License](#license)

---

## Features
- Auto-rotating hero carousel with promotional content
- Sticky left/right banners that remain visible while scrolling
- Paginated Pokémon list with “Load More” infinite scroll
- Search bar filtering by Pokémon name
- Responsive layout built with Tailwind CSS
- Laravel API serving paginated Pokémon data
- Dockerized backend via Laravel Sail

---

## Architecture Overview
```
Browser (Next.js frontend)
        ↓ fetch
Laravel API (backend)
        ↓
MySQL (via Sail)
```

- `frontend/` – Next.js app using the App Router
- `backend/` – Laravel API project (Sail-ready)
- `.env` files configure environment-specific settings

---

## Tech Stack

| Layer       | Technology                                    |
|-------------|------------------------------------------------|
| Frontend    | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend     | Laravel 11, PHP 8.2, Eloquent ORM              |
| Database    | MySQL (Laravel Sail)                           |
| Tooling     | Turbopack, Composer, npm, Docker               |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- PHP 8.2+
- Composer
- Docker (for Sail)

### Clone
```bash
git clone https://github.com/<your-username>/pokedex-assessment.git
cd pokedex-assessment
```

---

## Frontend

### Setup
```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost" > .env.local
npm run dev
```
Visit `http://localhost:3000`.

### Key Files
- `app/layout.tsx` – Root layout, fonts, metadata
- `app/page.tsx` – Main Pokédex UI (client component)
- `app/globals.css` – Tailwind + global styles

---

## Backend

### Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
```
API available at `http://localhost/api/pokemons`.

### Key Files
- `routes/api.php` – Pokémon endpoints
- `app/Http/Controllers/PokemonController.php`
- `bootstrap/app.php` – Registers API routes

---

## API Reference

### `GET /api/pokemons`
Fetch paginated Pokémon.

| Query Param | Type | Default | Description              |
|-------------|------|---------|--------------------------|
| `page`      | int  | 1       | Page number              |
| `limit`     | int  | 20      | Items per page           |
| `search`    | str  | —       | Optional name filter     |

**200 Response**
```json
{
  "data": [{ "name": "Bulbasaur", "sprite": "...", "types": ["Grass","Poison"] }],
  "current_page": 1,
  "last_page": 50,
  "per_page": 20,
  "total": 1000
}
```

---

## Development Workflow

1. Start backend: `./vendor/bin/sail up`
2. Start frontend: `npm run dev`
3. Commit changes: `git add . && git commit -m "<message>"`

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| `Failed to fetch` | Backend not running / wrong URL | Ensure Sail is up, check `NEXT_PUBLIC_API_URL` |
| `Unexpected token '<'` | API returned HTML (404) | Verify routes registered in `bootstrap/app.php` |
| Hydration warnings | Browser extensions or non-deterministic render | Disable extensions, keep rendering deterministic |

---

## Roadmap
- Pokémon detail modal with stats
- Favorites/team builder
- Advanced filters (type, generation)
- Auth via Laravel Sanctum
- Automated tests (Jest + PHPUnit)
- CI/CD pipeline

---

## License
MIT License. See `LICENSE` (if provided) or add your preferred license.

---
