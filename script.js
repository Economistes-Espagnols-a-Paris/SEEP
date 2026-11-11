// Traducciones al inglés. El texto en español vive en index.html (es lo que ven
// los buscadores); aquí solo va la versión inglesa de cada data-i18n.
const EN = {
  brand: "Society of Spanish Economists in Paris",
  "nav.purpose": "Purpose",
  "nav.activities": "Activities",
  "nav.team": "Who we are",
  "nav.association": "Association",
  "nav.contact": "Contact",
  "nav.menu": "Menu",

  "hero.eyebrow": "Non-profit organisation",
  "hero.title": "Society of Spanish Economists in Paris",
  "hero.intro":
    "Our goal is to bring together Spanish economists who study, research or work in Paris, building an active network of contact, support and exchange. Through seminars, workshops and social gatherings we aim to foster <b>collaboration</b> and <b>integration</b> within our community, <b>share</b> our work and encourage the flow of <b>ideas</b>.",
  "hero.open": "The association is open to all <b>Spanish speakers</b>, whatever their nationality.",
  "hero.cta1": "See activities",
  "hero.cta2": "Join the network",

  "purpose.title": "Our purpose",
  "purpose.c1.t": "Connect",
  "purpose.c1.p":
    "We maintain a support network among Spanish and Spanish-speaking economists living in Paris, making professional and personal contact easier.",
  "purpose.c2.t": "Share",
  "purpose.c2.p": "Our meetings let us share research, tools, datasets and hands-on experience.",
  "purpose.c3.t": "Collaborate",
  "purpose.c3.p": "The association is a platform to support joint projects and the search for funding.",

  "act.title": "What we do",
  "act.main": "Our main activity",
  "act.psesp":
    "A research seminar at the Paris School of Economics (PSE) where researchers from our community present and discuss their work in progress. Open to any <b>Spanish speaker</b> interested in economics.",
  "act.l1": "Technical and methodological workshops open to members.",
  "act.l2": "Social events to strengthen ties and integration.",

  "ev.next": "Upcoming events",
  "ev.e1.meta": "Friday 13 November · 4 pm · Paris School of Economics",
  "ev.e1.t1": "Pensions",
  "ev.e1.t2": "Energy efficiency policies",
  "ev.propose": "Would you like to propose a seminar or workshop? Get in touch.",
  "ev.propose.cta": "Send a proposal",
  "ev.past": "Past events",
  "ev.p1.title": "Quarto workshop · Elisa Alonso Herrero",
  "ev.p1.meta": "24 September · 11:30 am to 1 pm · Paris",
  "ev.p1.link": "Workshop materials",

  "team.title": "Who we are",
  "team.sub": "The association's board.",
  "team.r1": "President",
  "team.r2": "Vice-president",
  "team.r3": "Secretary",
  "team.r4": "Treasurer",
  "team.b1": "PhD candidate at the Paris School of Economics. Taxation and social protection.",
  "team.b2": "PhD candidate at the Paris School of Economics. Climate policy, inequality and just energy transitions.",
  "team.b3": "PhD candidate at the Paris School of Economics. Public economics and the taxation of capital and labour.",
  "team.b4": "PhD candidate in the Department of Economics at Sciences Po.",
  "team.web": "Website",

  "assoc.title": "About the association",
  "assoc.name": "Legal name",
  "assoc.form": "Legal form",
  "assoc.form.v": "Non-profit association (Loi 1901)",
  "assoc.rna": "RNA number (Répertoire National des Associations)",
  "assoc.siret": "SIRET number",
  "assoc.seat": "Registered office",
  "assoc.contact": "Contact",

  "foot.title": "Contact",
  "foot.text": "To join the community, take part in our activities or ask us anything, write to:",
  "foot.legal": "Legal notice & privacy",
};

const TITLES = {
  es: "SEEP · Sociedad de Economistas Españoles en París",
  en: "SEEP · Society of Spanish Economists in Paris",
};

const LANG_KEY = "seep-lang";
const i18nElements = document.querySelectorAll("[data-i18n]");
i18nElements.forEach((el) => {
  el.dataset.es = el.innerHTML;
});

function setLanguage(lang) {
  document.documentElement.lang = lang;
  i18nElements.forEach((el) => {
    const translation = EN[el.dataset.i18n];
    el.innerHTML = lang === "en" && translation ? translation : el.dataset.es;
  });
  document.title = TITLES[lang];

  const toggle = document.querySelector(".lang-toggle");
  if (toggle) {
    toggle.textContent = lang === "en" ? "ES" : "EN";
    toggle.setAttribute("aria-label", lang === "en" ? "Ver en español" : "View in English");
    toggle.setAttribute("lang", lang === "en" ? "es" : "en");
  }

  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (error) {
    /* sin almacenamiento: no pasa nada */
  }
}

function initLanguage() {
  const toggle = document.querySelector(".lang-toggle");
  if (!toggle) return;
  toggle.hidden = false;

  let saved = null;
  try {
    saved = localStorage.getItem(LANG_KEY);
  } catch (error) {
    saved = null;
  }
  setLanguage(saved === "en" ? "en" : "es");

  toggle.addEventListener("click", () => {
    setLanguage(document.documentElement.lang === "en" ? "es" : "en");
  });
}

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

initLanguage();
setCurrentYear();
initMenu();
initRevealAnimations();
