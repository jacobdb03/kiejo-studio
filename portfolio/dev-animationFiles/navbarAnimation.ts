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
  const title1Target = ".ani-navTitle1";
  const title2Target = ".ani-navTitle2";

  // TEXT INTRO ANIMATION
  textTarget.forEach((child: HTMLElement, i) =>
    // Find each child in the array
    gsap.from(child, {
      x: -20,
      opacity: 0,
      ease: "elastic.out(0.2,0.18)",
      delay: (0.5 + i) * 0.15,
    }),
  );

  // TITLE IMAGE TO FOOTER ANIMATIONS
  if (ScrollTrigger.isTouch === 0) {
    gsap.to([titleTarget, title1Target, title2Target], {
      scrollTrigger: {
        trigger: "body",
        start: "98% bottom",
        end: "100% bottom",

        onEnter: () => {
          gsap.to(titleTarget, {
            height: "38vh",
            alignSelf: "end",

            duration: 0.4,
            delay: 0.3,
            ease: "elastic.out(0.2,0.18)",
          });
          gsap.to(title1Target, {
            height: 0,
            flexShrink: 0,

            duration: 0.3,
            delay: 0.25,
            ease: "elastic.out(0.2,0.18)",
          });
          gsap.to(title2Target, {
            height: "40vh",
            alignSelf: "start",
            flexShrink: 1,

            duration: 0.6,
            delay: 0.2,
            ease: "elastic.out(0.12,0.18)",
          });
        },
        onLeaveBack: () => {
          gsap.fromTo(
            titleTarget,
            { height: "38vh", alignSelf: "end" },
            {
              height: "2rem",
              alignSelf: "center",

              duration: 0.4,
              delay: 0.3,
              ease: "elastic.out(0.12,0.18)",
            },
          );
          gsap.fromTo(
            title1Target,
            { height: 0, flexShrink: 0 },
            {
              height: "100%",
              flexShrink: 1,

              duration: 0.3,
              delay: 0.25,
              ease: "elastic.out(0.05,0.18)",
            },
          );
          gsap.fromTo(
            title2Target,
            { height: "40vh", alignSelf: "end", flexShrink: 1 },
            {
              height: 0,
              alignSelf: "center",
              flexShrink: 0,

              duration: 0.6,
              delay: 0.2,
              ease: "elastic.out(0.12,0.18)",
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
              alignSelf: "end",
              fontSize: "2rem",
              justifySelf: "start",
              flexWrap: "wrap",

              ease: "elastic.out(0.2,0.18)",
              delay: 0.25 + i * 0.05,
            });
          },
          onLeaveBack: () => {
            gsap.fromTo(
              child,
              {
                alignSelf: "end",
                color: colour.klBlue,
                fontSize: "3rem",
                padding: "1.5rem",
              },
              {
                color: colour.kWhite,
                fontSize: "inherit",
                alignSelf: "center",
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
            width: "auto",
            height: "100%",

            borderRadius: 30,
            duration: 0.6,
            ease: "elastic.inOut(1, 1)",
          });
        },

        onLeaveBack: () => {
          gsap.fromTo(
            navTarget,
            { borderRadius: 30, height: "95vh" },
            {
              width: "60vw",
              borderRadius: 100,
              height: 0,

              duration: 0.6,
              ease: "elastic.inOut(1, 1)",
            },
          );
        },
      },
    });
  }
});
