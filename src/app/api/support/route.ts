import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ name: z.string().min(2), email: z.string().email(), phone: z.string().optional(), message: z.string().min(10) });

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  return NextResponse.json({ ok: true, ticket: `POZ-${Date.now()}`, received: body });
}
