import { gsap, Flip } from "../dev-scriptFiles/gsapSetup";
import { SplitText } from "gsap/SplitText";
import emailjs from "@emailjs/browser";

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

links.forEach((el, i) => {
  gsap.from(el, {
    yPercent: 110,
    duration: 0.6,
    ease: "back.out(0.6)",
    stagger: 0.05,
  });
});

const theRest = document.querySelectorAll<HTMLElement>(".cus-aboutFadeOn");

gsap.from(theRest, {
  yPercent: 110,
  opacity: 0,
  delay: 2,
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.05,
});

const copyChatEmail = document.getElementById("contactEmail-copy");
const emailChatToast = document.getElementById("contactEmail-toast");

copyChatEmail?.addEventListener("click", () => {
  navigator.clipboard.writeText("hello@jacobbryant.design").then(() => {
    gsap.fromTo(
      emailChatToast,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(emailChatToast, {
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

const chatForm = document.getElementById(
  "chat-contact-form",
) as HTMLFormElement;
if (chatForm) {
  const chatEmailInput = document.getElementById(
    "chat-input-email",
  ) as HTMLInputElement;
  const chatMessageInput = document.getElementById(
    "chat-input-message",
  ) as HTMLTextAreaElement;
  const chatSubmitBtn = chatForm.querySelector("button") as HTMLButtonElement;

  chatMessageInput.addEventListener("input", () => {
    chatMessageInput.style.height = "auto";
    chatMessageInput.style.height = chatMessageInput.scrollHeight + "px";
  });

  chatForm.addEventListener("submit", (e) => {
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

    const chatToastEmail = document.getElementById(
      "chat-toast-email",
    ) as HTMLElement;
    const chatToastMessage = document.getElementById(
      "chat-toast-message",
    ) as HTMLElement;
    const chatToastWorking = document.getElementById(
      "chat-toast-working",
    ) as HTMLElement;

    if (!chatEmailInput.value || !chatEmailInput.validity.valid) {
      showToast(chatToastEmail);
      return;
    }
    if (!chatMessageInput.value.trim()) {
      showToast(chatToastMessage);
      return;
    } else {
      showToast(chatToastWorking);
    }

    emailjs
      .send(
        "service_ihqo0a5",
        "template_rzwj06g",
        {
          from_email: chatEmailInput.value,
          message: chatMessageInput.value,
        },
        "PNG8oxnTnzQZCC_ZQ",
      )
      .then(() => {
        chatSubmitBtn.textContent = "Sent! ^J^";
        chatEmailInput.value = "";
        chatMessageInput.value = "";
        chatMessageInput.style.height = "auto";
      })
      .catch((err) => {
        console.error("failed", err);
        chatSubmitBtn.textContent = "Error ÒJÓ";
      });
  });
}
