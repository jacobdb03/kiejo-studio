import { gsap, ScrollTrigger, Flip } from "../dev-scriptFiles/gsapSetup";
import { colour } from "../dev-scriptFiles/styleSetup";

const transitionBox = document.createElement("div");

let pageLoadIn_Animation: boolean = true;
if (pageLoadIn_Animation) {
  // Create and inject the transition box immediately {
  document.documentElement.appendChild(transitionBox);
  gsap.set(transitionBox, {
    position: "fixed",
    width: "calc(200vw + 200vh)",
    height: "calc(200vw + 200vh)",
    zIndex: 20,
    borderRadius: "50%",
    backgroundColor: colour.kWhite,
    pointerEvents: "none",
    scale: 0,
  });

  if (sessionStorage.getItem("navigatedFromLink") === "true") {
    const x = sessionStorage.getItem("clickX") || "50%";
    const y = sessionStorage.getItem("clickY") || "0";

    // Start as full screen circle at click origin
    gsap.set(transitionBox, {
      left: x,
      top: y,
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      borderRadius: "50%",
      width: "calc(200vw + 200vh)",
      height: "calc(200vw + 200vh)",
    });

    // Shrink to a small circle at the navbar's vertical centre (top-10 = 2.5rem)
    gsap.to(transitionBox, {
      left: "50%",
      top: "6rem",
      scale: 0,
      duration: 1,
      ease: "expo.inOut",
      onComplete: () => {
        // Reset ALL properties so exit animation works cleanly next time
        gsap.set(transitionBox, {
          clearProps: "all",
          position: "fixed",
          width: "calc(200vw + 200vh)",
          height: "calc(200vw + 200vh)",
          zIndex: 20,
          borderRadius: "50%",
          backgroundColor: colour.kWhite,
          pointerEvents: "none",
          scale: 0,
        });
        sessionStorage.removeItem("navigatedFromLink");
        sessionStorage.removeItem("clickX");
        sessionStorage.removeItem("clickY");
      },
    });
  }
}

