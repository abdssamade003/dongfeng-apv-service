# DONGFENG Service Web App

Responsive React + Vite web application converted from the original mobile prototype.

## What changed

- Responsive desktop, tablet and mobile layout.
- Desktop navigation sidebar with the 5-step parts journey.
- Mobile flow preserved.
- Responsive home, vehicle identification, parts catalogue, product stock and contact screens.
- Desktop modal behavior for rating/contact/scanner sheets.
- VIN scanning with PaddleOCR PP-OCRv6, single-orientation processing, and targeted extraction from the chassis-number row.
  OCR models and dictionary are fetched lazily from pinned public Hugging Face files; uploaded images are processed locally in the browser.
- Web app metadata and manifest.
- Docker + Nginx production deployment files.
- `/health` endpoint in the Nginx container.

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Live parts and stock data

The compatible-parts catalogue and agency stock are loaded from the two read-only
CSV exports in the linked Google spreadsheet. The spreadsheet must remain
readable by anyone with the link so the browser can refresh it without credentials.
The app refreshes both tabs on startup and every five minutes.

- Applicability: sheet tab `gid=1018299225` (`REF`, replacement references, and `APP1`–`APP6`).
- Stock: sheet tab `gid=1324738184` (`ITEM`, `CURRENT_STOCK_TOTAL`, `UOM_CODE`, and `LOCN_CODE`).
- A part is shown only when its applicability row matches the selected vehicle.
- Stock above 1 is available; stock at or below 1 directs the user to contact the
  parts clerk. Quantities retain their sheet unit (`PCS`, `LTR`, or `KLG`).
- The app maps `SPDF`, `SPDFAG`, `SPDFAS`, `SPDFMK`, `SPDFTG`, and `CWSPDF` to
  Casa VUL, Agadir, Casa VP, Marrakech, Tanger, and Magasin Central. Other stock
  location codes are excluded.
- The fitment sheet has no parts-category column, so existing category filters
  are estimated from part names; use the search box for exact reference or name.
- The current fitment sheet has no entries for GX or KC; those models show a
  notice until applicability references are added to `APP1`–`APP6`.

## Production build

```bash
npm install
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Docker / Coolify

The repository includes a production `Dockerfile` and `nginx.conf`.

Build and run locally:

```bash
docker build -t dongfeng-service-webapp .
docker run --rm -p 8080:80 dongfeng-service-webapp
```

Then open `http://localhost:8080`.

For Coolify, deploy the repository using the included Dockerfile and expose port `80`. The health check is available at `/health`.

## Notes

The prototype uses local mock data. Vehicle/product photos currently use external image URLs defined in `src/data/mockData.ts`. Replace them with production assets or API data before going live.
