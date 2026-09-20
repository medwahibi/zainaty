---
name: zainaty-button
description: Generates the Zainaty standardized pill button with a sliding background reveal animation. Use this skill whenever a button is requested.
---

# Zainaty Standard Button Skill

Use this skill whenever the user asks for a button, a hero button, or the "Zainaty button". This generates a pill-shaped button with an underlined text label, a dark circular arrow icon on the right, and a sleek "sliding background reveal" animation on hover.

## HTML Structure

Always use the following HTML structure for the button. Note how incredibly clean this is—there is no need for spans or inline SVGs!

```html
<a href="#" class="zainaty-btn">Your Text Here</a>
```

## CSS Styling (Sliding Background Reveal)

Ensure the following CSS is present in `app.css`. If it does not exist, add it. The icon and sliding reveal are handled entirely through pseudo-elements (`::before` and `::after`).

```css
/* ==========================================================================
   ZAINATY STANDARD BUTTON (SLIDING REVEAL)
   ========================================================================== */
.zainaty-btn {
  display: inline-flex;
  align-items: center;
  background-color: #F9F1E6;
  border-radius: 50px;
  padding: 16px 70px 16px 30px; /* Right padding makes room for the absolute circle */
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
  position: relative;
  overflow: hidden;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  color: #003D29;
  text-transform: uppercase;
  transition: color 0.4s ease, text-decoration-color 0.4s ease;
  z-index: 1; /* Establish stacking context */
}

/* Sliding background layer */
.zainaty-btn::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #003D29;
  border-radius: 50px;
  transform: translateX(105%);
  transition: transform 0.5s cubic-bezier(0.7, 0, 0.3, 1);
  z-index: -1; /* Place behind text but inside button */
}

/* The circle and arrow */
.zainaty-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 40px; /* Sizing the circle */
  height: 40px;
  border-radius: 50%;
  background-color: #003D29;
  /* SVG Arrow Icon injected via background-image */
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23F9F1E6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3Cpolyline points='12 5 19 12 12 19'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  transition: background-color 0.4s ease, background-image 0.4s ease;
}

/* Hover effects */
.zainaty-btn:hover {
  color: #F9F1E6;
  text-decoration-color: transparent;
}

.zainaty-btn:hover::before {
  transform: translateX(0);
}

.zainaty-btn:hover::after {
  background-color: #F9F1E6;
  /* Change the SVG arrow to dark #003D29 on hover */
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23003D29' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3Cpolyline points='12 5 19 12 12 19'%3E%3C/polyline%3E%3C/svg%3E");
}
```

## Instructions for Agent
1. Insert the single anchor tag where requested.
2. Ensure the CSS is added to `app.css`.
3. If replacing an existing button (like `hero__btn`), completely swap out the classes for `zainaty-btn`.
