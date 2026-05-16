// @ts-nocheck
import { createApp } from "../server/app";

// Vercel serverless function entry. Vercel will route any URL not matched by
// the static build to this handler (see vercel.json rewrites).
const app = createApp();

export default app;
