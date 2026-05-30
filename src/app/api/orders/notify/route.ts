import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { z } from "zod";

const itemSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number().int().positive()
});

const schema = z.object({
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.string().min(4)
  }),
  paymentMethod: z.string(),
  payment: z
    .object({
      razorpayPaymentId: z.string().optional(),
      razorpayOrderId: z.string().optional(),
      razorpaySignature: z.string().optional()
    })
    .optional(),
  items: z.array(itemSchema).min(1),
  totals: z.object({
    subtotal: z.number(),
    discount: z.number(),
    total: z.number()
  })
});

export async function POST(request: Request) {
  const order = schema.parse(await request.json());
  const to = process.env.SUPPORT_EMAIL || "pozhivu.support@gmail.com";

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return NextResponse.json({ error: "SMTP is not configured" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const itemRows = order.items
    .map((item) => `${item.name} x ${item.quantity} - INR ${item.price * item.quantity}`)
    .join("\n");

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    replyTo: order.customer.email,
    subject: `New POZHIVU order - ${order.customer.name}`,
    text: `
New POZHIVU order received.

Customer
Name: ${order.customer.name}
Email: ${order.customer.email}
Phone: ${order.customer.phone}
Address: ${order.customer.address}
City: ${order.customer.city}
State: ${order.customer.state}
Pincode: ${order.customer.pincode}

Payment Method: ${order.paymentMethod}
Razorpay Payment ID: ${order.payment?.razorpayPaymentId || "Not provided"}
Razorpay Order ID: ${order.payment?.razorpayOrderId || "Not provided"}

Items
${itemRows}

Subtotal: INR ${order.totals.subtotal}
Discount: INR ${order.totals.discount}
Total: INR ${order.totals.total}
`.trim()
  });

  return NextResponse.json({ ok: true });
}
