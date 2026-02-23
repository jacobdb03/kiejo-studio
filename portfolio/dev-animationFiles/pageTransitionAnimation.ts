import { gsap } from "../dev-scriptFiles/gsapSetup";
import { colour } from "../dev-scriptFiles/styleSetup";

console.log("True 0");

const linkTarget: HTMLLinkElement[] = gsap.utils.toArray(
  document.querySelectorAll("a"),
);

const transitionBox = ".ani-transitionCircle";

const pageTransitionExcluded = document.querySelector(
  ".cus-pageTransitionExcluded",
) as HTMLDivElement;

const currentPageColor = colour.kWhite;

linkTarget.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (pageTransitionExcluded) {
      e.preventDefault();

      gsap.fromTo(
        transitionBox,
        {
          scale: 1,
          zIndex: 20,
          backgroundColor: colour.kBlue,
        },
        {
          scale: 800,
          duration: 1,
          backgroundColor: currentPageColor,
          ease: "expo.inOut",
          onComplete: () => {
            sessionStorage.setItem("navigatedFromLink", "true");
            window.location.href = item.href;
          },
        },
      );
    }
  });
});

if (sessionStorage.getItem("navigatedFromLink") === "true") {
  gsap.fromTo(
    transitionBox,
    {
      scale: 800,
      opacity: 1,
      zIndex: 20,
      backgroundColor: currentPageColor,
    },
    {
      scale: 0,
      duration: 1,
      backgroundColor: colour.kBlue,
      ease: "expo.inOut",
      onComplete: () => {
        sessionStorage.removeItem("navigatedFromLink");
      },
    },
  );
}
