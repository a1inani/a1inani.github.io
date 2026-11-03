document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  if (!grid || typeof Masonry === "undefined") {
    return;
  }

  const masonry = new Masonry(grid, {
    gutter: 10,
    horizontalOrder: true,
    itemSelector: ".grid-item",
  });

  if (typeof imagesLoaded === "function") {
    imagesLoaded(grid).on("progress", () => {
      masonry.layout();
    });
  }
});
