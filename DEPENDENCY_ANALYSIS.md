# POZHIVU Store - Dependency Analysis Report

**Date**: 2026-06-17  
**Project**: POZHIVU E-commerce Store (Next.js + React)  
**Total Dependencies**: 15 production + 12 dev dependencies

---

## Summary

| Category | Count | Status |
|----------|-------|--------|
| **RELEVANT** (Core/In-use) | 11 | ✅ Active |
| **DEVELOPMENT** (Dev-only) | 12 | ✅ Active |
| **UNUSED** | 2 | ⚠️ Attention Needed |
| **OPTIONAL** | 0 | - |

---

## 📦 RELEVANT DEPENDENCIES (Core Packages - In Active Use)

### Framework & Core
#### **1. `next` v15.3.2**
- **Category**: RELEVANT (Core Framework)
- **Purpose**: Next.js framework for SSR, routing, API routes, image optimization
- **Used In**:
  - All pages in `src/app/` (routing, metadata, layouts)
  - API routes in `src/app/api/`
  - Next.js Image component in product pages
  - Metadata export in [layout.tsx](src/app/layout.tsx#L1)
- **Critical**: YES
- **Notes**: Foundation of the entire application

#### **2. `react` v19.1.0**
- **Category**: RELEVANT (Core Library)
- **Purpose**: React UI library for building components
- **Used In**: 
  - All `.tsx` files throughout the project
  - Hooks: [useState](src/components/header.tsx#L5), [useEffect](src/components/sections.tsx#L6), [useMemo](src/components/header.tsx#L5)
  - Form event handlers in [checkout/page.tsx](src/app/checkout/page.tsx#L5)
- **Critical**: YES

#### **3. `react-dom` v19.1.0**
- **Category**: RELEVANT (Core Library)
- **Purpose**: React DOM rendering
- **Used In**: Implicit dependency of React components
- **Critical**: YES

### State Management
#### **4. `zustand` v5.0.5**
- **Category**: RELEVANT (Core Feature)
- **Purpose**: Lightweight state management library
- **Used In**: [src/store/cart-store.ts](src/store/cart-store.ts#L3)
- **Features**: Cart items, wishlist, coupon management, persistence
- **Critical**: YES
- **Used Methods**: `create()`, `persist()` middleware

### UI & Icons
#### **5. `lucide-react` v0.468.0**
- **Category**: RELEVANT (Core Feature)
- **Purpose**: Icon library for React
- **Used In**:
  - [Header](src/components/header.tsx#L4): Menu, Sun/Moon toggle, Search, Cart, User, Heart icons
  - [Product card](src/components/product-card.tsx#L5): Heart, ShoppingBag, Star icons
  - [Sections](src/components/sections.tsx#L7): ArrowRight, CheckCircle2, Mail, etc.
  - [Cart page](src/app/cart/page.tsx#L5): Minus, Plus, Trash2
  - [Admin page](src/app/admin/page.tsx#L1): BarChart3, Boxes, Package, ShoppingCart, Tag, Users
  - [Support page](src/app/support/page.tsx#L4): ChevronDown, Mail, MapPin, Phone
  - Data icons in [content.ts](src/data/content.ts#L1): Award, BadgeCheck, HeartHandshake, Leaf, etc.
- **Critical**: YES
- **Usage Scale**: 40+ icon imports across 10+ files

#### **6. `framer-motion` v12.12.1**
- **Category**: RELEVANT (Enhancement)
- **Purpose**: Animation library for React
- **Used In**: [src/components/sections.tsx](src/components/sections.tsx#L3)
- **Features**: AnimatePresence, motion components for smooth transitions
- **Critical**: MEDIUM (Enhances UX, not essential for functionality)

### Styling & Class Management
#### **7. `clsx` v2.1.1**
- **Category**: RELEVANT (Core Feature)
- **Purpose**: Utility for classNames manipulation
- **Used In**: [src/lib/utils.ts](src/lib/utils.ts#L1)
- **Method**: `cn()` utility function for Tailwind class concatenation
- **Critical**: YES (Used throughout for conditional styling)

### Payment Systems
#### **8. `stripe` v16.12.0**
- **Category**: RELEVANT (Feature)
- **Purpose**: Stripe payment processing
- **Used In**: [src/app/api/payments/stripe/route.ts](src/app/api/payments/stripe/route.ts#L2)
- **Functionality**: Payment intent creation, payment processing API
- **Critical**: MEDIUM (Required for Stripe payments)

#### **9. `razorpay` v2.9.6**
- **Category**: RELEVANT (Feature)
- **Purpose**: Razorpay payment processing
- **Used In**: [src/app/api/payments/razorpay/route.ts](src/app/api/payments/razorpay/route.ts#L2)
- **Functionality**: Order creation, payment processing via Razorpay
- **Critical**: MEDIUM (Required for Razorpay payments)

### Form Validation & Security
#### **10. `zod` v3.24.4**
- **Category**: RELEVANT (Core Feature)
- **Purpose**: TypeScript-first schema validation
- **Used In**:
  - [src/app/api/support/route.ts](src/app/api/support/route.ts#L2): Contact form validation
  - [src/app/api/payments/stripe/route.ts](src/app/api/payments/stripe/route.ts#L3): Payment data validation
  - [src/app/api/payments/razorpay/route.ts](src/app/api/payments/razorpay/route.ts#L3): Order validation
  - [src/app/api/orders/notify/route.ts](src/app/api/orders/notify/route.ts#L3): Order notification validation
  - [src/app/api/auth/login/route.ts](src/app/api/auth/login/route.ts#L3): Auth form validation
- **Critical**: YES (Validates all API inputs)

#### **11. `jose` v5.10.0**
- **Category**: RELEVANT (Feature)
- **Purpose**: JWT token signing and verification
- **Used In**: [src/app/api/auth/login/route.ts](src/app/api/auth/login/route.ts#L1)
- **Method**: `SignJWT` for creating session tokens
- **Critical**: MEDIUM (Required for authentication)

### Email & Notifications
#### **12. `nodemailer` v6.10.1**
- **Category**: RELEVANT (Feature)
- **Purpose**: Email sending for order notifications
- **Used In**: [src/app/api/orders/notify/route.ts](src/app/api/orders/notify/route.ts#L1)
- **Functionality**: SMTP configuration, email transport creation
- **Critical**: MEDIUM (Required for order notifications)

### Backend Framework & Middleware
#### **13. `express` v4.19.2**
- **Category**: RELEVANT (Feature)
- **Purpose**: Express.js server framework
- **Used In**: [src/server/express-api.ts](src/server/express-api.ts#L1)
- **Functionality**: Health checks, notification endpoints
- **Critical**: LOW (Currently minimal usage, mostly placeholder)

#### **14. `helmet` v7.1.0**
- **Category**: RELEVANT (Security)
- **Purpose**: HTTP security headers middleware
- **Used In**: [src/server/express-api.ts](src/server/express-api.ts#L2)
- **Security**: Prevents XSS, clickjacking, MIME-type sniffing
- **Critical**: MEDIUM (Security best practice)

#### **15. `express-rate-limit` v7.4.1**
- **Category**: RELEVANT (Security)
- **Purpose**: Rate limiting middleware for Express
- **Used In**: [src/server/express-api.ts](src/server/express-api.ts#L3)
- **Config**: 120 requests per 60 seconds per IP
- **Critical**: MEDIUM (Prevents abuse, protects API)

---

## 🛠️ DEVELOPMENT DEPENDENCIES (Dev-only, Never Bundled)

#### **1. `typescript` v5.8.3**
- **Purpose**: Type checking and type safety
- **Used By**: Build process (tsc --noEmit)
- **Config**: [tsconfig.json](tsconfig.json)
- **Critical**: YES (Project is TypeScript)

#### **2. `@types/node` v20.17.50**
- **Purpose**: TypeScript type definitions for Node.js APIs
- **Used In**: API routes using Node types
- **Critical**: YES

#### **3. `@types/react` v19.0.0**
- **Purpose**: TypeScript type definitions for React
- **Used In**: All React components
- **Critical**: YES

#### **4. `@types/react-dom` v19.0.0**
- **Purpose**: TypeScript type definitions for React DOM
- **Used In**: React rendering
- **Critical**: YES

#### **5. `@types/express` v4.17.21**
- **Purpose**: TypeScript type definitions for Express
- **Used In**: [src/server/express-api.ts](src/server/express-api.ts)
- **Critical**: MEDIUM

#### **6. `eslint` v9.27.0**
- **Purpose**: Code linting and style checking
- **Script**: `npm run lint`
- **Critical**: MEDIUM (Code quality)

#### **7. `eslint-config-next` v15.3.2**
- **Purpose**: Next.js ESLint configuration presets
- **Used With**: eslint
- **Critical**: MEDIUM

#### **8. `tailwindcss` v3.4.17**
- **Purpose**: Utility-first CSS framework
- **Used In**: All component styling via class names
- **Config**: [tailwind.config.ts](tailwind.config.ts)
- **Critical**: YES (Entire styling approach)

#### **9. `autoprefixer` v10.4.21**
- **Purpose**: PostCSS plugin for vendor prefixes
- **Used With**: Tailwind CSS
- **Critical**: MEDIUM (CSS compatibility)

#### **10. `postcss` v8.5.6**
- **Purpose**: CSS transformation and processing framework
- **Used With**: Tailwind, autoprefixer
- **Config**: [postcss.config.mjs](postcss.config.mjs)
- **Critical**: YES (CSS pipeline)

#### **11. `prisma` v6.8.2**
- **Purpose**: Database ORM CLI and migrations
- **Schema**: [prisma/schema.prisma](prisma/schema.prisma)
- **Use Case**: Database schema management, migrations
- **Critical**: MEDIUM (Setup infrastructure, not runtime)

#### **12. `@prisma/client` v6.8.2 (DevDependency context)**
- **Purpose**: Prisma client generation
- **Related To**: Prisma dev dependency
- **Critical**: MEDIUM (Schema management)

---

## ⚠️ UNUSED DEPENDENCIES (Installed but Not Used)

### **1. `@prisma/client` v6.8.2**
- **Status**: UNUSED ❌
- **Why Included**: Database ORM - schema defined but not actively used
- **Evidence**: 
  - Zero imports of `@prisma/client` or `@prisma` in any source files
  - Prisma schema exists at [prisma/schema.prisma](prisma/schema.prisma) with User, Address, Product, Order models
  - Application uses static product data from [src/data/products.ts](src/data/products.ts)
  - No database queries in API routes
- **Recommendation**: 
  - ✅ **KEEP** if planning to integrate database functionality
  - 🗑️ **REMOVE** if staying with static data approach
  - **Action**: If keeping, implement database queries in API routes; if removing, also remove Prisma schema

### **2. `bcryptjs` v2.4.3**
- **Status**: UNUSED ❌
- **Why Included**: Password hashing library - Prisma schema has `passwordHash` field
- **Evidence**:
  - Zero imports of `bcryptjs` anywhere in codebase
  - Login route at [src/app/api/auth/login/route.ts](src/app/api/auth/login/route.ts) accepts email/password but doesn't use bcryptjs
  - No user authentication validation against database
- **Recommendation**:
  - ✅ **KEEP** if implementing secure password storage
  - 🗑️ **REMOVE** if staying with JWT-only authentication
  - **Action**: Either implement bcrypt in login route or remove if not needed for current auth model

---

## 📊 Dependency Breakdown

### By Purpose:
| Purpose | Packages | Count |
|---------|----------|-------|
| Framework & Rendering | next, react, react-dom | 3 |
| State Management | zustand | 1 |
| UI/Icons/Animation | lucide-react, framer-motion | 2 |
| Styling | clsx, tailwindcss, postcss, autoprefixer | 4 |
| Payments | stripe, razorpay | 2 |
| Validation | zod | 1 |
| Security | jose, helmet, express-rate-limit | 3 |
| Email | nodemailer | 1 |
| Backend | express | 1 |
| **Unused** | @prisma/client, bcryptjs | 2 |
| **Type Definitions** | @types/* | 5 |
| **Dev Tools** | typescript, eslint, eslint-config-next, prisma | 4 |

### By Bundle Impact:
- **Critical (Must Have)**: next, react, react-dom, tailwindcss, typescript, zod, lucide-react, zustand, clsx
- **Important (Feature)**: stripe, razorpay, nodemailer, jose, framer-motion
- **Infrastructure (Optional)**: express, helmet, express-rate-limit, postcss, autoprefixer
- **Unused (Consider Removing)**: @prisma/client, bcryptjs

---

## 🔍 Package Size Analysis

### Large Packages (Consider if removable):
- **lucide-react** (~40KB tree-shaken): Worth it - heavy icon usage (40+ imports)
- **framer-motion** (~50KB): Medium usage (only in sections), but enhances UX
- **zod** (~30KB): Essential for all form validation
- **tailwindcss** (dev-only): Entire styling foundation

### Small Packages (Negligible impact):
- **clsx** (~1.5KB): Utility function
- **jose** (~2KB): JWT handling
- **zustand** (~2KB): State management

---

## 📋 Recommendations

### Immediate Actions:
1. **Decide on Prisma**: 
   - YES: Start using `@prisma/client` in API routes
   - NO: Remove @prisma/client and prisma from dependencies

2. **Decide on bcryptjs**:
   - YES: Implement password hashing in login route
   - NO: Remove bcryptjs from dependencies

3. **Express Server**: Currently minimal usage. Evaluate if needed or simplify.

### Performance Optimization:
- ✅ All active packages are justified
- ✅ No obvious bloat or duplicate libraries
- ✅ Type definitions are lightweight

### Security:
- ✅ Using helmet for HTTP headers
- ✅ Using express-rate-limit for API protection
- ✅ Using zod for input validation
- ✅ Using jose for JWT tokens
- ⚠️ Consider: Add CSRF protection if using forms with state changes

### Future Improvements:
- Consider adding error boundary libraries (React error boundaries built-in)
- Consider adding logging library (winston, pino)
- Consider adding API client (fetch/axios for server-side)
- Consider adding testing libraries (jest, vitest, testing-library)

---

## 📝 File Usage Reference

### Core Business Logic Files:
- **Auth**: [src/app/api/auth/login/route.ts](src/app/api/auth/login/route.ts) - jose, zod
- **Payments**: 
  - [src/app/api/payments/stripe/route.ts](src/app/api/payments/stripe/route.ts) - stripe, zod
  - [src/app/api/payments/razorpay/route.ts](src/app/api/payments/razorpay/route.ts) - razorpay, zod
- **Orders**: [src/app/api/orders/notify/route.ts](src/app/api/orders/notify/route.ts) - nodemailer, zod
- **Cart Management**: [src/store/cart-store.ts](src/store/cart-store.ts) - zustand
- **UI Components**: 
  - [src/components/header.tsx](src/components/header.tsx) - lucide-react
  - [src/components/sections.tsx](src/components/sections.tsx) - framer-motion, lucide-react
- **Styling**: [src/lib/utils.ts](src/lib/utils.ts) - clsx

---

**Report Generated**: 2026-06-17  
**Analysis Scope**: All imports in src/, config files, and package.json
