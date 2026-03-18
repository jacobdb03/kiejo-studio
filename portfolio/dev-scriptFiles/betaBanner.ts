import { gsap } from "./gsapSetup";

const banner = document.createElement("div");
banner.innerHTML = `
  <div id="beta-banner" class="w-full overflow-hidden" style="background:#2560e0; height:28px; position:fixed; top:0; left:0; z-index:8;">
    <div id="beta-track" class="flex items-center h-full whitespace-nowrap">
      <span class="font-mono px-8" style="color:#eff1f3; font-size:13px;">
      Site in beta — sorry if anything is broken! Most work is live but some nav pages are still in progress. If there's an issue, let me know via the contact form in the footer. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✦      </span>
      <span class="font-mono px-8" style="color:#eff1f3; font-size:13px;" aria-hidden="true">
      Site in beta — sorry if anything is broken! Most work is live but some nav pages are still in progress. If there's an issue, let me know via the contact form in the footer. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✦      </span>
    </div>
  </div>
`;

document.body.prepend(banner);

const track = document.getElementById("beta-track") as HTMLElement;
const strip = track.querySelector("span") as HTMLElement;
const stripW = strip.offsetWidth;

gsap.to(track, {
  x: -stripW,
  duration: 28,
  ease: "none",
  repeat: -1,
  modifiers: {
    x: (x: string) => (parseFloat(x) % stripW) + "px",
  },
});
