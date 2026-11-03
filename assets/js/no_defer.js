// add bootstrap classes to tables
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("table").forEach((table) => {
    if (determineComputedTheme() === "dark") {
      table.classList.add("table-dark");
    } else {
      table.classList.remove("table-dark");
    }

    // only select tables that are not inside an element with "news" (about page) or "card" (cv page) class
    if (!table.closest('[class*="news"], [class*="card"], [class*="archive"], code')) {
      table.setAttribute("data-toggle", "table");
      table.classList.add("table-hover");
    }
  });
});
