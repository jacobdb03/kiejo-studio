import { ScrollSmoother } from "../dev-scriptFiles/gsapSetup";

window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      effects: true,
    });
  });
});
