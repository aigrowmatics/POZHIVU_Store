import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  pickup_postcode: z.string(),
  delivery_postcode: z.string(),
  weight: z.number().default(0.5),
  cod: z.boolean().default(false)
});

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  return NextResponse.json({
    serviceable: true,
    provider: "Shiprocket",
    estimatedDays: "3-7",
    charge: body.cod ? 99 : 79,
    note: "Replace mock response with Shiprocket courier/serviceability API call after credentials are configured."
  });
}
