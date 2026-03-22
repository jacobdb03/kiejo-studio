import { gsap } from "../dev-scriptFiles/gsapSetup";
import { colour } from "../dev-scriptFiles/styleSetup";

const transitionBox = document.createElement("div");
document.documentElement.appendChild(transitionBox);

gsap.set(transitionBox, {
  position: "fixed",
  width: "calc(200vw + 200vh)",
  height: "calc(200vw + 200vh)",
  zIndex: 20,
  borderRadius: "50%",
  backgroundColor: colour.kWhite,
  pointerEvents: "none",
  scale: 0,
});

window.addEventListener("pageshow", (e: PageTransitionEvent) => {
  if (e.persisted) {
    gsap.killTweensOf(transitionBox);
    gsap.set(transitionBox, { scale: 0, opacity: 0, pointerEvents: "none" });
    sessionStorage.removeItem("navigatedFromLink");
    sessionStorage.removeItem("clickX");
    sessionStorage.removeItem("clickY");
  }
});

if (sessionStorage.getItem("navigatedFromLink") === "true") {
  const x = sessionStorage.getItem("clickX") || "50%";
  const y = sessionStorage.getItem("clickY") || "0";
  gsap.set(transitionBox, {
    left: x,
    top: y,
    xPercent: -50,
    yPercent: -50,
    scale: 1,
    borderRadius: "50%",
    width: "calc(200vw + 200vh)",
    height: "calc(200vw + 200vh)",
  });
  gsap.to(transitionBox, {
    left: "50%",
    top: "2.5rem",
    scale: 0,
    opacity: 0,
    duration: 1,
    delay: 0.15,
    ease: "expo.inOut",
    onComplete: () => {
      gsap.set(transitionBox, {
        clearProps: "all",
        position: "fixed",
        width: "calc(200vw + 200vh)",
        height: "calc(200vw + 200vh)",
        zIndex: 20,
        borderRadius: "50%",
        backgroundColor: colour.kWhite,
        pointerEvents: "none",
        scale: 0,
      });
      sessionStorage.removeItem("navigatedFromLink");
      sessionStorage.removeItem("clickX");
      sessionStorage.removeItem("clickY");
    },
  });
}

window.addEventListener("load", () => {
  let linkTarget: HTMLLinkElement[] = gsap.utils.toArray(
    document.querySelectorAll("a"),
  );
  linkTarget.forEach((item) => {
    item.addEventListener("click", (e: MouseEvent) => {
      console.log("clicked: " + item.classList);
      if (item.classList.contains("cus-pageTransitionExcluded")) return;
      sessionStorage.setItem("clickX", String(e.clientX));
      sessionStorage.setItem("clickY", String(e.clientY));
      e.preventDefault();
      gsap.killTweensOf(transitionBox);
      gsap.set(transitionBox, { clearProps: "all" });
      gsap.set(transitionBox, {
        position: "fixed",
        width: "calc(200vw + 200vh)",
        height: "calc(200vw + 200vh)",
        zIndex: 20,
        borderRadius: "50%",
        backgroundColor: colour.kBlue,
        pointerEvents: "none",
        scale: 0,
        left: e.clientX,
        top: e.clientY,
        xPercent: -50,
        yPercent: -50,
      });
      gsap.to(transitionBox, {
        backgroundColor: colour.kWhite,
        scale: 1,
        duration: 1,
        ease: "expo.inOut",
        onComplete: () => {
          sessionStorage.setItem("navigatedFromLink", "true");
          window.location.href = item.href;
        },
      });
    });
  });
});
