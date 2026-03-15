# Property Finder — Competitive Intelligence Dashboard

A live competitive analysis dashboard for Property Finder's Growth Marketing Team, tracking PF vs Bayut ad activity across Meta, Google, TikTok, LinkedIn, and Twitter/X.

---

## 🚀 Deploy to GitHub Pages (5 minutes)

### Step 1 — Create your GitHub repo

1. Go to [github.com](https://github.com) and sign in
2. Click **New repository**
3. Name it: `pf-competitive-dashboard` (or anything you like)
4. Set to **Private** (recommended) or Public
5. Click **Create repository**

### Step 2 — Upload the files

**Option A — via GitHub.com (no terminal needed):**
1. Unzip the downloaded folder
2. In your new repo, click **Add file → Upload files**
3. Drag all files and folders into the upload area
4. Click **Commit changes**

**Option B — via Terminal:**
```bash
cd pf-competitive-dashboard
git init
git add .
git commit -m "Initial dashboard"
git remote add origin https://github.com/YOUR_USERNAME/pf-competitive-dashboard.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. GitHub will automatically use the workflow in `.github/workflows/deploy.yml`
4. Wait ~2 minutes for the first build to complete
5. Your dashboard will be live at: `https://YOUR_USERNAME.github.io/pf-competitive-dashboard/`

---

## 🔑 Connecting Live Data

Once the dashboard is open, click **⚙️ Settings** in the top-right corner.

### Meta Ad Library API Token (for live FB/IG data)

1. Go to [facebook.com/ads/library/api](https://www.facebook.com/ads/library/api/)
2. Click **Get Started** and complete registration
3. Generate a User Access Token
4. Paste it into the **Meta Token** field in Settings
5. The dashboard will switch from **DEMO** to **LIVE** automatically

> **Note:** The Meta Ad Library API is the only platform with a fully public API. Google, TikTok, LinkedIn, and Twitter/X currently have no public programmatic access — those channels use structured demo data, with direct links to their respective ad libraries.

### Anthropic API Key (for AI-generated summaries)

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an API key under **API Keys**
3. Paste it into the **Anthropic API Key** field in Settings

> Both keys are stored only in your browser's local storage — never in the code or the repo.

---

## 📋 Features

| Feature | Status |
|---|---|
| PF vs Bayut side-by-side comparison | ✅ |
| Meta, Google, TikTok, LinkedIn, X/Twitter channels | ✅ |
| Facebook & Instagram sub-platform filter | ✅ |
| Live Meta Ad Library integration | ✅ (requires token) |
| AI-generated strategic summaries per format | ✅ (requires Anthropic key) |
| Click ad → view on source platform | ✅ |
| Weekly report generator | ✅ (requires Anthropic key) |
| Real company logos | ✅ |
| Live GST clock in footer | ✅ |
| Print to PDF | ✅ |

---

## 🔄 Keeping It Updated

Every time you push changes to the `main` branch, GitHub Actions automatically rebuilds and redeploys the dashboard. No manual steps needed.

To refresh the demo ad data or add new ads, edit `src/App.jsx` → the `DEMO_ADS` object.

---

## 👩‍💼 For Ridhika — Quick Start

1. Open the dashboard link shared with you
2. Click ⚙️ Settings → enter the Meta token and Anthropic key
3. Click the channel tabs (Meta, Google, etc.) to browse ads
4. Click **FB** or **IG** sub-tabs under Meta to filter by platform
5. AI summaries generate automatically as you browse
6. Click **📋 Weekly Report** for the management briefing
7. Click any **View ↗** button on an ad to open it on the source platform

---

*Property Finder · Growth Marketing Team · Built with React + Vite*
