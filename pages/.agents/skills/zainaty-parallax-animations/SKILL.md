---
name: zainaty-parallax-animations
description: Outlines the GSAP parallax logic used for images across the Zainaty site to create a premium depth effect on scroll.
---

# Zainaty Image Parallax Animations

This skill describes how parallax scrolling is applied to images across the site. The parallax effect provides a premium sense of depth by moving the image vertically at a slightly different speed than the page scroll.

## Automatic Parallax Target Elements

In `custom-animations.js`, the parallax effect is automatically applied to images matching these selectors:
- `.image-with-text__image img`
- `.hero img`
- `.banner__image img`
- `img.parallax`

If you are building a new component and want parallax applied to an image, simply add the `.parallax` class to the `<img>` tag.

## How It Works (The Logic)

The script automatically restructures the DOM around the target image to enable the parallax effect without breaking layout:

1. **Wrapper Creation:** It wraps the `<img>` in a `div.parallax-wrapper`.
2. **Wrapper Styling:** The wrapper is set to `overflow: hidden`, `height: 100%`, and `width: 100%`. This restricts the visible area.
3. **Image Scaling:** The `<img>` is set to `height: 120%` and `object-fit: cover`. This makes the image 20% taller than its container, giving it room to scroll.
4. **GSAP ScrollTrigger:** It uses GSAP to move the image `yPercent: -20` (upwards) as the user scrolls past the wrapper (`scrub: 1`).

### Important Note for Mobile
Due to the custom `.page-scroll` container used for mobile devices (`max-width: 1100px`), ensure `ScrollTrigger.defaults({ scroller: ".page-scroll" })` is active for mobile breakpoints to ensure the scroll position is tracked correctly.
