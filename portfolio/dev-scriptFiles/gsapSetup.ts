import { gsap } from "gsap";

import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";

gsap.registerPlugin(
  Flip,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  CustomEase,
  CustomBounce,
);

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Flip,
  CustomEase,
  CustomBounce,
};
