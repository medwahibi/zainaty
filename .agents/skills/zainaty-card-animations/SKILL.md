---
name: zainaty-card-animations
description: Outlines the generic fallback GSAP scroll animation for standard cards (products, articles, generic content cards).
---

# Zainaty Card Animations

This skill describes the generic, elegant fade-up animation applied to standard cards on the Zainaty site as the user scrolls them into view.

## Target Elements

In `custom-animations.js`, the card animation is automatically applied to elements matching these selectors:
- `.card`
- `.product-card-wrapper`
- `.article-card`

If you are building a new standard card, apply one of these classes to automatically inherit the entrance animation.

## GSAP Logic

The animation triggers when the top of the card hits `85%` of the viewport height (meaning it has scrolled 15% up from the bottom of the screen).

```javascript
gsap.from(card, {
    scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse' // Animates out if scrolled back up
    },
    y: 50, // Starts 50px lower
    opacity: 0, // Starts transparent
    duration: 0.8,
    ease: 'power2.out'
});
```

This creates a smooth, subtle upward reveal that matches the premium feel of the typography animations.
