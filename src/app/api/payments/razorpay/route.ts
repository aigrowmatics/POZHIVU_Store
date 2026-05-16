import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";

const schema = z.object({ amount: z.number().int().positive(), currency: z.string().default("INR"), receipt: z.string().optional() });

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "Razorpay credentials missing" }, { status: 500 });
  }
  const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
  const order = await razorpay.orders.create({ amount: body.amount, currency: body.currency, receipt: body.receipt });
  return NextResponse.json(order);
}
