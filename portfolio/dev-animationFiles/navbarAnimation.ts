import { gsap, ScrollTrigger, Flip } from "../dev-scriptFiles/gsapSetup";
import { colour } from "../dev-scriptFiles/styleSetup";

// Check content has loaded on the page
document.addEventListener("DOMContentLoaded", (event: Event) => {
  // Declare variables from navbar.html to be animated
  const textTarget: HTMLElement[] = gsap.utils.toArray(".ani-textBump");
  const footerTarget: HTMLElement[] = gsap.utils.toArray(".ani-navLink");
  const containerTarget = document.querySelector(
    ".ani-navContainer",
  ) as HTMLDivElement;
  const navTarget = document.querySelector(".ani-navExpand") as HTMLDivElement;
  const titleTarget = document.querySelector(".ani-navTitle") as HTMLDivElement;
  const logoTarget = document.querySelector(".ani-navLogo") as HTMLDivElement;
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

  // let watchMedia = gsap.matchMedia();

  // // TITLE IMAGE TO FOOTER ANIMATIONS
  // watchMedia.add("(min-width: 48rem)", () => {
  //   gsap.to(titleTarget, {
  //     duration: 0.2,
  //     ease: "elastic.out(0.2,0.18)",
  //     scrollTrigger: {
  //       trigger: "body",
  //       start: "98% bottom",
  //       end: "100% bottom",
  //       toggleActions: "play none reverse none",
  //     },
  //   });
  // });

  // // NAVBAR BOX ANIMATIONS
  // gsap.from(navTarget, {
  //   width: 0,

  //   ease: "elastic.out(0.2, 0.18)",
  // });

  // NAV ANIMATION 01 — 10% down → shrink to 60vw (reverses back to 100% at top)
  ScrollTrigger.create({
    trigger: "body",
    scroller: "#smooth-wrapper",
    start: "10% top",
    end: "98% bottom",

    onEnter: () => {
      const shrunkState = Flip.getState([
        containerTarget,
        navTarget,
        titleTarget,
        titleTarget.querySelector("a"),
        logoTarget,
        footerTarget[0],
      ]);

      containerTarget.classList.remove("top-10");
      containerTarget.classList.add("top-4");

      navTarget.classList.remove("text-xl", "py-8", "px-16");
      navTarget.classList.add("text-xs", "py-4", "px-8", "w-96");

      titleTarget.classList.add("flex-3");
      titleTarget.classList.remove("flex-5");

      titleTarget.querySelector("a")?.classList.remove();
      titleTarget.querySelector("a")?.classList.add("flex-0");

      logoTarget.classList.remove("flex-0");
      logoTarget.classList.add();

      footerTarget[0].classList.remove("md:flex-3");
      footerTarget[0].classList.add("md:flex-5");

      Flip.from(shrunkState, {
        duration: 0.6,
        ease: "elastic.out(0.12,0.18)",
      });
    },

    onLeaveBack: () => {
      const shrunkState = Flip.getState([
        containerTarget,
        navTarget,
        titleTarget,
        titleTarget.querySelector("a"),
        logoTarget,
        footerTarget[0],
      ]);

      containerTarget.classList.add("top-10");
      containerTarget.classList.remove("top-4");

      navTarget.classList.add("text-xl", "py-8", "px-16");
      navTarget.classList.remove("text-xs", "py-4", "px-8", "w-96");

      titleTarget.classList.add("flex-5");
      titleTarget.classList.remove("flex-3");

      titleTarget.querySelector("a")?.classList.add();
      titleTarget.querySelector("a")?.classList.remove("flex-0");

      logoTarget.classList.add("flex-0");
      logoTarget.classList.remove();

      footerTarget[0].classList.add("md:flex-3");
      footerTarget[0].classList.remove("md:flex-5");

      Flip.from(shrunkState, {
        duration: 0.6,
        ease: "elastic.out(0.12,0.18)",
      });
    },
  });

  // NAV ANIMATION 02 — Bottom 2% → expand to footer (reverses back to 60vw)
  ScrollTrigger.create({
    trigger: "body",
    scroller: "#smooth-wrapper",
    start: "98% bottom",
    end: "100% bottom",

    onEnter: () => {
      const footerState = Flip.getState([
        containerTarget,
        navTarget,
        titleTarget,
        titleTarget.querySelector("a"),
        logoTarget,
        footerTarget[0],
      ]);

      containerTarget.classList.add();
      containerTarget.classList.remove();

      navTarget.classList.add();
      navTarget.classList.remove();

      titleTarget.classList.add();
      titleTarget.classList.remove();

      titleTarget.querySelector("a")?.classList.add();
      titleTarget.querySelector("a")?.classList.remove();

      logoTarget.classList.add();
      logoTarget.classList.remove();

      footerTarget[0].classList.add();
      footerTarget[0].classList.remove();

      Flip.from(footerState, {
        duration: 0.7,
        ease: "elastic.out(0.12,0.18)",
      });
    },

    onLeaveBack: () => {
      const footerState = Flip.getState([
        containerTarget,
        navTarget,
        titleTarget,
        titleTarget.querySelector("a"),
        logoTarget,
        footerTarget[0],
      ]);

      Flip.from(footerState, {
        duration: 0.7,
        ease: "elastic.out(0.12, 0.18)",
      });
    },
  });
});

//   const targets = [
//     titleTarget,
//     navTarget,
//     titleTargetImg,
//     footerTarget,
//     titleTarget,
//   ];

//   if (
//     window.location.pathname === "/index.html" ||
//     window.location.pathname === "/"
//   ) {
//     targets.forEach((target) => {
//       gsap.to(target, {
//         opacity: 1,
//         duration: 1,
//         scrollTrigger: {
//           trigger: "body",
//           start: "top 100vh ",
//           end: "top 200vh ",
//           onEnter: () => {
//             console.log("true");
//           },

//           onLeave: () => {
//             (console.log("false"), homeScreenAnimations());
//           },
//         },
//       });
//     });
//   } else {
//     console.log("other");
//     homeScreenAnimations();
//   }
