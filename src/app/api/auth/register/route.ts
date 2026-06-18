import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

async function createSession(email: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-change-me");
  return new SignJWT({ email, role: "CUSTOMER" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret);
}

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  const existing = await prisma.user.findUnique({ where: { email: body.email } });

  if (existing) {
    return NextResponse.json({ error: "An account already exists for this email." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(body.password, 12);
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      passwordHash
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });

  const token = await createSession(user.email);
  const response = NextResponse.json({ ok: true, user });
  response.cookies.set("pozhivu_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });

  return response;
}
