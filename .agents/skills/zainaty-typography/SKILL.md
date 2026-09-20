---
name: zainaty-typography
description: Global typography styles for Zainaty, specifying PPEditorialNew (italic) for major headings (H1, H2) and Montserrat for all other text (H3-H6, body, links).
---

# Zainaty Typography Standard

This skill outlines the exact typography rules for Zainaty to ensure consistency across the current site and all future pages/designs.

## Core Font Families

1.  **Headings (H1 & H2) / Hero Typography:**
    *   **Font Family:** `PPEditorialNew`
    *   **Fallback:** `serif`
    *   **Style:** `italic`
    *   **Weight:** `normal`
    *   **Source:** Local OTF file (`assets/fonts/PPEditorialNew-Italic-BF644b214fb0c0a.otf`)

2.  **All Other Text (H3-H6, p, span, a, li, buttons, etc.):**
    *   **Font Family:** `Montserrat`
    *   **Fallback:** `sans-serif`
    *   **Style:** `normal`
    *   **Weight:** Variable (`400` for base, `600` for bold/strong)
    *   **Source:** Google Fonts

## Usage Rules & Enforcement

*   **Semantic HTML as the Source of Truth:** Do not apply typography directly to classes unless absolutely necessary. Instead, ensure the typography is defined on semantic HTML tags (`h1`, `h2`, `h3`, `p`, etc.). This guarantees that whenever a developer creates a new `<h1>`, it will automatically inherit the correct `PPEditorialNew` italic style.
*   **Avoid Playfair Display:** We have completely migrated away from `Playfair Display`. Do not introduce it in new designs. Use `PPEditorialNew` instead.
*   **Implementation in CSS:** The global typography overrides should be placed at the bottom of the main CSS file using `!important` to enforce the rules across the entire site.

## CSS Implementation Example

```css
@font-face {
  font-family: 'PPEditorialNew';
  src: url('../fonts/PPEditorialNew-Italic-BF644b214fb0c0a.otf') format('opentype');
  font-weight: normal;
  font-style: italic;
}

/* H1 - Big Headline */
h1, h2 {
  font-family: 'PPEditorialNew', serif !important;
  font-weight: normal !important;
  font-style: italic !important;
}

/* Base Font & Small Headings */
h3, h4, h5, h6, body, p, a, span {
  font-family: 'Montserrat', sans-serif !important;
  font-style: normal !important;
}
```
