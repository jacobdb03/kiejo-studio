const overflowButton: HTMLElement | null =
  document.getElementById("cus-overflowMenu");

const overflowItem: HTMLElement | null =
  document.getElementById("overflowNavbar");

function viewportChange() {
  if (window.matchMedia("(max-width: 48rem)").matches) {
    overflowItem?.classList.add("hidden");
  } else {
    overflowItem?.classList.add("hidden");
  }
}

overflowButton?.addEventListener("click", function (event: MouseEvent) {
  if (window.matchMedia("(max-width: 48rem)").matches) {
    overflowItem?.classList.toggle("hidden");
  }
});

viewportChange();

window
  .matchMedia("(max-width: 48rem)")
  .addEventListener("change", viewportChange);
