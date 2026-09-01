"use strict";

const signalButton = document.querySelector("#receive-signal");
const signalStatus = document.querySelector("#signal-status");
const cosmos = document.querySelector(".cosmos");
const hero = document.querySelector(".hero");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

signalButton.addEventListener("click", () => {
  if (signalButton.dataset.connected === "true") {
    return;
  }

  signalButton.dataset.connected = "true";
  signalButton.setAttribute("aria-pressed", "true");
  signalButton.textContent = "Signal received";
  signalStatus.textContent = "Signal received · link established";

  if (!reducedMotion.matches) {
    signalButton.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.97)" },
        { transform: "scale(1.03)", boxShadow: "0 0 42px rgba(111, 215, 255, 0.28)" },
        { transform: "scale(1)" },
      ],
      { duration: 650, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
    );

    signalStatus.animate(
      [
        { opacity: 0, transform: "translateY(6px)", letterSpacing: "0.18em" },
        { opacity: 1, transform: "translateY(0)", letterSpacing: "0.08em" },
      ],
      { duration: 700, easing: "ease-out", fill: "both" },
    );

    cosmos.animate(
      [
        { filter: "brightness(1)" },
        { filter: "brightness(1.45)" },
        { filter: "brightness(1)" },
      ],
      { duration: 1100, easing: "ease-in-out" },
    );
  }
});

let parallaxFrame;

window.addEventListener("pointermove", (event) => {
  if (reducedMotion.matches || event.pointerType === "touch") {
    return;
  }

  const horizontal = event.clientX / window.innerWidth - 0.5;
  const vertical = event.clientY / window.innerHeight - 0.5;

  cancelAnimationFrame(parallaxFrame);
  parallaxFrame = requestAnimationFrame(() => {
    cosmos.style.translate = `${horizontal * -16}px ${vertical * -12}px`;
    hero.style.translate = `${horizontal * 3}px ${vertical * 2}px`;
  });
});

document.documentElement.addEventListener("pointerleave", () => {
  cosmos.style.translate = "0 0";
  hero.style.translate = "0 0";
});
