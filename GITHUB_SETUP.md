# GitHub setup

Repository:
`Shreyasri2006/WEATHERGPT--as-a-Safety-First-Weather-Decision-Copilot`

From PowerShell in this folder:

```powershell
git init
git branch -M main
git remote -v
```

If `origin` is wrong:

```powershell
git remote set-url origin https://github.com/Shreyasri2006/WEATHERGPT--as-a-Safety-First-Weather-Decision-Copilot.git
```

Then:

```powershell
git add .
git commit -m "Clean WeatherGPT frontend"
git push -u origin main --force
```

For GitHub Pages, set **Settings → Pages → Source: GitHub Actions** and configure the `VITE_API_BASE_URL` Actions variable after the backend is publicly deployed.
