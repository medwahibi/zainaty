document.addEventListener('DOMContentLoaded', () => {
    // Ensure GSAP and SplitType are available
    if (typeof gsap === 'undefined' || typeof SplitType === 'undefined') {
        console.warn('GSAP or SplitType not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // 0. Preloader Animation
    const preloader = document.getElementById('zainaty-preloader');
    if (preloader) {
        const paths = preloader.querySelectorAll('.preloader-leaf-path');
        const preloaderTl = gsap.timeline({
            onComplete: () => {
                preloader.style.display = 'none';
                ScrollTrigger.refresh();
            }
        });

        paths.forEach(path => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            preloaderTl.to(path, {
                strokeDashoffset: 0,
                duration: 2, // 2-second drawing animation
                ease: "power2.inOut"
            }, 0); // Start all paths at the same time
        });

        // Add fill color slightly before the drawing finishes
        preloaderTl.add(() => {
            preloader.classList.add('is-filled');
        }, "-=0.5");

        const logoWrapper = preloader.querySelector('.preloader-logo-wrapper');

        // Fast rotation
        preloaderTl.to(logoWrapper, {
            rotation: 360,
            duration: 0.6,
            ease: "power2.inOut"
        }, "+=0.2");

        // Logo zoom out (scale to 0)
        preloaderTl.to(logoWrapper, {
            scale: 0,
            duration: 0.6,
            ease: "back.in(1.5)"
        });

        // Background slides up (no fading)
        preloaderTl.to(preloader, {
            yPercent: -100,
            duration: 0.8,
            ease: "power3.inOut"
        }, "-=0.2");
    }

    // CRITICAL: On mobile (<=1100px), CSS sets body to overflow:hidden and .page-scroll to overflow-y:auto
    // Therefore, ScrollTrigger must listen to .page-scroll instead of the window to detect scrolling.
    const isMobile = window.innerWidth <= 1100;
    if (isMobile) {
        ScrollTrigger.defaults({ scroller: ".page-scroll" });
    }

    // 1. Text Animations for all headings
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .hero__title, .hero__text, .section-title, .title, .subtitle');

    textElements.forEach(element => {
        // Skip elements that are inside header to avoid breaking navigation
        if (element.closest('header') || element.closest('.header') || element.closest('nav')) return;

        // Prevent SplitType from running multiple times on same element
        if (element.classList.contains('split-type-applied')) return;

        const splitText = new SplitType(element, { types: 'lines, words, chars' });
        element.classList.add('split-type-applied');

        // Simple and elegant reveal
        gsap.from(splitText.chars, {
            scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            rotationX: -90,
            transformOrigin: '0% 50% -50',
            stagger: 0.02,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // 2. Parallax Effects for images
    const parallaxImages = document.querySelectorAll('.image-with-text__image img, .hero img, .banner__image img, img.parallax');
    parallaxImages.forEach(img => {
        // Wrap image if not already wrapped
        if (!img.parentElement.classList.contains('parallax-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('parallax-wrapper');
            wrapper.style.overflow = 'hidden';
            wrapper.style.height = '100%';
            wrapper.style.width = '100%';
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);

            // Make image larger than wrapper to allow parallax
            img.style.height = '120%';
            img.style.objectFit = 'cover';
        }

        gsap.to(img, {
            scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            yPercent: -20,
            ease: 'none'
        });
    });

    // 3. Logo Animation (Triangles)
    const logoTriangles = document.querySelector('#zainaty-triangles-spin');
    if (logoTriangles) {
        // SVG origins can be tricky, let GSAP calculate from bounding box
        gsap.set(logoTriangles, { transformOrigin: "50% 50%" });
        gsap.to(logoTriangles, {
            scrollTrigger: {
                trigger: 'main', // use 'main' instead of 'body' for mobile compatibility (.page-scroll)
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5
            },
            rotation: 360,
            ease: 'none'
        });
    }

    // 4. Stacked Cards Animation (.er-step)
    const steps = gsap.utils.toArray('.er-step');
    const bookendSection = document.querySelector('.bookend-section');

    // Check if we have stacked cards on this page
    if (steps.length > 0) {
        steps.forEach((step, index) => {
            // We want cards to stack just below the header (e.g. 120px from top)
            const isLast = index === steps.length - 1;

            ScrollTrigger.create({
                trigger: step,
                start: "top 120px",
                // Unpin when the bookend section reaches the pinned position,
                // completely covering the stacked cards.
                endTrigger: bookendSection || ".er-steps",
                end: bookendSection ? "top 120px" : "bottom 120px",
                pin: true,
                pinSpacing: false,
                scrub: true
            });

            // Leaf Drawing Animation
            const leafPaths = step.querySelectorAll('.er-leaf-svg path');
            leafPaths.forEach(path => {
                const length = path.getTotalLength();
                // Setup the stroke dash array to the length of the path
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

            // Slight scale down and fade out of the card as the next one (or bookend) covers it
            const nextElement = isLast ? bookendSection : steps[index + 1];
            if (nextElement) {
                gsap.to(step, {
                    scale: 0.95,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: nextElement,
                        start: "top bottom",
                        end: "top top",
                        scrub: true
                    }
                });
            }
        });
    }

    // Generic fallback for other cards like products/articles
    const otherCards = document.querySelectorAll('.card, .product-card-wrapper, .article-card, .moroccan-card');
    otherCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // 5. Mobile Menu (Hamburger) Implementation
    // Clone the burger button to remove legacy app.js event listeners that crash
    const oldBurger = document.querySelector('.header__burger');
    if (oldBurger) {
        const newBurger = oldBurger.cloneNode(true);
        oldBurger.parentNode.replaceChild(newBurger, oldBurger);

        const sidebarMenu = document.querySelector('.sidebar-menu');
        const headerElement = document.querySelector('.header');

        // Prepare GSAP Timeline for opening the menu
        const menuTl = gsap.timeline({ paused: true });

        menuTl.to(sidebarMenu, {
            opacity: 1,
            pointerEvents: 'all',
            duration: 0.5,
            ease: "power2.inOut"
        })
            .fromTo('.sidebar-menu__link span',
                { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
                "-=0.25"
            )
            .fromTo('.sidebar-menu__footer-action span',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
                "-=0.5"
            );

        let menuOpen = false;

        newBurger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (menuOpen) {
                // CLOSE
                menuOpen = false;
                headerElement.classList.remove('header-active');

                // Animate out manually (don't rely on reverse with fromTo)
                gsap.to('.sidebar-menu__link span', {
                    y: "-110%", opacity: 0, duration: 0.4, stagger: 0.05, ease: "power2.in"
                });
                gsap.to('.sidebar-menu__footer-action span', {
                    y: -30, opacity: 0, duration: 0.3, ease: "power2.in"
                });
                gsap.to(sidebarMenu, {
                    opacity: 0, pointerEvents: 'none', duration: 0.4, delay: 0.2,
                    ease: "power2.inOut",
                    onComplete: () => {
                        sidebarMenu.classList.remove('is-open');
                        sidebarMenu.setAttribute('aria-hidden', 'true');
                    }
                });
            } else {
                // OPEN
                menuOpen = true;
                sidebarMenu.classList.add('is-open');
                sidebarMenu.setAttribute('aria-hidden', 'false');
                headerElement.classList.add('header-active');
                menuTl.invalidate().restart();
            }
        });

        // Close menu when clicking a nav link
        sidebarMenu.querySelectorAll('.sidebar-menu__link').forEach(link => {
            link.addEventListener('click', () => {
                if (menuOpen) {
                    newBurger.click();
                }
            });
        });
    }

    // 6. Custom Cursor Implementation
    const cursorCircle = document.getElementById('zainaty-cursor');
    if (cursorCircle) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorCircle.style.left = `${e.clientX}px`;
                cursorCircle.style.top = `${e.clientY}px`;
            });
        });
    }
});
