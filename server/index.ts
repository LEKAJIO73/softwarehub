import { createApp } from "./app";

const app = createApp();

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  // In prod (e.g. self-hosted Node), serve the Vite build alongside the API.
  // On Vercel the static files are served by the CDN and api/index.ts is used,
  // so this block is skipped (NODE_ENV=production but VERCEL=1 → see api/index.ts).
  if (!process.env.VERCEL) {
    const path = await import("path");
    const { fileURLToPath } = await import("url");
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const staticPath = path.resolve(__dirname, "public");
    app.use((await import("express")).default.static(staticPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }
}

const port = Number(process.env.API_PORT || process.env.PORT || (isProd ? 3000 : 3001));

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`[api] running on http://localhost:${port}/`);
  });
}
