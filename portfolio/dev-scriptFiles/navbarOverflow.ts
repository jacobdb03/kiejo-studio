import { gsap } from "./gsapSetup";
import { colour } from "../dev-scriptFiles/styleSetup";

const overflowButton = document.getElementById("cus-overflowMenu");
const overflowItem = document.getElementById("overflowNavbar");
const navTarget = document.querySelector(".ani-navExpand") as HTMLDivElement;
const navBox = document.querySelector(".ani-navBox") as HTMLDivElement;

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.createElement("div");
  const textTarget: HTMLElement[] = gsap.utils.toArray(".ani-overflowBump");

  const openMenu = () => {
    gsap.killTweensOf([
      navBox,
      ".ani-navBox a",
      ".ani-navBox img",
      ...textTarget,
    ]);

    overflowItem?.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    overlay.className = "fixed inset-0 bg-kWhite/70 backdrop-blur-lg z-9";
    document.body.appendChild(overlay);

    gsap.to(".ani-navBox a", { color: colour.kBlack, duration: 0.3 });
    gsap.to(".ani-navBox img", { filter: "brightness(0)", duration: 0.3 });

    textTarget
      .slice()
      .reverse()
      .forEach((child: HTMLElement, i) =>
        gsap.fromTo(
          child,
          { paddingLeft: 0, opacity: 0 },
          {
            paddingLeft: "2vw",
            opacity: 1,
            ease: "elastic.out(0.2,0.18)",
            delay: 0.35 - i * 0.06,
          },
        ),
      );
    gsap.to(navBox, {
      maxWidth: "95vw",
      backgroundColor: "transparent",
      ease: "elastic.out(0.2,0.18)",
    });
  };
  const closeMenu = () => {
    gsap.killTweensOf([
      navBox,
      ".ani-navBox a",
      ".ani-navBox img",
      ...textTarget,
    ]);

    overflowItem?.classList.add("hidden");
    overlay.remove();
    document.body.classList.remove("overflow-hidden");

    gsap.to(".ani-navBox a", { color: colour.kWhite, duration: 0.3 });
    gsap.to(".ani-navBox img", { filter: "brightness(1)", duration: 0.3 });
    gsap.set(navBox, { clearProps: "all" });
  };
  const viewportChange = () => {
    closeMenu();
  };
  overflowButton?.addEventListener("click", () => {
    if (!window.matchMedia("(max-width: 48rem)").matches) return;
    const isHidden = overflowItem?.classList.contains("hidden");
    isHidden ? openMenu() : closeMenu();
  });
  viewportChange();
  window
    .matchMedia("(max-width: 48rem)")
    .addEventListener("change", viewportChange);
});
