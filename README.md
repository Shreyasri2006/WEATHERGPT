# WeatherGPT Frontend — SIH26068

> **GitHub Pages:** use **Settings → Pages → Source: GitHub Actions**. Do not deploy the raw `main` branch. See `README_FIRST.txt` and `DEPLOYMENT.md`.


React/Vite PWA-style frontend for the **WeatherGPT Safety-First Weather Decision Copilot**.

## Included screens/features

- Weather overview dashboard
- 7-day forecast
- WeatherGPT conversational decision copilot
- Persona selector: Citizen, Farmer, Fisherman, Traveller, Disaster Officer, Researcher, Aviation
- English / Hindi / Kannada prototype modes
- Browser voice input + text-to-speech
- Official-vs-derived alert labeling
- GFS/ECMWF model-agreement UI
- Explainable risk factors
- Leaflet/OpenStreetMap risk map
- Historical climate anomaly card
- Disaster Replay Mode
- Route Weather MVP
- Responsive mobile layout
- Basic service worker / installable PWA manifest
- Docker + GitHub Actions

## Quick start

```bash
npm install
copy .env.example .env   # Windows PowerShell/CMD
# cp .env.example .env   # macOS/Linux
npm run dev
```

Open `http://localhost:5173`.

The backend should run on `http://localhost:8000` by default.

## Environment

```env
VITE_API_BASE_URL=http://localhost:8000
```

For a deployed backend, set this to the public HTTPS URL before building.

## GitHub Pages

A Pages workflow is included. Add a repository variable:

`VITE_API_BASE_URL = https://YOUR-BACKEND.example.com`

Then enable **Settings → Pages → Source: GitHub Actions**.

The Vite config uses `base: './'` so the build works from a project subpath.

## Voice notes

The browser Web Speech APIs are feature-detected. Speech recognition works best in supported Chromium-based browsers. If unavailable, text input remains fully functional.

## Safety / data transparency

The UI never labels locally derived hazard rules as official. Official alerts only appear when the backend's official-warning adapter returns `official=true`.

## Build

```bash
npm run build
npm run preview
```

## Docker

```bash
docker build --build-arg VITE_API_BASE_URL=https://YOUR-BACKEND -t weathergpt-frontend .
docker run --rm -p 8080:80 weathergpt-frontend
```

## Next SIH upgrades

- District/polygon warning geometry from IMD GIS feeds
- Verified historical disaster replay data
- Better offline/low-bandwidth data packets
- Route provider integration for real roads instead of straight-line sampling
- More Indian languages via a production translation/speech stack
- Vulnerability/exposure overlays for impact-based risk

## License
MIT

## Frontend toolchain compatibility

This repository pins Vite `^8.2.2` with `@vitejs/plugin-react` `^6.1.1`. Use Node.js `20.19+` or `22.12+`.
