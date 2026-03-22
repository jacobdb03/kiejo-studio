import { gsap, Flip } from "../dev-scriptFiles/gsapSetup";
import { SplitText } from "gsap/SplitText";

/*
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

*/

const elements = document.querySelectorAll<HTMLElement>(".cus-letterPopIn");

elements.forEach((el) => {
  const split = new SplitText(el, { type: "chars", mask: "chars" });

  gsap.from(split.chars, {
    yPercent: 110,
    rotation: () => (Math.random() - 0.5) * 24,
    delay: 0.5,
    duration: 0.4,
    ease: "back.out(1.5)",
    stagger: 0.05,
  });
});

const links = document.querySelectorAll<HTMLElement>(".cus-linkAnimateIn");

links.forEach((el) => {
  gsap.from(el, {
    yPercent: 110,
    delay: 1,
    duration: 0.6,
    ease: "back.out(0.6)",
    stagger: 0.05,
  });
});
