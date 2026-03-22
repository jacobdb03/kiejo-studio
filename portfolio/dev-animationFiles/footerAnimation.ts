import pkg from "../../package.json";
import emailjs from "@emailjs/browser";
import { gsap, ScrollTrigger } from "../dev-scriptFiles/gsapSetup";

window.addEventListener("load", () => {
  // Version Number
  document.querySelectorAll<HTMLElement>(".version-text").forEach((el) => {
    el.textContent = `v${pkg.version}`;
  });

  //CopyEmail

  const copyEmail = document.getElementById("copy-email");
  const emailToast = document.getElementById("email-toast");

  copyEmail?.addEventListener("click", () => {
    navigator.clipboard.writeText("hello@jacobbryant.design").then(() => {
      gsap.fromTo(
        emailToast,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(emailToast, {
              opacity: 0,
              y: 10,
              duration: 0.3,
              delay: 1.5,
              ease: "power2.in",
            });
          },
        },
      );
    });
  });

  // EmailJS

  const form = document.getElementById("contact-form") as HTMLFormElement;
  if (!form) return;

  const emailInput = document.getElementById("input-email") as HTMLInputElement;
  const messageInput = document.getElementById(
    "input-message",
  ) as HTMLTextAreaElement;
  const submitBtn = form.querySelector("button") as HTMLButtonElement;

  messageInput.addEventListener("input", () => {
    messageInput.style.height = "auto";
    messageInput.style.height = messageInput.scrollHeight + "px";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const showToast = (el: HTMLElement) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(el, {
              opacity: 0,
              y: 10,
              duration: 0.3,
              delay: 1,
              ease: "power2.in",
            });
          },
        },
      );
    };

    const toastEmail = document.getElementById("toast-email") as HTMLElement;
    const toastMessage = document.getElementById(
      "toast-message",
    ) as HTMLElement;
    const toastWorking = document.getElementById(
      "toast-working",
    ) as HTMLElement;

    if (!emailInput.value || !emailInput.validity.valid) {
      showToast(toastEmail);
      return;
    }
    if (!messageInput.value.trim()) {
      showToast(toastMessage);
      return;
    } else {
      showToast(toastWorking);
    }

    emailjs
      .send(
        "service_ihqo0a5",
        "template_rzwj06g",
        {
          from_email: emailInput.value,
          message: messageInput.value,
        },
        "PNG8oxnTnzQZCC_ZQ",
      )
      .then(() => {
        submitBtn.textContent = "Sent! ^J^";
        emailInput.value = "";
        messageInput.value = "";
      })
      .catch((err) => {
        console.error("failed", err);
        submitBtn.textContent = "Error ÒJÓ";
      });
  });

  // Footer Animation
  const footerTarget = document.querySelectorAll(".ani-footerReveal");

  gsap.from(footerTarget, {
    y: 250,
    duration: 1.2,
    ease: "expo.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: footerTarget[0],
      start: "top bottom",
      toggleActions: "play reverse reset reverse",
    },
  });
});
