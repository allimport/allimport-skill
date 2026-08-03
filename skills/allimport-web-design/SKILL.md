---
name: allimport-web-design
description: Design system skill for allimport-web. Activate when building UI components, pages, or any visual elements. Provides exact color tokens, typography scale, spacing grid, component patterns, and craft rules. Read references/DESIGN.md before writing any CSS or JSX.
---

# allimport-web Design System

You are building UI for **allimport-web**. Dark-themed, cool palette, sans-serif typography (Montserrat Alternates), compact density on a 4px grid.

## Design Philosophy

- **Layered depth** — use shadow tokens to create a sense of physical layering. Each elevation level has a specific shadow.
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Single typeface** — Montserrat Alternates carries all text. Hierarchy comes from size, weight, and color — never font mixing.
- **compact density** — 4px base grid. Every dimension is a multiple of 4.
- **cool palette** — the color temperature runs cool, matching the sans-serif typography.
- **Restrained accent** — `#00d4d4` is the only pop of color. Used exclusively for CTAs, links, focus rings, and active states.
- **Subtle motion** — transitions smooth state changes. Keep durations under 300ms, use ease-out curves.

## Color System

### Core Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Background | `--background` | `#020408` | Page/app background |
| Surface | `--surface` | `#131f38` | Cards, panels, modals |
| Text Primary | `--text-primary` | `#ffffff` | Headings, body text |
| Accent | `--accent` | `#00d4d4` | CTAs, links, focus rings |

### Extended Palette

- `#042626` — Deep background layer or shadow color
- `#0b1120` — Deep background layer or shadow color
- `#3de4e4`

## Typography

### Font Stack

- **Montserrat Alternates** — Heading 1, Heading 2, Heading 3, Body, Caption

### Font Sources

