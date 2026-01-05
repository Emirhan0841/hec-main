let navInitialized = false;
let yearInitialized = false;
let cookieInitialized = false;

function initYear() {
  if (yearInitialized) return;
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
    yearInitialized = true;
  }
}

function initMobileMenu() {
  if (navInitialized) return;
  const toggleBtn = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      const hidden = mobileMenu.classList.toggle("hidden");
      toggleBtn.setAttribute("aria-expanded", String(!hidden));
    });
    navInitialized = true;
  }
}

function initCookieBanner() {
  if (cookieInitialized) return;
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const overlay = document.getElementById("cookie-overlay");
  const stored = localStorage.getItem("hec_cookie_consent");
  if (stored) {
    overlay?.remove();
    banner.remove();
    cookieInitialized = true;
    return;
  }

  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");
  const closeBanner = (value) => {
    localStorage.setItem("hec_cookie_consent", value);
    overlay?.remove();
    banner.remove();
    document.body.classList.remove("cookie-blocked");
    cookieInitialized = true;
  };

  document.body.classList.add("cookie-blocked");
  acceptBtn?.addEventListener("click", () => closeBanner("all"));
  rejectBtn?.addEventListener("click", () => closeBanner("necessary"));
}

function initRootLinks() {
  const path = window.location.pathname;
  const baseRoot = path.includes("/hec-starter/") ? "/hec-starter/" : "/";
  let prefix = "";
  if (path.includes("/pages/legal/")) {
    prefix = "../../";
  } else if (path.includes("/pages/")) {
    prefix = "../";
  }

  document.querySelectorAll("[data-root-link]").forEach((el) => {
    const target = el.getAttribute("data-root-link");
    if (target) {
      if (target.startsWith("/")) {
        el.setAttribute("href", `${baseRoot}${target.replace(/^\//, "")}`);
      } else {
        el.setAttribute("href", `${prefix}${target}`);
      }
    }
  });

  document.querySelectorAll("[data-root-src]").forEach((el) => {
    const target = el.getAttribute("data-root-src");
    if (target) {
      if (target.startsWith("/")) {
        el.setAttribute("src", `${baseRoot}${target.replace(/^\//, "")}`);
      } else {
        el.setAttribute("src", `${prefix}${target}`);
      }
    }
  });
}

function initAll() {
  initRootLinks();
  initYear();
  initMobileMenu();
  initCookieBanner();
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("/#")) return;

  const hash = href.slice(1);
  const target = document.querySelector(hash);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.pushState(null, "", href);
});

document.addEventListener("partials:loaded", initAll);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}
