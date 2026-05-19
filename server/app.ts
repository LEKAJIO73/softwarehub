// @ts-nocheck
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import { chatRouter } from "./routes/chat.js";
import { paymentsRouter } from "./routes/payments.js";

export function createApp() {
  const app = express();

  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.APP_ORIGIN || "http://localhost:3000",
      credentials: true,
    }),
  );

  app.use("/api/auth", authRouter);
  app.use("/api/chat", chatRouter);
  app.use("/api/payments", paymentsRouter);
  app.get("/api/health", (_req, res) => res.json({ ok: true }));

  return app;
}
