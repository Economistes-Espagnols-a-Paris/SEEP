function setCurrentYear() {
  const currentYearElement = document.querySelector("#currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = String(new Date().getFullYear());
  }
}

function initMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("open");
    });

    menu.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        menu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}

function initRevealAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  reveals.forEach((element) => observer.observe(element));
}

setCurrentYear();
initMenu();
initRevealAnimations();
