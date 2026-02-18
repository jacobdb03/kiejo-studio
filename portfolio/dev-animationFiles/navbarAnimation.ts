import { gsap } from "../dev-scriptFiles/gsapSetup";
import { ScrollTrigger } from "../dev-scriptFiles/gsapSetup";
import { colour } from "../dev-scriptFiles/styleSetup";

// Check content has loaded on the page
document.addEventListener("DOMContentLoaded", (event: Event) => {
  // Declare variables from navbar.html to be animated
  const textTarget: HTMLElement[] = gsap.utils.toArray(".ani-textBump");
  const footerTarget: HTMLElement[] = gsap.utils.toArray(".ani-navLink");
  const navTarget = ".ani-navExpand";
  const titleTarget = ".ani-navTitle";
  const hoverLinks = document.querySelectorAll(".ani-gsapHover");

  // TEXT INTRO ANIMATION
  textTarget.forEach((child: HTMLElement, i) => {
    gsap.from(child, {
      x: -20,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(0.2,0.18)",
      delay: (2.5 + i) * 0.15,
    });
  });

  // HOVER LINKS ANIMATIONS
  hoverLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        fontWeight: 900,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        fontWeight: 700,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  });

  let watchMedia = gsap.matchMedia();

  // TITLE IMAGE TO FOOTER ANIMATIONS
  watchMedia.add("(min-width: 48rem)", () => {
    gsap.to(titleTarget, {
      duration: 0.2,
      ease: "elastic.out(0.2,0.18)",
      scrollTrigger: {
        trigger: "body",
        start: "98% bottom",
        end: "100% bottom",
        toggleActions: "play none reverse none",
      },
    });
  });

  // TEXT LINKS TO FOOTER ANIMATIONS
  watchMedia.add("(min-width: 48rem)", () => {
    footerTarget.forEach((child: HTMLElement, i) => {
      gsap.to(child, {
        color: colour.klBlue,
        delay: 0.2,
        duration: 0.6,
        ease: "elastic.out(0.2,0.18)",
        scrollTrigger: {
          trigger: "body",
          start: "98% bottom",
          end: "100% bottom",
          toggleActions: "play none reverse none",
        },
      });
    });
  });

  // NAVBAR BOX ANIMATIONS
  watchMedia.add("(min-width: 64rem)", () => {
    // NAV ANIMATION 01 — 10% down → shrink to 60vw (reverses back to 100% at top)
    ScrollTrigger.create({
      trigger: "body",
      start: "10% top",
      end: "98% bottom",
      onEnter: () =>
        gsap.to(navTarget, {
          width: "60vw",
          height: "8vh",
          duration: 0.6,
          ease: "elastic.inOut(1,1)",
        }),
      onLeaveBack: () =>
        gsap.to(navTarget, {
          width: "auto",
          height: "auto",
          duration: 0.6,
          ease: "elastic.inOut(1,1)",
        }),
    });
  });

  watchMedia.add("(min-width: 48rem)", () => {
    // NAV ANIMATION 02 — Bottom 2% → expand to footer (reverses back to 60vw)
    ScrollTrigger.create({
      trigger: "body",
      start: "98% bottom",
      end: "100% bottom",
      onEnter: () =>
        gsap.to(navTarget, {
          width: "auto",
          height: "100%",
          duration: 0.6,
          ease: "elastic.inOut(1,1)",
        }),
      onLeaveBack: () => {
        if (window.matchMedia("(max-width: 64rem)").matches) {
          gsap.to(navTarget, {
            width: "auto",
            height: "auto",
            duration: 0.6,
            ease: "elastic.inOut(1,1)",
          });
        } else {
          gsap.to(navTarget, {
            width: "60vw",
            height: "8vh",
            duration: 0.6,
            ease: "elastic.inOut(1,1)",
          });
        }
      },
    });
  });
});
