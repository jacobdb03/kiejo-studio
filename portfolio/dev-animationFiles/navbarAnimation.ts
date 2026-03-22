import { gsap, ScrollTrigger, Flip } from "../dev-scriptFiles/gsapSetup";
import { colour } from "../dev-scriptFiles/styleSetup";

let mouseFollows: boolean = true;
let mousePointer = document.createElement("div");

window.addEventListener("load", () => {
  let backgroundDetector: boolean = true;
  if (backgroundDetector) {
    const logoWrap = document.querySelector<HTMLElement>(".cus-logoWrap");
    const logoDefault =
      logoWrap?.querySelector<HTMLImageElement>(".cus-logoDefault");
    const logoHover =
      logoWrap?.querySelector<HTMLImageElement>(".cus-logoHoverImg");

    // the hidden black versions you added to navbar.html
    const logoDefaultBlack = document.querySelector<HTMLImageElement>(
      ".cus-logoDefault-black",
    );
    const logoSurprisedBlack = document.querySelector<HTMLImageElement>(
      ".cus-logoHover-black",
    );

    const logoDefaultWhiteSrc = logoDefault?.src ?? "";
    const logoSurprisedWhiteSrc = logoHover?.src ?? "";

    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const theme = section.getAttribute("data-nav") ?? "light";
      if (theme === "light") return; // only create triggers for dark sections

      ScrollTrigger.create({
        trigger: section,
        start: "top 10%",
        end: "bottom 10%",

        onEnter: () => {
          gsap.to(".ani-navCont a", { color: colour.kBlue, duration: 0.3 });
          if (logoDefault)
            logoDefault.src = logoDefaultBlack?.src ?? logoDefaultWhiteSrc;
          if (logoHover)
            logoHover.src = logoSurprisedBlack?.src ?? logoSurprisedWhiteSrc;
        },
        onLeaveBack: () => {
          gsap.to(".ani-navCont a", { color: colour.kWhite, duration: 0.3 });
          if (logoDefault) logoDefault.src = logoDefaultWhiteSrc;
          if (logoHover) logoHover.src = logoSurprisedWhiteSrc;
        },
        onLeave: () => {
          gsap.to(".ani-navCont a", { color: colour.kWhite, duration: 0.3 });
          if (logoDefault) logoDefault.src = logoDefaultWhiteSrc;
          if (logoHover) logoHover.src = logoSurprisedWhiteSrc;
        },
        onEnterBack: () => {
          gsap.to(".ani-navCont a", { color: colour.kBlue, duration: 0.3 });
          if (logoDefault)
            logoDefault.src = logoDefaultBlack?.src ?? logoDefaultWhiteSrc;
          if (logoHover)
            logoHover.src = logoSurprisedBlack?.src ?? logoSurprisedWhiteSrc;
        },
      });
    });
  }

  let mousePointerLoop: boolean = false;
  if (mousePointerLoop) {
    document.body.appendChild(mousePointer);

    gsap.set(mousePointer, {
      position: "fixed",
      x: "50vw",
      y: "50vh",
      width: 20,
      height: 20,
      zIndex: 11,
      opacity: 1,
      borderRadius: "40vw",
      backgroundColor: colour.kWhite,
    });

    window.addEventListener("mousemove", (e) => {
      if (!mouseFollows) return; // add this check
      gsap.to(mousePointer, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });
    });
  }

  let mouseLogo_Animation: boolean = true;
  if (mouseLogo_Animation) {
    const logoWrap = document.querySelector<HTMLElement>(".cus-logoWrap");
    if (!logoWrap) return;

    const logoDefault = logoWrap.querySelector<HTMLElement>(".cus-logoDefault");
    const logoHover = logoWrap.querySelector<HTMLElement>(".cus-logoHoverImg");

    logoWrap.addEventListener("mouseenter", () => {
      gsap.killTweensOf([logoDefault, logoHover]);
      gsap.to(logoDefault, { scale: 0.7, opacity: 0, duration: 0.2 });
      gsap.to(logoHover, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(2)",
      });
    });

    logoWrap.addEventListener("mouseleave", () => {
      gsap.killTweensOf([logoDefault, logoHover]);
      gsap.to(logoHover, { scale: 0.7, opacity: 0, duration: 0.2 });
      gsap.to(logoDefault, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(2)",
      });
    });
  }

  let navbarTextIn_Animation: boolean = true;
  if (navbarTextIn_Animation) {
    const navLinks = document.querySelectorAll<HTMLElement>(
      ".ani-navBox span a:not(.hidden)",
    );
    Array.from(navLinks)
      .reverse()
      .forEach((child, i) => {
        gsap.from(child, {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "elastic.out",
          delay: 1.2 - i * 0.05,
          onComplete:
            i === 0
              ? () => {
                  navLinks.forEach((link) => {
                    if (link.parentElement)
                      link.parentElement.style.overflow = "visible";
                  });
                }
              : undefined,
        });
      });
  }

  let linkText_Hover: boolean = true;
  if (linkText_Hover) {
    const navLinks = document.querySelectorAll<HTMLElement>(
      "a:not(.cus-noHover), .cus-forceHover",
    );

    navLinks.forEach((link) => {
      gsap.set(link, { display: "inline-block" });
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          scale: Math.min(1.2, 1 + 8 / link.getBoundingClientRect().width),
          duration: 0.3,
          ease: "back.out(2)",
        });
      });
      link.addEventListener("mouseleave", () =>
        gsap.to(link, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(2)",
        }),
      );
    });
  }

  let NavbarBox_Animations: boolean = true;
  if (NavbarBox_Animations) {
    const nav = document.querySelector(".ani-navBox") as HTMLDivElement;
    const navChildren = nav.querySelectorAll<HTMLElement>(":scope > div");
    const leftChildren = navChildren[0];
    const centreChildren = navChildren[1];
    const rightChildren = navChildren[2];

    let NavbarBoxShrink_Animation: boolean = true;
    if (NavbarBoxShrink_Animation) {
      ScrollTrigger.create({
        trigger: "body",
        start: () => `top+=${window.innerHeight * 0.9}px`,
        end: "100% bottom",

        onEnter: () => {
          const shrunkState = Flip.getState(
            ".ani-navCont, .ani-navBox, .ani-navBox > div",
          );

          nav.classList.add(
            "text-sm",
            "py-2",
            "md:py-4",
            "px-0",
            "md:px-4",
            "rounded-4xl",
            "w-[200px]",
            "md:w-[340px]",
            "backdrop-blur-2xl",
            "bg-kdBlue/80",
            "saturate-175",
            "shadow-[0_8px_40px_rgba(21,34,41,0.3)]",
          );
          nav.classList.remove("text-base", "w-full", "md:max-w-[90vw]");

          leftChildren.classList.add(
            "gap-6",
            "mt-1",
            "order-2",
            "justify-center",
          );
          leftChildren.classList.remove("gap-10", "justify-start");

          rightChildren.classList.add(
            "gap-6",
            "mt-1",
            "order-3",
            "justify-center",
          );
          rightChildren.classList.remove("gap-10", "justify-end");

          centreChildren.classList.add("order-1", "md:-ml-5");
          centreChildren.classList.remove();

          Flip.from(shrunkState, {
            duration: 0.8,
            ease: "elastic.out(0.5, 0.4)",
            absolute: false,
            scale: true,
            onEnter: (elements) => {
              gsap.fromTo(
                elements,
                { scaleX: 1.05 },
                { scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" },
              );
            },
          });
        },

        onLeaveBack: () => {
          const shrunkState = Flip.getState(".ani-navBox, .ani-navBox > div");

          nav.classList.remove(
            "text-sm",
            "py-2",
            "md:py-4",
            "px-4",
            "rounded-4xl",
            "w-[200px]",
            "md:w-[340px]",
            "backdrop-blur-2xl",
            "bg-kdBlue/80",
            "saturate-175",
            "shadow-[0_8px_40px_rgba(21,34,41,0.3)]",
          );
          nav.classList.add("text-base", "w-full");

          leftChildren.classList.remove(
            "gap-6",
            "mt-1",
            "order-2",
            "justify-center",
          );
          leftChildren.classList.add("gap-10", "justify-start");

          rightChildren.classList.remove(
            "gap-6",
            "mt-1",
            "order-3",
            "justify-center",
          );
          rightChildren.classList.add("gap-10", "justify-end");

          centreChildren.classList.remove("order-1", "md:-ml-5");
          centreChildren.classList.add();

          Flip.from(shrunkState, {
            duration: 0.8,
            ease: "elastic.out(0.4, 0.4)",
            absolute: false,
            scale: true,
            onEnter: (elements) => {
              gsap.fromTo(
                elements,
                { scaleX: 1.05 },
                { scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" },
              );
            },
          });
        },
      });
    }
  }
});
