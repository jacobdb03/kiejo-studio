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
        contTarget,
        navTarget,
        titleTarget,
        titleTarget.querySelector("a"),
        logoTarget,
        footerTarget[0],
      ]);

      contTarget.classList.add("mx-5", "bottom-5");
      contTarget.classList.remove("mx-32", "top-10", "top-4");

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
        contTarget,
        navTarget,
        titleTarget,
        titleTarget.querySelector("a"),
        logoTarget,
        footerTarget[0],
      ]);

      contTarget.classList.remove("mx-5", "bottom-5");
      contTarget.classList.add("mx-32", "top-10", "top-4");

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

      titleTarget.classList.remove("order-2", "justify-start", "min-w-full");
      titleTarget.classList.add("order-1", "self-center", "flex-5");

      titleTarget
        .querySelector("a")
        ?.classList.remove("h-full", "w-3/4", "object-cover", "mt-24", "mb-2");
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
