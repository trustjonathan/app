document.addEventListener("DOMContentLoaded", () => {
  const home = document.querySelector(".home");
  const displayEl = document.querySelector(".display");
  if (!home || !displayEl) return;

  // Create side panel once
  let panel = document.querySelector(".dropdown-panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.className = "dropdown-panel";
    panel.innerHTML = `
      <div class="dropdown-inner" role="menu" aria-hidden="true"></div>
    `;
    document.body.appendChild(panel);

    const css = `
      .dropdown-panel {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 320px;
        max-width: 95vw;
        background: rgba(0,0,0,0.65);
        backdrop-filter: blur(4px);
        color: #fff;
        z-index: 9999;
        display: none;
        overflow-y: auto;
        padding: 20px;
        box-sizing: border-box;
      }
      .dropdown-panel .display-clone { margin-bottom: 12px; }
      .dropdown-panel a { color: #fff; text-decoration: underline; }
    `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  const inner = panel.querySelector(".dropdown-inner");

  // ---------- Helpers ----------
  function appendClone() {
    const clone = document.createElement("div");
    clone.className = "display-clone";
    clone.innerHTML = displayEl.innerHTML; // deep copy source content
    inner.appendChild(clone);
    clone.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  function clearClones() {
    inner.innerHTML = "";
  }

  function openPanel() {
    panel.style.display = "block";
    home.setAttribute("aria-expanded", "true");
    inner.setAttribute("aria-hidden", "false");

    document.addEventListener("click", docClick);
    document.addEventListener("keydown", keyClose);
  }

  function closePanel() {
    panel.style.display = "none";
    home.setAttribute("aria-expanded", "false");
    inner.setAttribute("aria-hidden", "true");

    document.removeEventListener("click", docClick);
    document.removeEventListener("keydown", keyClose);

    clearClones();
  }

  function docClick(e) {
    if (!panel.contains(e.target) && !home.contains(e.target)) {
      closePanel();
    }
  }

  function keyClose(e) {
    if (e.key === "Escape") closePanel();
  }

  // ---------- Main interaction ----------
  home.addEventListener("click", (e) => {
    e.stopPropagation();

    appendClone();

    if (panel.style.display !== "block") {
      openPanel();
    }
  });

  panel.addEventListener("click", (e) => e.stopPropagation());

  // ---------- ARIA ----------
  home.setAttribute("role", "button");
  home.setAttribute("aria-expanded", "false");
});
