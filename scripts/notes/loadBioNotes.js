// scripts/notes/loadBioNotes.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("../scripts/notes/notesIndex.json")
    .then(r => r.json())
    .then(data => {
      loadSection(".biology", data.biology);
      loadSection(".chemistry", data.chemistry);
      loadSection(".mathematics", data.mathematics);
    })
    .catch(err => console.error("Failed to load index file:", err));
});

function loadSection(selector, files) {
  const container = document.querySelector(selector);
  container.innerHTML = ""; // clear default frames

  files.forEach(file => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("pdf-wrapper");

    // Title
    const title = document.createElement("h4");
    title.textContent = file.name;
    wrapper.appendChild(title);

    // PDF iframe
    const frame = document.createElement("iframe");
    frame.src = file.url;
    frame.title = file.name;
    frame.loading = "lazy";
    frame.classList.add("pdf-frame");

    wrapper.appendChild(frame);

    // Fullscreen button
    const btn = document.createElement("button");
    btn.textContent = "View Full Screen";
    btn.classList.add("fullscreen-btn");
    btn.addEventListener("click", () => openFullscreen(file.url, file.name));

    wrapper.appendChild(btn);
    container.appendChild(wrapper);
  });
}

// Fullscreen function
function openFullscreen(url, title) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("pdf-overlay");

  // Close on click outside or ESC
  overlay.addEventListener("click", e => {
    if (e.target === overlay) overlay.remove();
  });
  document.addEventListener("keydown", function esc(e) {
    if (e.key === "Escape") {
      overlay.remove();
      document.removeEventListener("keydown", esc);
    }
  });

  // PDF iframe
  const frame = document.createElement("iframe");
  frame.src = url;
  frame.title = title;
  frame.classList.add("pdf-fullscreen");

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✖ Close";
  closeBtn.classList.add("close-btn");
  closeBtn.addEventListener("click", () => overlay.remove());

  overlay.appendChild(closeBtn);
  overlay.appendChild(frame);
  document.body.appendChild(overlay);
}