```css
@font-face {
  font-family: "Montserrat Alternates";
  src: url("fonts/MontserratAlternates-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Montserrat Alternates";
  src: url("fonts/MontserratAlternates-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

### Type Scale

| Role | Family | Size | Weight |
|------|--------|------|--------|
| Heading 1 | Montserrat Alternates | clamp(2.2rem,6vw,4rem) | 700 |
| Heading 2 | Montserrat Alternates | clamp(1.9rem,4vw,3.1rem) | 700 |
| Heading 3 | Montserrat Alternates | 1.55rem | 700 |
| Body | Montserrat Alternates | 1.35rem | 400 |
| Caption | Montserrat Alternates | 1.1rem | 400 |

### Typography Rules

- All text uses **Montserrat Alternates** — never add another font family
- Max 3-4 font sizes per screen
- Headings: weight 600-700, body: weight 400
- Use color and opacity for text hierarchy, not additional font sizes
- Line height: 1.5 for body, 1.2 for headings

## Spacing & Layout

### Base Grid: 4px

Every dimension (margin, padding, gap, width, height) must be a multiple of **4px**.

### Spacing Scale

`2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24` px

### Spacing as Meaning

| Spacing | Use |
|---------|-----|
| 4-8px | Tight: related items (icon + label, avatar + name) |
| 12-16px | Medium: between groups within a section |
| 24-32px | Wide: between distinct sections |
| 48px+ | Vast: major page section breaks |

### Border Radius

Scale: `.25rem, 2px, 4px, 8px, 10px, 11px, 14px, 22px, 24px, 999px`
Default: `11px`

### Container

Max-width: `1120px`, centered with auto margins.

## Component Patterns

### Card

```css
.card {
  background: #131f38;
  border-radius: 11px;
  padding: 16px;
  box-shadow: 0 8px 24px #0006;
}
```

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

### Button

```css
/* Primary */
.btn-primary {
  background: #00d4d4;
  color: #ffffff;
  border-radius: 11px;
  padding: 8px 16px;
  font-weight: 500;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.9; }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid #444444;
  color: #ffffff;
  border-radius: 11px;
  padding: 8px 16px;
}
```

```html
<button class="btn-primary">Get Started</button>
<button class="btn-ghost">Learn More</button>
```

### Input

```css
.input {
  background: #020408;
  border: 1px solid #444444;
  border-radius: 11px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
}
.input:focus { border-color: #00d4d4; outline: none; }
```

```html
<input class="input" type="text" placeholder="Search..." />
```

### Badge / Chip

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #131f38;
  color: #8c8c8c;
}
```

```html
<span class="badge">New</span>
<span class="badge">Beta</span>
```

### Modal / Dialog

```css
.modal-backdrop { background: rgba(0, 0, 0, 0.6); }
.modal {
  background: #131f38;
  border-radius: 999px;
  padding: 24px;
  max-width: 480px;
  width: 90vw;
  box-shadow: 0 8px 24px #0006;
}
```

```html
<div class="modal-backdrop">
  <div class="modal">
    <h2>Dialog Title</h2>
    <p>Dialog content.</p>
    <button class="btn-primary">Confirm</button>
    <button class="btn-ghost">Cancel</button>
  </div>
</div>
```

### Table

```css
.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 12px;
  color: #8c8c8c;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #444444;
}
.table td {
  padding: 12px;
  border-bottom: 1px solid #444444;
}
```

```html
<table class="table">
  <thead><tr><th>Name</th><th>Status</th><th>Date</th></tr></thead>
  <tbody>
    <tr><td>Item One</td><td>Active</td><td>Jan 1</td></tr>
    <tr><td>Item Two</td><td>Pending</td><td>Jan 2</td></tr>
  </tbody>
</table>
```

### Navigation

```css
.nav {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
}
.nav-link {
  color: #8c8c8c;
  padding: 8px 12px;
  border-radius: 11px;
  transition: color 150ms;
}
.nav-link:hover { color: #ffffff; }
.nav-link.active { color: #00d4d4; }
```

```html
<nav class="nav">
  <a href="/" class="nav-link active">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/pricing" class="nav-link">Pricing</a>
  <button class="btn-primary" style="margin-left: auto">Get Started</button>
</nav>
```

### Extracted Components

These components were found in the codebase:

**Emblem** (`src/components/intro/Emblem.tsx`)
- Props: `x`, `y`, `vx`, `vy`

**Sections** (`src/components/sections/index.tsx`)

**Catalog** (`src/components/site/Catalog.tsx`)
- Props: `left`, `behavior`

## Animation & Motion

This project uses **subtle motion**. Transitions smooth state changes without calling attention.

### CSS Animations

- `pd-rise`

### Motion Tokens

- **Duration scale:** `700ms`
- **Easing functions:** `cubic-bezier(.16,1,.3,1)`
- **Animated properties:** `opacity`, `transform`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (700ms) for micro-interactions, long (700ms) for page transitions
- **Easing:** Use `cubic-bezier(.16,1,.3,1)` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

### Shadow Tokens

- Overlay (modals, dialogs): `0 8px 24px #0006`
- Overlay (modals, dialogs): `0 10px 30px #00d4d42e`
- Overlay (modals, dialogs): `0 12px 34px #00d4d442`
- Overlay (modals, dialogs): `0 8px 24px rgba(0,0,0,0.4)`
- Overlay (modals, dialogs): `0 10px 30px rgba(0,212,212,0.18)`
- Overlay (modals, dialogs): `0 12px 34px rgba(0,212,212,0.26)`

### Z-Index Scale

`3, 4, 5, 40, 9999`

Use these exact values — never invent z-index values.

## Anti-Patterns (Never Do)

- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 4px
- **No extra fonts** — only Montserrat Alternates are allowed
- **No arbitrary border-radius** — use the scale: .25rem, 2px, 4px, 8px, 10px, 11px, 14px, 22px, 24px, 999px
- **No opacity for disabled states** — use muted colors instead

## Workflow

1. **Read** `references/DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — Montserrat Alternates only, using the type scale
4. **Build layout** on the 4px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — use shadow tokens
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Brand color:** `#00d4d4`
- **Brand typeface:** Montserrat Alternates

## Quick Reference

```
Background:     #020408
Surface:        #131f38
Text:           #ffffff / (not extracted)
Accent:         #00d4d4
Border:         (not extracted)
Font:           Montserrat Alternates
Spacing:        4px grid
Radius:         11px
Frameworks:     Tailwind CSS, React, Next.js
Components:     15 detected
```

## When to Trigger

Activate this skill when:
- Creating new components, pages, or visual elements for allimport-web
- Writing CSS, Tailwind classes, styled-components, or inline styles
- Building page layouts, templates, or responsive designs
- Reviewing UI code for design consistency
- The user mentions "allimport-web" design, style, UI, or theme
- Generating mockups, wireframes, or visual prototypes

---

# Full Reference Files

> Every output file is embedded below. Claude has full design system context from /skills alone.

## Design System Tokens (DESIGN.md)

# allimport-web DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: Tailwind CSS 4.3.2 + React 19.1.0 + Next.js 15.3.3
> Colors: 7 · Fonts: 1 · Components: 15
> Icon library: not detected · State: not detected
> Primary theme: dark · Dark mode toggle: no · Motion: subtle

---

## 1. Visual Theme & Atmosphere

This is a **dark-themed** interface with a cool tone. Depth is expressed through layered shadows and subtle surface color variation. Typography uses **Montserrat Alternates** throughout — a clean, modern choice that maintains consistency. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 14, 16px. The palette is predominantly monochromatic with **#00d4d4** as the single accent color — used sparingly for interactive elements and emphasis. Motion is subtle — smooth transitions (150-300ms) ease state changes without drawing attention.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| background | `#020408` | background | Page background, darkest surface |
| surface | `#131f38` | surface | Card and panel backgrounds |
| tw-ring-offset-color | `#ffffff` | text-primary | Headings and body text |
| accent | `#00d4d4` | accent | CTAs, links, focus rings, active states |
| info | `#0b1120` | info | Informational highlights |
| unknown | `#042626` | unknown | Palette color |
| unknown | `#3de4e4` | unknown | Palette color |

### CSS Variable Tokens

```css
--tw-border-style: solid;
```


---

## 3. Typography Rules

**Font Stack:**
- **Montserrat Alternates** — Heading 1, Heading 2, Heading 3, Body, Caption

**Font Sources:**

```css
@font-face {
  font-family: "Montserrat Alternates";
  src: url("fonts/MontserratAlternates-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Montserrat Alternates";
  src: url("fonts/MontserratAlternates-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Montserrat Alternates | clamp(2.2rem,6vw,4rem) | 700 |
| Heading 2 | Montserrat Alternates | clamp(1.9rem,4vw,3.1rem) | 700 |
| Heading 3 | Montserrat Alternates | 1.55rem | 700 |
| Body | Montserrat Alternates | 1.35rem | 400 |
| Caption | Montserrat Alternates | 1.1rem | 400 |

**Typographic Rules:**
- Use **Montserrat Alternates** for all text — do not mix font families
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (1)

**Sections** — `src/components/sections/index.tsx`

```tsx
<section id="trust" className="sec sec-trust">
      <Reveal className="trust-row">
        {items.map((t
```

### Other (14)

**Atmosphere** — `src/components/intro/Atmosphere.tsx`
- State: useRef

```tsx
<mesh position={[O_CENTER[0], CENTER_Y + O_CENTER[1] + 0.3, -5]}>
      <planeGeometry args={[12, 9]} />
      <meshBasicMaterial
        ref={mat}
        map={sprite}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
```

**CameraRig** — `src/components/intro/CameraRig.tsx`
- Props: `x`, `y`
- State: useRef

**CompositePass** — `src/components/intro/CompositePass.tsx`

**DepthField** — `src/components/intro/DepthField.tsx`
- Props: `x`, `y`
- State: useRef

```tsx
<mesh position={[0, 0, -32]}>
      <planeGeometry args={[110, 64]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
```

**Effects** — `src/components/intro/Effects.tsx`

```tsx
// MSAA 4 on desktop: jagged letter edges are the #1 "WebGL demo" tell.
    <EffectComposer multisampling={mobile ? 0 : 4} resolutionScale={mobile ? 0.5 : 0.75}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
    </EffectComposer>
```

**Emblem** — `src/components/intro/Emblem.tsx`
- Props: `x`, `y`, `vx`, `vy`
- State: useRef

```tsx
<group ref={group} position={[0, CENTER_Y, 0]} visible={false}>
      {/* Letters: brand white. The bolt's point light tints the letters
          near the o with celeste — a real light gradient across the logo. */}
      {LETTERS.map((l, i
```

**Fluid** — `src/components/intro/Fluid.tsx`
- Props: `x`, `y`, `has`
- State: useRef

**IntroExperience** — `src/components/intro/IntroExperience.tsx`
- Props: `v`
- State: useState, useRef

*...and 6 more other components.*



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
- **Border radius:** .25rem, 2px, 4px, 8px, 10px, 11px, 14px, 22px, 24px, 999px
- **Max content width:** 1120px
- **Container:** Tailwind `container` class with responsive padding

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Overlay — full-screen overlays, top-level dialogs

- `0 8px 24px #0006`
- `0 10px 30px #00d4d42e`
- `0 12px 34px #00d4d442`

### Z-Index Scale

`3, 4, 5, 40, 9999`



---

## 7. Animation & Motion

This project uses **subtle motion**. Transitions smooth state changes without demanding attention.

### CSS Animations

- `@keyframes pd-rise`

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#00d4d4` for interactive elements (buttons, links, focus rings)
- Use `#020408` as the primary page background
- Use **Montserrat Alternates** for all UI text
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: .25rem, 2px, 4px, 8px, 10px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't mix font families — use Montserrat Alternates consistently
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first


---

## 9. Responsive Behavior

No breakpoints detected. Consider adding responsive breakpoints to the design system.

---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #131f38
Border: 1px solid var(--border)
Radius: 11px
Padding: 16px
Font: Montserrat Alternates
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #00d4d4, text white
Ghost: bg transparent, border var(--border)
Padding: 8px 16px
Radius: 11px
Hover: opacity 0.9 or lighter shade
Focus: ring with #00d4d4
```

### Build a Page Layout

```
Background: #020408
Max-width: 1120px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #131f38
Label: var(--text-muted) (muted, 12px, uppercase)
Value: #ffffff (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #020408
Input border: 1px solid var(--border)
Focus: border-color #00d4d4
Label: var(--text-muted) 12px
Spacing: 16px between fields
Radius: 11px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Montserrat Alternates, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```

## Bundled Fonts (fonts/)

The following font files are bundled in the `fonts/` directory:

- `fonts/MontserratAlternates-Black.ttf`
- `fonts/MontserratAlternates-Bold.ttf`
- `fonts/MontserratAlternates-ExtraBold.ttf`
- `fonts/MontserratAlternates-ExtraLight.ttf`
- `fonts/MontserratAlternates-Light.ttf`
- `fonts/MontserratAlternates-Medium.ttf`
- `fonts/MontserratAlternates-Regular.ttf`
- `fonts/MontserratAlternates-SemiBold.ttf`
- `fonts/MontserratAlternates-Thin.ttf`

Use these local font files in `@font-face` declarations instead of fetching from Google Fonts.

