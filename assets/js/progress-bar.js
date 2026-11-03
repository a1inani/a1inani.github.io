/*
 * This JavaScript code has been adapted from the article
 * https://css-tricks.com/reading-position-indicator/ authored by Pankaj Parashar,
 * published on the website https://css-tricks.com on the 7th of May, 2014.
 * Couple of changes were made to the original code to make it compatible
 * with the `al-foio` theme.
 */
const progressBar = document.querySelector("#progress");
/*
 * We set up the bar after all elements are done loading.
 * In some cases, if the images in the page are larger than the intended
 * size they'll have on the page, they'll be resized via CSS to accomodate
 * the desired size. This mistake, however, breaks the computations as the
 * scroll size is computed as soon as the elements finish loading.
 * To account for this, a minimal delay was introduced before computing the
 * values.
 */
window.addEventListener("load", () => {
  setTimeout(progressBarSetup, 50);
});
/*
 * We set up the bar according to the browser.
 * If the browser supports the progress element we use that.
 * Otherwise, we resize the bar thru CSS styling
 */
function progressBarSetup() {
  if (!progressBar) {
    return;
  }

  if ("max" in document.createElement("progress")) {
    initializeProgressElement();
    document.addEventListener("scroll", () => {
      progressBar.value = getCurrentScrollPosition();
    });
    window.addEventListener("resize", initializeProgressElement);
  } else {
    resizeProgressBar();
    document.addEventListener("scroll", resizeProgressBar);
    window.addEventListener("resize", resizeProgressBar);
  }
}
/*
 * The vertical scroll position is the same as the number of pixels that
 * are hidden from view above the scrollable area. Thus, a value > 0 is
 * how much the user has scrolled from the top
 */
function getCurrentScrollPosition() {
  return window.scrollY;
}

function initializeProgressElement() {
  const navbar = document.querySelector("#navbar");
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
  document.body.style.paddingTop = `${navbarHeight}px`;
  document.querySelectorAll(".progress-container").forEach((container) => {
    container.style.paddingTop = `${navbarHeight}px`;
  });
  progressBar.style.top = `${navbarHeight}px`;
  progressBar.max = getDistanceToScroll();
  progressBar.value = getCurrentScrollPosition();
}
/*
 * The offset between the html document height and the browser viewport
 * height will be greater than zero if vertical scroll is possible.
 * This is the distance the user can scroll
 */
function getDistanceToScroll() {
  return document.documentElement.scrollHeight - window.innerHeight;
}

function resizeProgressBar() {
  progressBar.style.width = `${getWidthPercentage()}%`;
}
// The scroll ratio equals the percentage to resize the bar
function getWidthPercentage() {
  return (getCurrentScrollPosition() / getDistanceToScroll()) * 100;
}
