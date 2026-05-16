import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-change-me");
  const token = await new SignJWT({ email: body.email, role: "CUSTOMER" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret);
  const response = NextResponse.json({ ok: true });
  response.cookies.set("pozhivu_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
  return response;
}
