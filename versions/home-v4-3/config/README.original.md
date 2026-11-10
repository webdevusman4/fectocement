# Fecto Cement Limited — Official Next.js Web Application

A production-ready **Next.js (App Router)** enterprise application for **Fecto Cement Limited**, featuring the official brand identity, floating glassmorphic navbar, and high-performance Hero Section.

---

## 1. Project Architecture (Next.js App Router)

```
├── app/
│   ├── layout.tsx         # Root layout with Inter font, SEO metadata & Viewport
│   ├── page.tsx           # Main homepage orchestrating Navbar, Hero, and Sections
│   └── globals.css        # Tailwind CSS directives & Smoked Glass styling
├── components/
│   ├── FectoNavbar.tsx    # Floating Smoked Navy Glass Pill Navbar ('use client')
│   ├── HeroSection.tsx    # Split layout Hero with 75% Navy Overlay & Next.js Image
│   ├── FectoLogo.tsx      # Pure White vector SVG Crest + Wordmark
│   ├── InvestorsDropdown.tsx # Detached 12px floating glass mega-menu
│   ├── ProductsDropdown.tsx  # Detached 12px floating glass mega-menu
│   ├── MobileMenu.tsx     # Smoked glass drawer navigation ('use client')
│   └── QuoteModal.tsx     # Interactive commercial quotation modal ('use client')
├── public/
│   ├── herobg.jpg         # High-resolution industrial plant background image
│   ├── fecto-50kg-bag.png # 50kg Portland Cement Bag visual anchor
│   └── fecto-logo.svg     # Scalable brand vector logo
├── next.config.mjs        # Next.js configuration (StrictMode & Image remote patterns)
├── tailwind.config.js     # Brand color definitions & custom utilities
├── postcss.config.js      # PostCSS configuration for Tailwind CSS
├── tsconfig.json          # TypeScript path aliases (@/* -> ./src/* or ./components/*)
└── package.json           # Next.js scripts (dev, build, start, lint)
```

---

## 2. Strict Corporate Color Palette

* **Fecto Navy (`#000080`):** Primary background, 75% hero overlay, and high-contrast CTA text.
* **Pure White (`#FFFFFF`):** Primary headline, body typography, SVG logo, and Primary CTA background.
* **Champagne Sand (`#F4D5AB`):** Used sparingly for eyebrow text ("SINCE 1981") and subtle accent highlights ONLY.
* **NO Industrial Slate:** `#0F172A` has been completely eliminated.

---

## 3. Hero Section Mockup

* **Layout:** `min-h-screen` full-viewport height with 2-column responsive split layout on desktop.
* **Background & Overlay:** High-res plant image (`/herobg.jpg`) under a **75% Fecto Navy overlay (`bg-[#000080]/75`)** ensuring 100% legibility of white typography.
* **Left Column:** Eyebrow `"SINCE 1981"`, H1 `"Building Pakistan's Future."`, sub-headline, and dual pill action buttons.
* **Right Column:** Visual anchor showcasing the **Fecto 50kg Cement Bag** (`/fecto-50kg-bag.png`) with deep drop shadow.

---

## 4. Development & Production Commands

### Start Next.js Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build Next.js Production Bundle
```bash
npm run build
```

### Run Production Server
```bash
npm run start
```
