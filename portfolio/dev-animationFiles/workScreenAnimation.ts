import { gsap, Flip } from "../dev-scriptFiles/gsapSetup";

const archiveCollection = document.getElementById("archive");
const archiveButton = document.getElementById("archiveButton");

archiveButton?.addEventListener("click", (e: MouseEvent) => {
  archiveCollection?.classList.toggle("hidden");
  console.log("showing");
});

gsap.to(archiveCollection, {
  xPercent: 100 * (Selection.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: archiveCollection,
    start: "top top",
    end: "+=600",
    pin: true,
    scrub: 0.5,
  },
});
