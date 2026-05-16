import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ received: true, note: "Verify Stripe signature and update order status here." });
}
