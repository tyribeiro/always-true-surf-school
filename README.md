# Always True Surf School

Website for Always True Surf School — private and group surf lessons in Waikīkī, Oʻahu.
Book now, pay later.

It's a plain static site (HTML, CSS, JavaScript): no build step and nothing to install.

## Files

| File | What it is |
|---|---|
| `index.html` | The main website |
| `review.html` | The "Leave a review" page (`yoursite.com/review`) |
| `reviews-config.js` | Links to the Google Form and Sheet that store reviews |
| `reviews.js` | Loads approved reviews and sends new ones |
| `images/` | Photos |
| `vercel.json` | Vercel settings (clean URLs, image caching) |

## Deploy on Vercel (free)

1. Go to https://vercel.com and sign up with your GitHub account.
2. Click **Add New → Project**, find this repository and click **Import**.
3. Leave every setting as it is (Framework Preset: **Other**, no build command) and click **Deploy**.

Every time you change a file on GitHub, Vercel updates the live site automatically.

To use your own domain (e.g. `alwaystruesurf.com`): in Vercel open the project → **Settings → Domains** and follow the steps.

## Things you can edit

- **Calendly links:** in `index.html`, search for `CALENDLY_USER` and `LESSONS`.
- **Cash App:** in `index.html`, search for `CASHTAG` and replace `$YourCashtag` with your Cashtag. The Pay with Cash App button appears once it's set.
- **Reviews:** approve a review by typing `yes` in the **Approved** column of the "Always True — Reviews" Google Sheet.