window.addEventListener("load", () => {
  let navbarTextIn_Animation: boolean = true;
  if (navbarTextIn_Animation) {
    const textTarget: HTMLElement[] = gsap.utils.toArray(".ani-textBump");

    textTarget.forEach((child: HTMLElement, i) => {
      gsap.from(child, {
        x: -20,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(0.2,0.18)",
        delay: (5 + i) * 0.15,
      });
    });
  }

  let pageLoadOut_Animation: boolean = true;
  if (pageLoadOut_Animation) {
    let linkTarget: HTMLLinkElement[] = gsap.utils.toArray(
      document.querySelectorAll("a"),
    );

    const pageTransitionExcluded = document.querySelectorAll(
      ".cus-pageTransitionExcluded",
    );

    linkTarget.forEach((item) => {
      item.addEventListener("click", (e: MouseEvent) => {
        if (item.classList.contains("cus-pageTransitionExcluded")) return;

        sessionStorage.setItem("clickX", String(e.clientX));
        sessionStorage.setItem("clickY", String(e.clientY));

        e.preventDefault();
        gsap.killTweensOf(transitionBox);
        gsap.set(transitionBox, { clearProps: "all" });

        // Position the circle at the click point
        gsap.set(transitionBox, {
          position: "fixed",
          width: "calc(200vw + 200vh)",
          height: "calc(200vw + 200vh)",
          zIndex: 20,
          borderRadius: "50%",
          backgroundColor: colour.kBlue,
          pointerEvents: "none",
          scale: 0,
          left: e.clientX,
          top: e.clientY,
          xPercent: -50,
          yPercent: -50,
        });

        gsap.to(transitionBox, {
          backgroundColor: colour.kWhite,
          scale: 1,
          duration: 1,
          ease: "expo.inOut",
          onComplete: () => {
            sessionStorage.setItem("navigatedFromLink", "true");
            window.location.href = item.href;
          },
        });
      });
    });
  }

  const hoverLinks: HTMLElement[] = gsap.utils.toArray(".ani-gsapHover");
  let currentFontWeight = gsap.getProperty(hoverLinks[0], "font-weight");

  let linkText_Hover: boolean = true;
  if (linkText_Hover) {
    console.log(currentFontWeight);

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
          fontWeight: currentFontWeight,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    });
  }

  let NavbarBox_Animations: boolean = true;
  if (NavbarBox_Animations) {
    const containerTarget = document.querySelector(
      ".ani-navContainer",
    ) as HTMLDivElement;
    const navTarget = document.querySelector(
      ".ani-navExpand",
    ) as HTMLDivElement;
    const titleTarget = document.querySelector(
      ".ani-navTitle",
    ) as HTMLDivElement;
    const logoTarget = document.querySelector(".ani-navLogo") as HTMLDivElement;
    const footerTarget: HTMLElement[] = gsap.utils.toArray(".ani-navLink");

    let NavbarBoxShrink_Animation: boolean = true;
    if (NavbarBoxShrink_Animation) {
      ScrollTrigger.create({
        trigger: "body",
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
          navTarget.classList.add("text-sm", "py-4", "px-8", "w-96");

          titleTarget.querySelector("a")?.classList.remove();
          titleTarget.querySelector("a")?.classList.add("flex-0");

          logoTarget.classList.remove("flex-0");
          logoTarget.classList.add();

          footerTarget[0].classList.remove("md:flex-4");
          footerTarget[0].classList.add("md:flex-6");

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
          navTarget.classList.remove("text-sm", "py-4", "px-8", "w-96");

          titleTarget.querySelector("a")?.classList.add();
          titleTarget.querySelector("a")?.classList.remove("flex-0");

          logoTarget.classList.add("flex-0");
          logoTarget.classList.remove();

          footerTarget[0].classList.add("md:flex-4");
          footerTarget[0].classList.remove("md:flex-6");

          Flip.from(shrunkState, {
            duration: 0.6,
            ease: "elastic.out(0.12,0.18)",
          });
        },
      });
    }

    let NavbarBoxFooter_Animation: boolean = true;
    if (NavbarBoxFooter_Animation) {
      const navLinkBarTarget = document.querySelector(
        ".cus-navLinkBar",
      ) as HTMLLinkElement;

      ScrollTrigger.create({
        trigger: "body",
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

          containerTarget.classList.add("mx-5", "bottom-5");
          containerTarget.classList.remove("mx-32", "top-10", "top-4");

          navTarget.classList.add(
            "flex-col",
            "w-full",
            "rounded-[2rem]",
            "flex-wrap",
          );
          navTarget.classList.remove(
            "rounded-[4rem]",
            "overflow-hidden",
            "text-sm",
            "text-lg",
          );

          titleTarget.classList.add("order-2", "justify-start", "min-w-full");
          titleTarget.classList.remove("order-1", "self-center", "flex-5");

          titleTarget
            .querySelector("a")
            ?.classList.add("h-full", "w-3/4", "object-cover", "mt-24", "mb-2");
          titleTarget.querySelector("a")?.classList.remove("flex-0");

          titleTarget
            .querySelector("a")
            ?.querySelector("img")
            ?.classList.remove("h-8", "h-6");

          logoTarget.classList.add("flex-0");
          logoTarget.classList.remove();

          navLinkBarTarget.classList.add("hidden");

          footerTarget[0].classList.add(
            "order-1",
            "self-start",
            "text-4xl",
            "px-8",
            "min-w-full",
          );
          footerTarget[0].classList.remove(
            "order-2",
            "self-center",
            "md:flex-3",
            "md:flex-6",
            "overflow-hidden",
          );

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

          containerTarget.classList.remove("mx-5", "bottom-5");
          containerTarget.classList.add("mx-32", "top-10", "top-4");

          navTarget.classList.remove(
            "flex-col",
            "w-full",
            "rounded-[2rem]",
            "flex-wrap",
          );
          navTarget.classList.add(
            "rounded-[4rem]",
            "overflow-hidden",
            "text-sm",
            "text-lg",
          );

          titleTarget.classList.remove(
            "order-2",
            "justify-start",
            "min-w-full",
          );
          titleTarget.classList.add("order-1", "self-center", "flex-5");

          titleTarget
            .querySelector("a")
            ?.classList.remove(
              "h-full",
              "w-3/4",
              "object-cover",
              "mt-24",
              "mb-2",
            );
          titleTarget.querySelector("a")?.classList.add("flex-0");

          titleTarget
            .querySelector("a")
            ?.querySelector("img")
            ?.classList.add("h-8", "h-6");

          logoTarget.classList.remove("flex-0");
          logoTarget.classList.add();

          navLinkBarTarget.classList.remove("hidden");
          navLinkBarTarget.classList.add();

          footerTarget[0].classList.remove(
            "order-1",
            "self-start",
            "text-4xl",
            "px-8",
            "min-w-full",
          );
          footerTarget[0].classList.add(
            "order-2",
            "self-center",
            "md:flex-3",
            "md:flex-6",
            "overflow-hidden",
          );

          Flip.from(footerState, {
            duration: 0.7,
            ease: "elastic.out(0.12, 0.18)",
          });
        },
      });
    }
  }
});
