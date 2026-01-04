async function includePartials() {
  const spots = document.querySelectorAll("[data-include]");
  for (const el of spots) {
    const url = el.getAttribute("data-include");
    if (!url) continue;
    try {
      const res = await fetch(url, { cache: "no-cache" });
      el.outerHTML = await res.text();
    } catch (e) {
      console.warn("Include fehlgeschlagen:", url, e);
    }
  }

  document.dispatchEvent(new CustomEvent("partials:loaded"));

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", includePartials);
} else {
  includePartials();
}
