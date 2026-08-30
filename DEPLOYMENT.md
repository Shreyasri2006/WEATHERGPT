# WeatherGPT Frontend Deployment

## Local development

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The local default backend is `http://127.0.0.1:8000`.

## GitHub Pages

This project is a Vite application. GitHub Pages must publish the **built `dist/` output**, not the raw repository source.

1. Push this complete folder to the repository.
2. Deploy the FastAPI backend to a public HTTPS URL.
3. In GitHub open **Settings → Secrets and variables → Actions → Variables**.
4. Add repository variable `VITE_API_BASE_URL` with the public backend URL.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, choose **Source: GitHub Actions**.
7. Open **Actions → Deploy frontend to GitHub Pages** and run/re-run the workflow if needed.

### Why a blank white page happened earlier

The repository contains React/JSX source. If Pages is configured to **Deploy from a branch**, GitHub can publish the raw `index.html` rather than the Vite build. The raw file points to development source and can produce a white page. The included Pages workflow runs `vite build` and publishes `dist/` instead.

## If an old white page is cached

After switching Pages to GitHub Actions and deploying successfully:

- Press `Ctrl + Shift + R` in Chrome/Edge.
- If needed: DevTools → Application → Storage → Clear site data.
- The included `sw.js` also removes the old prototype service-worker cache.

## Other hosting

Vercel/Netlify/Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_BASE_URL=https://YOUR-BACKEND`
