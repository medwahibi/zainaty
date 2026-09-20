---
name: zainaty-stacked-cards
description: Outlines the GSAP logic for the Stacked Cards section, including pinning, fading, and the SVG Leaf drawing animation.
---

# Zainaty Stacked Cards Animation

This skill outlines the complex GSAP logic used for the "Stacked Cards" section (often used for educational steps or process flows). 

## Structure & Trigger Elements
- **Card Wrapper:** `.er-step`
- **SVG Leaf Graphic:** `.er-leaf-svg path`
- **Bookend Section:** `.bookend-section` (The section immediately following the stacked cards, used to determine when to unpin them).

## Animation Logic

The stacked cards utilize three distinct GSAP effects working in tandem:

### 1. The Pinning (Stacking) Effect
Each `.er-step` card is pinned to the screen (`top 120px`) when it scrolls into view. The card remains pinned until the final `.bookend-section` covers it.

```javascript
ScrollTrigger.create({
    trigger: step,
    start: "top 120px",
    endTrigger: bookendSection,
    end: "top 120px",
    pin: true,
    pinSpacing: false, // Prevents pushing content down, allowing the next card to overlap
    scrub: true
});
```

### 2. The SVG Leaf Drawing Animation
Inside each `.er-step`, an SVG leaf path is drawn using the classic stroke-dasharray technique.

1. **Calculate Length:** Get `getTotalLength()` of the path.
2. **Setup:** Set `strokeDasharray` and `strokeDashoffset` to the total length (making the stroke invisible).
3. **Animate:** Animate `strokeDashoffset` to `0` as the card scrolls up to its pinned position.

```javascript
const leafPaths = step.querySelectorAll('.er-leaf-svg path');
leafPaths.forEach(path => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    
    gsap.to(path, {
        strokeDashoffset: 0,
        scrollTrigger: {
            trigger: step,
            start: "top 85%", // Start drawing when card enters viewport
            end: "top 120px", // Finish drawing when card pins
            scrub: 1
        }
    });
});
```

### 3. The Depth Fade/Scale
To create depth when the *next* card overlaps the current one, the current card scales down to `0.95` and fades to `opacity: 0`.

```javascript
const nextElement = isLast ? bookendSection : steps[index + 1];
gsap.to(step, {
    scale: 0.95,
    opacity: 0,
    scrollTrigger: {
        trigger: nextElement,
        start: "top bottom", // Starts fading when the next element enters
        end: "top top",      // Fully faded when next element covers it
        scrub: true
    }
});
```
