---
name: zainaty-logo-animation
description: Applies the signature rotating triangle animation to the Zainaty logo on scroll using GSAP and ScrollTrigger.
---

# Zainaty Logo Triangle Animation

This skill outlines how to implement the signature rotating triangle animation inside the Zainaty logo. The outer ring of 8 triangles spins smoothly as the user scrolls down the page.

## SVG Structure Requirements

To animate the logo triangles properly, the 8 outer triangle `<path>` elements must be wrapped in a specific `<g>` tag with the ID `zainaty-triangles-spin`.

```html
<!-- Inside the Zainaty SVG logo -->
<g id="zainaty-triangles-spin" style="transform-origin: 191px 187px;">
  <!-- The 8 triangle paths go here -->
  <path class="header__logo-color" d="..." />
  <!-- ... -->
</g>
```

*Note: The inline `transform-origin` helps act as a fallback, but GSAP will dynamically recalculate the center.*

## GSAP Animation Logic

The animation utilizes GSAP and `ScrollTrigger`. It targets `#zainaty-triangles-spin` and maps a full 360-degree rotation to the scroll depth of the `main` container. 

```javascript
// Ensure this runs after GSAP and ScrollTrigger are loaded/registered
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // CRITICAL: On mobile (<=1100px), CSS sets body to overflow:hidden and .page-scroll to overflow-y:auto
    // Therefore, ScrollTrigger must listen to .page-scroll instead of the window to detect scrolling.
    const isMobile = window.innerWidth <= 1100;
    if (isMobile) {
        ScrollTrigger.defaults({ scroller: ".page-scroll" });
    }

    const logoTriangles = document.querySelector('#zainaty-triangles-spin');
    
    if (logoTriangles) {
        // Force GSAP to calculate the transform origin based on the group's bounding box
        gsap.set(logoTriangles, { transformOrigin: "50% 50%" });
        
        gsap.to(logoTriangles, {
            scrollTrigger: {
                trigger: 'main', // Critical: Use 'main' instead of 'body' when inside the .page-scroll custom scroller
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5
            },
            rotation: 360,
            ease: 'none'
        });
    }
});
```

### Critical Implementation Details
1. **Mobile Scroller Configuration:** Due to the site's responsive CSS, on devices under `1100px`, the `body` is set to `overflow: hidden` and scrolling occurs entirely within the `.page-scroll` wrapper. You **must** set `ScrollTrigger.defaults({ scroller: ".page-scroll" })` for mobile breakpoints; otherwise, the animations will refuse to trigger because the `window` itself never scrolls.
2. **Trigger Element:** Always use `trigger: 'main'` (or the specific scroll container) instead of `body`. The site relies on a custom 100dvh `.page-scroll` wrapper.
3. **Transform Origin:** SVG transforms can be unpredictable across browsers. Setting `gsap.set(..., { transformOrigin: "50% 50%" })` ensures the triangles rotate around their true center.
4. **Scrub:** A `scrub` value of `1.5` provides a smooth, slightly delayed rotational momentum that feels premium.
