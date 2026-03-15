# Aria Voss — Musician Website

Full-stack musician website built with Next.js, Node.js/Express, MongoDB, Cloudinary, and Spotify embeds.

---

## Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | Next.js 14 (Pages Router), TypeScript |
| Styling   | CSS Custom Properties, Flexbox/Grid |
| Animation | Framer Motion                       |
| Backend   | Node.js + Express (standalone)      |
| Database  | MongoDB via Mongoose                |
| Media     | Cloudinary (images + video)         |
| Music     | Spotify iframe embeds               |
| Hosting   | Vercel (frontend) + Railway/Render (backend) |

---

## Project Structure

```
musician-website/
├── pages/
│   ├── _app.tsx              # App wrapper
│   ├── index.tsx             # Homepage (Hero, featured releases, events teaser)
│   ├── biography.tsx         # Full biography with sidebar portrait
│   ├── music.tsx             # Discography with Spotify embeds + filter tabs
│   ├── collaborations.tsx    # Artist collaborations with Spotify embeds
│   ├── performances.tsx      # Past performances timeline
│   ├── events.tsx            # Upcoming events (server-side rendered from MongoDB)
│   ├── gallery.tsx           # Photo gallery with lightbox
│   └── api/
│       ├── events.ts         # CRUD for events (MongoDB)
│       ├── collaborations.ts # CRUD for collaborations (MongoDB)
│       └── upload.ts         # Cloudinary upload endpoint
├── components/
│   ├── Layout.tsx            # Head tags, Navbar, Footer wrapper
│   ├── Navbar.tsx            # Sticky nav with mobile hamburger menu
│   ├── Footer.tsx            # Links, socials, copyright
│   ├── Hero.tsx              # Full-screen homepage hero
│   ├── SpotifyEmbed.tsx      # Spotify iframe with loading skeleton
│   ├── EventCard.tsx         # Single event card with date block
│   └── GalleryLightbox.tsx   # Grid + yet-another-react-lightbox
├── lib/
│   ├── mongodb.ts            # Mongoose connection with global cache
│   └── cloudinary.ts        # Cloudinary SDK + upload helper
├── types/
│   └── index.ts              # Shared TypeScript interfaces
├── styles/
│   └── globals.css           # Design tokens, reset, utilities
├── next.config.js
├── tsconfig.json
├── vercel.json
└── backend/                  # Standalone Express server
    ├── server.js             # App bootstrap, middleware, DB connection
    ├── models/
    │   ├── Event.js
    │   └── Collaboration.js
    ├── routes/
    │   ├── events.js         # Full CRUD with validation + Cloudinary upload
    │   └── collaborations.js
    └── lib/
        └── cloudinary.js
```

---

## Getting Started

### 1. Frontend (Next.js)

```bash
cd musician-website
cp .env.local.example .env.local
# Fill in values (see below)
npm install
npm run dev        # http://localhost:3000
```

### 2. Backend (Express)

```bash
cd musician-website/backend
cp .env.example .env
# Fill in values
npm install
npm run dev        # http://localhost:4000
```

---

## Environment Variables

### Frontend `.env.local`

| Variable                          | Description                          |
|-----------------------------------|--------------------------------------|
| `MONGODB_URI`                     | MongoDB Atlas connection string      |
| `CLOUDINARY_CLOUD_NAME`           | Cloudinary cloud name                |
| `CLOUDINARY_API_KEY`              | Cloudinary API key                   |
| `CLOUDINARY_API_SECRET`           | Cloudinary API secret                |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Public cloud name for client-side  |
| `BACKEND_URL`                     | Express server URL (production)      |

### Backend `.env`

| Variable               | Description                              |
|------------------------|------------------------------------------|
| `PORT`                 | Express port (default 4000)              |
| `MONGODB_URI`          | MongoDB Atlas connection string          |
| `CLOUDINARY_*`         | Same Cloudinary credentials              |
| `ALLOWED_ORIGINS`      | Comma-separated CORS origins             |

---

## Deploying to Vercel

1. Push repository to GitHub
2. Import in Vercel dashboard
3. Set all environment variables from `.env.local.example` as Vercel Environment Variables
4. Vercel will auto-detect Next.js and deploy

Deploy backend to **Railway** or **Render**, then update `BACKEND_URL` in Vercel.

---

## Cloudinary Setup

1. Create free account at [cloudinary.com](https://cloudinary.com)
2. Copy Cloud Name, API Key, API Secret from the dashboard
3. Upload press photos into folders:
   - `aria-voss/gallery/` — gallery images
   - `aria-voss/covers/` — album/single cover art
   - `aria-voss/performances/` — performance press photos
   - `aria-voss/events/` — event images (uploaded via API)

The `buildCloudinaryUrl()` helper in `lib/cloudinary.ts` auto-applies format/quality transformations.

---

## Replacing Placeholder Content

| File                  | What to update                              |
|-----------------------|---------------------------------------------|
| `components/Hero.tsx` | Background image URL, tagline, genre tags   |
| `pages/biography.tsx` | Bio sections, portrait URL, fact sheet      |
| `pages/music.tsx`     | Real Spotify track/album IDs, cover art URLs |
| `pages/collaborations.tsx` | Real collaborator data                 |
| `pages/performances.tsx`   | Real performance history               |
| `pages/gallery.tsx`   | Real Cloudinary image public IDs            |
| `components/Footer.tsx` | Social media links, contact email         |
| `components/Layout.tsx` | Site title, description, OG image, domain |

---

## Spotify Embed IDs

To find a track or album ID, open Spotify → right-click a track/album → Share → Copy Link.
The ID is the string after the last `/` and before `?`.

Example: `https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUIOKE` → ID is `3n3Ppam7vgaVa1iaRUIOKE`

Then use:
```tsx
<SpotifyEmbed spotifyId="3n3Ppam7vgaVa1iaRUIOKE" type="track" title="Song Title" />
```

---

## API Reference

### Events (Next.js API routes)

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/events`       | List events          |
| POST   | `/api/events`       | Create event         |

### Events (Express backend)

| Method | Endpoint                  | Description          |
|--------|---------------------------|----------------------|
| GET    | `/api/events`             | List + paginate      |
| GET    | `/api/events/:id`         | Get single event     |
| POST   | `/api/events`             | Create (with image)  |
| PATCH  | `/api/events/:id`         | Update event         |
| DELETE | `/api/events/:id`         | Delete event         |

Same pattern for `/api/collaborations`.
