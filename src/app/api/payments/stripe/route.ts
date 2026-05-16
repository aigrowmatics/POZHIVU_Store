import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

const schema = z.object({ amount: z.number().int().positive(), currency: z.string().default("inr") });

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe credentials missing" }, { status: 500 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const paymentIntent = await stripe.paymentIntents.create({ amount: body.amount, currency: body.currency, automatic_payment_methods: { enabled: true } });
  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
