import { ScrollSmoother } from "../dev-scriptFiles/gsapSetup";

window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.5,
      smoothTouch: 0.1,
      effects: true,
    });
  });

  // scrollTrigger: {
  //   trigger: "#smooth-wrapper";
  //   fastScrollEnd: true; // (default 2500px/s)
  //   preventOverlaps: true; // prevent overlaps in preceding scrollTrigger animations
  //   // or
  //   preventOverlaps: "group1"; // prevent overlaps in specific group of scrollTrigger animations
  // }
});
