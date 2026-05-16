import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.get("/health", (_req, res) => res.json({ ok: true, service: "pozhivu-api" }));
app.post("/shiprocket/tracking", (_req, res) => res.json({ status: "ready", note: "Attach Shiprocket AWB tracking integration here." }));
app.post("/notifications/order-confirmation", (_req, res) => res.json({ status: "queued", note: "Attach Nodemailer or SendGrid template here." }));
