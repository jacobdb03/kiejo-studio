import { gsap } from "../dev-scriptFiles/gsapSetup";

// ——— Config ———
let heroCarousel_Animation: boolean = true;
if (heroCarousel_Animation) {
  const slideDuration = 5;

  const slides = document.querySelectorAll<HTMLElement>(".heroSlide");
  const images = document.querySelectorAll<HTMLElement>(".heroImg");
  const pills = document.querySelectorAll<HTMLElement>(".heroPill");
  const fills = document.querySelectorAll<HTMLElement>(".heroFill");

  let currentTimeline: gsap.core.Timeline | null = null;

  function goToSlide(index: number) {
    if (currentTimeline) currentTimeline.kill();
    updateImages(index);
    updatePills(index);
    startProgress(index);
  }

  function updateImages(index: number) {
    slides.forEach((slide, i) => {
      gsap.to(slide, { opacity: i === index ? 1 : 0, duration: 0.8 });
      if (i === index) {
        gsap.fromTo(
          images[i],
          { scale: 1.1 },
          { scale: 1, duration: slideDuration, ease: "power1.inOut" },
        );
      }
    });
  }

  function updatePills(index: number) {
    pills.forEach((pill, i) => {
      gsap.to(pill, {
        width: i === index ? 80 : 8,
        duration: 0.35,
        ease: "power2.out",
      });
      if (i === index) {
        gsap.set(fills[i], { width: "0%" });
      } else {
        gsap.to(fills[i], { width: i < index ? "100%" : "0%", duration: 0.2 });
      }
    });
  }

  function startProgress(index: number) {
    const next = (index + 1) % slides.length;
    currentTimeline = gsap.timeline();
    currentTimeline.to(fills[index], {
      width: "100%",
      duration: slideDuration,
      ease: "none",
      onComplete: () => goToSlide(next),
    });
  }

  goToSlide(0);
}
