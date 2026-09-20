---
name: zainaty-text-animations
description: Defines the standard GSAP + SplitType text reveal animation used for all headings and major text blocks on the Zainaty site.
---

# Zainaty Text Animations

This skill outlines how to apply the signature text reveal animation to headings and text elements across the site. The animation uses `SplitType` to break text into characters and `GSAP ScrollTrigger` to animate them in sequentially as the user scrolls.

## The Standard Reveal Animation

By default, this animation is automatically applied to standard heading tags (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) and specific classes (`.hero__title`, `.hero__text`, `.section-title`, `.title`, `.subtitle`) via the `custom-animations.js` script.

### JavaScript Implementation

If you need to manually apply this animation to a new, custom element that isn't caught by the global selector, use the following GSAP and SplitType logic:

```javascript
// Ensure this runs after DOMContentLoaded and GSAP/SplitType are registered
const element = document.querySelector('.your-custom-text-class');

// 1. Prevent duplicate splits
if (!element.classList.contains('split-type-applied')) {
    
    // 2. Split the text into characters
    const splitText = new SplitType(element, { types: 'lines, words, chars' });
    element.classList.add('split-type-applied');
    
    // 3. Apply the GSAP ScrollTrigger animation
    gsap.from(splitText.chars, {
        scrollTrigger: {
            trigger: element,
            start: 'top 90%', // Trigger when the top of the element hits 90% of the viewport height
            toggleActions: 'play none none reverse' // Reverses when scrolling back up
        },
        opacity: 0,
        y: 20, // Slight upward movement
        rotationX: -90, // 3D flip effect
        stagger: 0.02, // Fast, elegant stagger between characters
        duration: 0.8,
        ease: 'power3.out'
    });
}
```

## Important Rules

1. **Header Exclusions:** Never apply this animation to text inside the navigation bar (`header`, `.header`, `nav`). It will break the inline-flex layouts and make the navigation jumpy.
2. **Preventing Double Splits:** Always check for and add a class like `.split-type-applied` before running `new SplitType()`. Running SplitType twice on the same element will destroy the DOM structure.
3. **CSS Requirements:** The `rotationX: -90` animation implies a 3D transform. For the best visual effect, ensure the parent container (or the `body`) has `perspective` applied if the 3D effect feels flat, though GSAP handles the local transform well by default.
