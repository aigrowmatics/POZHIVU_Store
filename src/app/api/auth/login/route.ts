import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (!user) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const validPassword = await bcrypt.compare(body.password, user.passwordHash);

  if (!validPassword) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-change-me");
  const token = await new SignJWT({ email: user.email, role: user.role }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret);
  const response = NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } });
  response.cookies.set("pozhivu_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
  return response;
}
