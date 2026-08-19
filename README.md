# Perez Live Cam

Marketing site + license admin panel for **Perez Live Cam** — a Windows app that
plays any video file as a real virtual webcam (WhatsApp, Zoom, Meet, Teams, OBS…).

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** and
**shadcn/ui (Base UI)**. Package manager: **pnpm**.

## Routes

| Route                  | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `/`                    | Public marketing landing page                            |
| `/admin`               | License management panel (password protected)            |
| `/api/admin/*`         | Server-only proxy to the remote license server           |
| `/sitemap.xml`         | Generated sitemap                                        |
| `/robots.txt`          | Generated robots (blocks `/admin` and `/api/admin`)      |

The admin panel proxies to a **separate license server** (e.g. hosted on Render).
Secrets never leave the server: the `X-Admin-Key` is only sent from the Next.js
server runtime to the license server.

## Local development

```bash
corepack enable        # once, to get pnpm
pnpm install
pnpm dev
```

## Environment variables

Server-side only. Copy `.env.example` to `.env.local` and fill in:

| Variable                    | Required | Purpose                                                        |
| --------------------------- | -------- | -------------------------------------------------------------- |
| `PLC_ADMIN_PASSWORD`        | Yes*     | Single password for the `/admin` login page                    |
| `PLC_ADMIN_SESSION_SECRET`  | No       | HMAC secret for admin session tokens (falls back to `PLC_ADMIN_KEY`) |
| `PLC_LICENSE_API_URL`       | Yes*     | Base URL of the deployed license server (e.g. `https://…onrender.com`) |
| `PLC_ADMIN_KEY`             | Yes*     | Admin API key — must match the key on the license server        |

\* Required only for the `/admin` features. The public site builds and runs without them.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new) (framework preset: Next.js).
3. Add the environment variables above in **Project → Settings → Environment Variables**.
4. Deploy. Vercel picks up `next build` automatically via the `packageManager`
   field and `pnpm-lock.yaml`.

> Note: the domain referenced by `app/robots.ts` and `app/sitemap.ts` is
> `https://perez-live-cam.vercel.app` — update `SITE_URL` in `app/sitemap.ts`
> and the sitemap URL in `app/robots.ts` if you use a custom domain.
