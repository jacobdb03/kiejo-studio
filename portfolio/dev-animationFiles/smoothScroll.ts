import { gsap, ScrollSmoother } from "../dev-scriptFiles/gsapSetup";

document.addEventListener("DOMContentLoaded", (event: Event) => {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    effects: true,
  });

  const imageTarget: HTMLElement[] = gsap.utils.toArray(
    ".cus-scrollImage",
  ) as HTMLElement[];

  imageTarget.forEach((item: HTMLElement, i) => {
    const setSpeed = parseFloat(item.getAttribute("imgScrollSpeed") || "0");
    smoother.effects(item, {
      speed: i + setSpeed,
    });
  });
});
