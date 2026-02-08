import { gsap, ScrollSmoother } from "./gsapSetup";

document.addEventListener("DOMContentLoaded", (event: Event) => {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
  });
});
