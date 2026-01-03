// Jahr automatisch
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile-Menü
const toggleBtn = document.getElementById("mobile-toggle");
const mobileMenu = document.getElementById("mobile-menu");
if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener("click", () => {
    const hidden = mobileMenu.classList.toggle("hidden");
    toggleBtn.setAttribute("aria-expanded", String(!hidden));
  });
}

/**
 * Super-leichte HTML-Includes:
 * <div data-include="/partials/header.html"></div>
 * <div data-include="/partials/footer.html"></div>
 */
async function includePartials() {
  const spots = document.querySelectorAll("[data-include]");
  for (const el of spots) {
    const url = el.getAttribute("data-include");
    try {
      const res = await fetch(url, { cache: "no-cache" });
      el.outerHTML = await res.text();
    } catch (e) {
      console.warn("Include fehlgeschlagen:", url, e);
    }
  }
}
includePartials();
