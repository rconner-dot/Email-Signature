# Reid's Live Signature

A Vercel Edge Function that renders your email signature as a live image.

## What's included

```
reid-signature/
├── api/
│   └── signature.tsx          ← The function that makes the image
├── package.json               ← Dependencies
└── README.md                  ← This file
```

## Deploy to Vercel (2 minutes)

1. **Create a GitHub account** if you don't have one (https://github.com).

2. **Create a new repo** at https://github.com/new
   - Name: `reid-signature`
   - Public (so Vercel can access it)
   - Click **Create repository**

3. **Upload these files to GitHub**. On your computer, open Terminal and run:
   ```bash
   cd /path/to/reid-signature
   git init
   git add .
   git commit -m "initial"
   git remote add origin https://github.com/YOUR_USERNAME/reid-signature.git
   git branch -M main
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your actual GitHub username.)

4. **Deploy to Vercel**
   - Go to https://vercel.com and sign up (use GitHub login)
   - Click **Add New → Project**
   - Find your `reid-signature` repo and click **Import**
   - Click **Deploy**
   - Wait 2 minutes. When it says "Deployment successful," copy the URL shown.

5. **Test it** — paste that URL into a browser. You should see the signature image.

## Use in Gmail

1. **Gmail Settings** → **General** → scroll to **Signature**
2. Click the **image icon** in the editor toolbar
3. Click the **Web Address (URL)** tab
4. Paste your Vercel deployment URL (e.g., `https://reid-signature-xyz.vercel.app/api/signature`)
5. Click **Insert**
6. Click **Save Changes** at the bottom

Done. Your signature shows your name, title, and school, the FRC 4020 and
Tribe Bytes badges, and a status/quote line that rotates automatically every
hour. Since it's a live image (not a static picture), every recipient loads
the current version.

**Gmail caching note:** Gmail proxies signature images through its own
servers and can hold onto a cached copy for a while instead of re-fetching
every hour on the dot. You'll still see it refresh over time, just not
necessarily on a strict hourly clock.

## Tweaking the status lines

Edit `api/signature.tsx` and change the `STATUSES` array to add/remove messages:

```javascript
const STATUSES = [
  'your status here',
  'another status',
  'etc',
];
```

Push to GitHub and Vercel auto-redeploys (~1 minute).
