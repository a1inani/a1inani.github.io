let searchTheme = determineComputedTheme();
const ninjaKeys = document.querySelector("ninja-keys");

if (ninjaKeys) {
  if (searchTheme === "dark") {
    ninjaKeys.classList.add("dark");
  } else {
    ninjaKeys.classList.remove("dark");
  }
}

window.openSearchModal = () => {
  window.closeNavbarNav?.();
  ninjaKeys?.open();
};
