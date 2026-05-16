import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { authRouter } from "./routes/auth";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.APP_ORIGIN || "http://localhost:3000",
      credentials: true,
    }),
  );

  app.use("/api/auth", authRouter);
  app.get("/api/health", (_req, res) => res.json({ ok: true }));

  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    const staticPath = path.resolve(__dirname, "public");
    app.use(express.static(staticPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  const port = Number(process.env.API_PORT || process.env.PORT || (isProd ? 3000 : 3001));

  server.listen(port, () => {
    console.log(`[api] running on http://localhost:${port}/`);
  });
}

startServer().catch((e) => {
  console.error(e);
  process.exit(1);
});
