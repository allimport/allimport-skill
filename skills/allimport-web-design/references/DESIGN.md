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
