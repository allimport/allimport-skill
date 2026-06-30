---
name: ui-ux-pro-max
description: Use when designing UI/UX for web or mobile apps. Provides AI-powered design intelligence with 84 UI styles, 161 color palettes, 73 font pairings, 99 UX guidelines, and 25 chart types across 17 tech stacks. Generates complete design systems tailored to product type.
version: 2.6.2
---

# UI/UX Pro Max

AI-powered design intelligence toolkit for building professional UI/UX across multiple platforms and frameworks.

## Design System Generator

When given a product description, generates a complete tailored design system:

```
TARGET: [Product Name] — RECOMMENDED DESIGN SYSTEM
PATTERN: [Layout pattern + conversion strategy]
STYLE: [UI style name + keywords]
COLORS: Primary, Secondary, CTA, Background, Text
TYPOGRAPHY: [Font pairing] — mood and use case
KEY EFFECTS: [Animations, transitions, hover states]
AVOID: [Anti-patterns for this product type]
PRE-DELIVERY CHECKLIST: [Accessibility, responsiveness, interactions]
```

## Domains

- **product** — Product type recommendations (SaaS, e-commerce, portfolio)
- **style** — UI styles (glassmorphism, minimalism, brutalism) + CSS keywords
- **typography** — Font pairings with Google Fonts imports
- **color** — Color palettes by product type
- **landing** — Page structure and CTA strategies
- **chart** — Chart types and library recommendations
- **ux** — Best practices and anti-patterns

## Supported Stacks

html-tailwind, react, nextjs, astro, vue, nuxtjs, nuxt-ui, svelte, swiftui, react-native, flutter, shadcn, jetpack-compose, angular, laravel, javafx

## Usage

```
Design a landing page for [product description]
What UI style fits a wellness/fintech/SaaS app?
What color palette works for [industry]?
Best font pairing for [mood/brand]?
```

## Pre-Delivery Checklist

- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
