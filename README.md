# POZHIVU Ecommerce

Deployment-ready premium ecommerce website for POZHIVU, a handmade donkey milk soap brand.

## Stack

- Next.js 15, React, TypeScript
- Tailwind CSS, Framer Motion, Zustand
- API routes for auth, checkout, payments, shipping and support
- Prisma schema for PostgreSQL
- Razorpay, Stripe and Shiprocket integration points

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Production Checklist

1. Set production environment variables from `.env.example`.
2. Create a PostgreSQL database and run Prisma migrations.
3. Configure Razorpay, Stripe and Shiprocket credentials.
4. Deploy to Vercel, Railway, Render or AWS.
5. Replace legal templates with business-approved final copy.
