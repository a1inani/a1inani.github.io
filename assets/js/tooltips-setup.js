document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[title], [data-bs-original-title]").forEach((element) => {
    if (!element.getAttribute("title") && element.dataset.bsOriginalTitle) {
      element.setAttribute("title", element.dataset.bsOriginalTitle);
    }
  });
});
