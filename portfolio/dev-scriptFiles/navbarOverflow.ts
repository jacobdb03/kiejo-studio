import { gsap } from "./gsapSetup";

const overflowButton: HTMLElement | null =
  document.getElementById("cus-overflowMenu");

const overflowItem: HTMLElement | null =
  document.getElementById("overflowNavbar");

document.addEventListener("DOMContentLoaded", (event: Event) => {
  const textTarget: HTMLElement[] = gsap.utils.toArray(".ani-overflowBump");

  function viewportChange() {
    if (window.matchMedia("(max-width: 48rem)").matches) {
      overflowItem?.classList.add("hidden");
    } else {
      overflowItem?.classList.add("hidden");
    }
  }

  overflowButton?.addEventListener("click", function (event: MouseEvent) {
    if (window.matchMedia("(max-width: 48rem)").matches) {
      const wasHidden = overflowItem?.classList.contains("hidden");

      overflowItem?.classList.toggle("hidden");
      let overflowOpen = wasHidden;

      if (overflowOpen)
        textTarget.forEach((child: HTMLElement, i) =>
          gsap.fromTo(
            child,
            { paddingLeft: 0, opacity: 0 },
            {
              paddingLeft: "5vw",
              opacity: 1,
              ease: "elastic.out(0.2,0.18)",
              delay: i * 0.15,
            },
          ),
        );
    }
  });

  viewportChange();

  window
    .matchMedia("(max-width: 48rem)")
    .addEventListener("change", viewportChange);
});
