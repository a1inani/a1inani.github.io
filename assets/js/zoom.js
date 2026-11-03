// Initialize medium zoom.
document.addEventListener("DOMContentLoaded", () => {
  window.medium_zoom = mediumZoom("[data-zoomable]", {
    background: `${getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color")}ee`, // + 'ee' for trasparency.
  });
});
