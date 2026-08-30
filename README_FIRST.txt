WEATHERGPT SIH26068 - FRONTEND - READ THIS FIRST
================================================

This folder is already arranged as a complete GitHub-ready React/Vite frontend.
Do NOT move src files to the repository root.
Do NOT upload node_modules or .env.

LOCAL RUN
---------
1. Open PowerShell in this folder.
2. Run: npm install
3. Run: Copy-Item .env.example .env
4. Make sure the FastAPI backend is running at http://127.0.0.1:8000
5. Run: npm run dev
6. Open: http://localhost:5173

UPLOAD / REPLACE THE GITHUB REPOSITORY
--------------------------------------
Recommended: from this folder run:

  git init
  git branch -M main
  git remote remove origin   (only if an old/wrong origin already exists)
  git remote add origin https://github.com/Shreyasri2006/WEATHERGPT--as-a-Safety-First-Weather-Decision-Copilot.git
  git add .
  git commit -m "Clean WeatherGPT frontend"
  git push -u origin main --force

IMPORTANT FOR GITHUB PAGES WHITE-SCREEN FIX
--------------------------------------------
Repository -> Settings -> Pages -> Build and deployment -> Source
MUST be: GitHub Actions

Do NOT use "Deploy from a branch" for this Vite source repository.
The included .github/workflows/pages.yml builds the Vite app and deploys dist/ correctly.

PUBLIC BACKEND
--------------
Localhost works only on your own PC.
For the public GitHub Pages site, first deploy the FastAPI backend to an HTTPS host.
Then in GitHub:
Settings -> Secrets and variables -> Actions -> Variables -> New repository variable
Name: VITE_API_BASE_URL
Value: https://YOUR-PUBLIC-BACKEND-URL

Push/Run the Pages workflow again after setting the variable.

FIXES INCLUDED IN THIS CLEAN PACKAGE
------------------------------------
- Correct src/ and public/ structure
- Vite 8 / React plugin compatibility
- One-click city Find search
- Common Bengaluru spelling aliases
- Visible search error messages
- Drizzle weather icon correction
- CI lint cleanup
- Old service-worker/cache cleanup
- GitHub Pages workflow
- Local/public backend URL handling
- Docker/Nginx deployment files
