# UGTA Foundation Website

Website for **Ugamdevi Tarachand Foundation (UGTA)** — education, sustainability and healthcare programmes.

## Structure

```
UGTAFoundation/
  client/   # Vite + React + Tailwind (UI inspired by Smile Foundation layout patterns)
  server/   # Express API (contact form + static hosting)
```

## Quick start

### Database

MySQL database: `ugta_foundation`  
Default local credentials: `root` / `muruku` (override via `DB_*` in `server/.env`). Production config uses `RefexAdmin@` — see `server/config/config.json`.

### Server

```bash
cd server
cp .env.example .env
npm install
npm run seed:all
npm run dev
```

Runs at http://localhost:3000.

Default CMS login after seed:
- Email: `admin@ugtafoundation.org`
- Password: `UgtaAdmin!2026x`

### Client

```bash
cd client
npm install
npm run dev
```

Runs at http://localhost:5173 (proxies `/api` to the server).

CMS: http://localhost:5173/admin/login

Without SMTP credentials, contact submissions are validated and logged (not emailed).

## Build & serve

```bash
cd client && npm run build
cd ../server && npm start
```

## Pages

- Home, About UGTA, Our Programmes, Our Impact
- Reports, Gallery, Contact Us, Donate Now
- Privacy Policy, Terms & Conditions
