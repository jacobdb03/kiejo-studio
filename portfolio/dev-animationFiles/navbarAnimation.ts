import { gsap } from "./gsapSetup";
import { ScrollTrigger } from "./gsapSetup";
import { colour } from "../dev-scriptFiles/styleSetup";

// Check content has loaded on the page
document.addEventListener("DOMContentLoaded", (event: Event) => {
  // Declare variables from navbar.html to be animated
  const textTarget: HTMLElement[] = gsap.utils.toArray(".ani-textBump");
  const footerTarget: HTMLElement[] = gsap.utils.toArray(".ani-navLink");
  const navTarget = ".ani-navExpand";
  const titleTarget = ".ani-navTitle";

  gsap.set(titleTarget, {
    fontSize: "inherit",
    fontWeight: "inherit",
  });

  gsap.set(footerTarget, {
    fontSize: "inherit",
    color: "inherit",
    height: "inherit",
    width: "inherit",
    padding: "inherit",
  });

  gsap.set(navTarget, {
    scaleY: 1,
    scaleX: 1,
    borderRadius: "auto",
    transformOrigin: "center",
    height: "inherit",
    width: "auto",
  });

  // TEXT INTRO ANIMATION
  textTarget.forEach((child: HTMLElement, i) =>
    // Find each child in the array
    gsap.from(child, {
      x: -20,
      opacity: 0,
      ease: "elastic.out(0.5,0.3)",
      delay: (0.5 + i) * 0.1,
    }),
  );

  // TEXT TITLE TO FOOTER ANIMATIONS
  if (ScrollTrigger.isTouch === 0) {
    gsap.to(titleTarget, {
      scrollTrigger: {
        trigger: "body",
        start: "98% bottom",
        end: "100% bottom",

        onEnter: () => {
          gsap.to(titleTarget, {
            fontSize: "10rem",
            fontWeight: 900,
            padding: "1.5rem",

            delay: 0.25,
            ease: "elastic.out(0.2,0.18)",
          });
        },
        onLeaveBack: () => {
          gsap.fromTo(
            titleTarget,
            {
              fontSize: "10rem",
              fontWeight: 900,
              padding: "1.5rem",
            },
            {
              fontSize: "inherit",
              padding: 0,

              duration: 0.6,
              delay: 0.25,
              ease: "elastic.out(0.2,0.18)",
            },
          );
        },
      },
    });
  }

  // TEXT LINKS TO FOOTER ANIMATIONS
  if (ScrollTrigger.isTouch === 0) {
    footerTarget.forEach((child: HTMLElement, i) => {
      gsap.to(child, {
        scrollTrigger: {
          trigger: "body",
          start: "98% bottom",
          end: "100% bottom",

          onEnter: () => {
            gsap.to(child, {
              color: colour.klBlue,
              fontSize: "3rem",
              padding: "1.5rem",
              ease: "elastic.out(0.2,0.18)",
              delay: 0.25 + i * 0.05,
            });
          },
          onLeaveBack: () => {
            gsap.fromTo(
              child,
              {
                color: colour.klBlue,
                fontSize: "3rem",
                padding: "1.5rem",
              },
              {
                color: colour.kWhite,
                fontSize: "inherit",
                padding: 0,

                duration: 0.6,
                delay: 0.25,
                ease: "elastic.out(0.2,0.18)",
              },
            );
          },
        },
      });
    });
  }

  // NAVBAR BOX ANIMATIONS
  if (ScrollTrigger.isTouch === 0) {
    // NAV ANIMATION 01 — At 10% down the page (to the end) -> shrink nav width
    gsap.to(navTarget, {
      scrollTrigger: {
        trigger: "body",
        start: "10% top",
        end: "98% bottom",

        onEnter: () => {
          gsap.to(navTarget, {
            width: "60vw",
            duration: 0.6,
            ease: "elastic.inOut(1,1)",
          });
        },
        onLeaveBack: () => {
          gsap.fromTo(
            navTarget,
            { width: "60vw" },
            {
              width: "auto",
              duration: 0.6,
              ease: "elastic.inOut(1,1)",
            },
          );
        },
      },
    });

    // NAV ANIMATION 02 — At Bopttom of page -> Animate to footer
    gsap.to(navTarget, {
      scrollTrigger: {
        trigger: "body",
        start: "98% bottom",
        end: "100% bottom ",

        onEnter: () => {
          gsap.to(navTarget, {
            y: "1vh",
            height: "90vh",
            width: "auto",
            borderRadius: 30,
            duration: 0.6,
            ease: "elastic.inOut(1,1)",
          });
        },

        onLeaveBack: () => {
          gsap.fromTo(
            navTarget,
            { y: "1vh", height: "90vh", borderRadius: 30 },
            {
              y: 0,
              width: "60vw",
              height: 0,
              borderRadius: 100,
              duration: 0.6,

              ease: "elastic.inOut(0.2, 0.18)",
            },
          );
        },
      },
    });
  }
});
