import { decode, isBlurhashValid } from "blurhash";
import { gsap } from "../dev-scriptFiles/gsapSetup";

const canvasArray: HTMLElement[] = Array.from(
  document.querySelectorAll<HTMLElement>(".cus-blurContainer"),
) as HTMLElement[];

let imageArray: HTMLImageElement[] = [];

function writeBlurhashImages() {
  canvasArray.forEach((item) => {
    const canvasArrayW = item.offsetWidth;
    const canvasArrayH = item.offsetHeight;

    const imageToLoad = item?.querySelector("img") as HTMLImageElement;
    if (!imageToLoad) return;
    else imageArray.push(imageToLoad);

    const divImageHash = imageToLoad.getAttribute("hash-data");
    if (divImageHash && isBlurhashValid(divImageHash)) {
      const blurHashImage: Uint8ClampedArray = decode(
        divImageHash,
        canvasArrayW,
        canvasArrayH,
      );

      const canvasImageHash = item
        ?.querySelector<HTMLCanvasElement>("canvas")
        ?.getContext("2d");
      if (!canvasImageHash) return;

      const imageData: ImageData = canvasImageHash.createImageData(
        canvasArrayW,
        canvasArrayH,
      );

      imageData.data.set(blurHashImage);

      canvasImageHash.putImageData(imageData, 0, 0);
    }
  });
}

function animateImageIn(target: HTMLImageElement) {
  if (target.complete && target.naturalHeight > 0 && target.naturalWidth > 0) {
    gsap.fromTo(
      target,
      {
        opacity: 0,
        scale: 1.02,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      },
    );
  }
}

function checkImageOnScreen() {
  canvasArray.forEach((item) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector("img") as HTMLImageElement;
            if (img && img.complete && img.naturalHeight > 0) {
              // Fully loaded + visible = animate now
              animateImageIn(img);
            } else if (img) {
              // Image visible but not loaded - wait for load
              const onLoad = () => {
                img.removeEventListener("load", onLoad);
                animateImageIn(img);
              };
              img.addEventListener("load", onLoad);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );
    observer.observe(item);
  });
}

writeBlurhashImages();

document.addEventListener("DOMContentLoaded", () => {
  checkImageOnScreen();
});
