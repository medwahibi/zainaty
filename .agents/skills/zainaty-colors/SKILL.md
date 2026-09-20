---
name: zainaty-colors
description: Defines the restricted core color palette for the Zainaty brand (Soft Light Grayish Orange, White, and Deep Forest Green).
---

# Zainaty Color Palette

This skill defines the strict color palette that must be used across all Zainaty pages, components, and designs. The brand relies on a highly curated, minimalist, and premium aesthetic, meaning we strictly limit the number of colors used.

## The Core Palette (Only Use These)

1. **Soft Light Grayish Orange (Backgrounds / Accents):**
   - **Hex:** `#F9F1E6`
   - **Usage:** Used for product cards, or subtle badge backgrounds (e.g., `.new-badge`).

2. **White (Base / Contrast):**
   - **Hex:** `#FFFFFF`
   - **Usage:** Pages backgrounds, text on dark backgrounds or any images, or default button/icon backgrounds.

3. **Primary Deep Forest Green (Text / Action):**
   - **Hex:** `#003D29`
   - **Usage:** All primary text, headings, active states, hover states, and primary call-to-action buttons. 

## Banned Colors
- **Lime Green / Neon:** `#D3FA99` is strictly prohibited. It was removed from the design system. If you see it in legacy code or if it's suggested, automatically replace it with `#F9F1E6` or `#003D29` depending on contrast requirements.
- **Generic Grays/Blacks:** Avoid using `#1C1C1C` or `#F4F4F4` where the primary Deep Forest Green (`#003D29`) or White (`#FFFFFF`) should be used instead. 

## Application Rules
When building new UI components:
- Default text color should be `#003D29`.
- Buttons and interactive elements should invert between `#FFFFFF` and `#003D29` on hover.
- Never introduce new hex codes without explicit user approval.
