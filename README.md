# Athira & Anoop — Editable Wedding Website + Google Sheets RSVP

## Files

- `index.html` — the complete editable website.
- `assets/` — replace the placeholder JPGs with your couple/wedding photographs.
- `google-apps-script.gs` — receives RSVP submissions and writes them to Google Sheets.

## Connect RSVP to Google Sheets

1. Create a new Google Sheet.
2. Open Extensions → Apps Script.
3. Paste the contents of `google-apps-script.gs`.
4. Save.
5. Deploy → New deployment.
6. Select Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Deploy and copy the Web App URL.
10. Open `index.html` and replace:
    PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE
    with the Web App URL.
11. Host the website using GitHub Pages, Netlify, Vercel, or another static host.

The first RSVP submission automatically creates the `RSVP Responses` sheet/tab and adds the response columns.

## Editing

Open `index.html` in any code editor. Search for:

- `Athira & Anoop`
- `06 December 2026`
- `12 December 2026`
- `4:00 PM onwards`
- `Wedding time: to be updated`

Replace the images in `assets/` while keeping the filenames, or change the image paths in HTML.

## Important

The Google Sheet should be kept private. Only the deployed web app endpoint needs to be public.

## Current reception details

- Venue: Belhaven Beach
- Date: 12 December 2026
- Time: 4:00 PM – 9:00 PM
- Venue link: https://share.google/GZ6sXJnVGjbWeedsv

## Design

The latest version uses a premium editorial wedding style: Cormorant Garamond + Great Vibes typography, plum/rose/gold palette, glass navigation, rounded cards, gallery hover effects, decorative rings, and responsive mobile layout.

https://script.google.com/macros/s/AKfycbyGRoNqD4kx-JvdxHHJUIPPC0GfSWshS7m6Zl8fq4_bc00xEHCBZXVBM887Em4SDLQ/exec

AKfycbyGRoNqD4kx-JvdxHHJUIPPC0GfSWshS7m6Zl8fq4_bc00xEHCBZXVBM887Em4SDLQ
