document.addEventListener("DOMContentLoaded", () => {
  const toggleSection = (trigger, sectionClass) => {
    const row = trigger.parentElement?.parentElement;
    if (!row) {
      return;
    }

    row.querySelector(".abstract.hidden.open")?.classList.remove("open");
    row.querySelector(".award.hidden.open")?.classList.remove("open");
    row.querySelector(".bibtex.hidden.open")?.classList.remove("open");
    row.querySelector(`.${sectionClass}.hidden`)?.classList.toggle("open");
  };

  document.querySelectorAll("a.abstract").forEach((link) => {
    link.addEventListener("click", () => toggleSection(link, "abstract"));
  });

  document.querySelectorAll("a.award").forEach((link) => {
    link.addEventListener("click", () => toggleSection(link, "award"));
  });

  document.querySelectorAll("a.bibtex").forEach((link) => {
    link.addEventListener("click", () => toggleSection(link, "bibtex"));
  });

  document.querySelectorAll(".more-authors[data-more-authors-show]").forEach((toggle) => {
    const toggleAuthors = () => {
      const showText = toggle.dataset.moreAuthorsShow || "";
      const hideText = toggle.dataset.moreAuthorsHide || "";
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.textContent = isExpanded ? hideText : showText;
      toggle.setAttribute("aria-expanded", String(!isExpanded));
      toggle.setAttribute("title", isExpanded ? "Click to view all authors" : "Click to collapse author list");
    };

    toggle.addEventListener("click", toggleAuthors);
    toggle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleAuthors();
      }
    });
  });

  document.querySelectorAll("a").forEach((link) => {
    link.classList.remove("waves-effect", "waves-light");
  });

  const navbarToggle = document.querySelector(".navbar-toggler");
  const navbarNav = document.querySelector("#navbarNav");
  const closeNavbar = () => {
    if (!navbarToggle || !navbarNav) {
      return;
    }

    navbarToggle.classList.add("collapsed");
    navbarToggle.setAttribute("aria-expanded", "false");
    navbarNav.classList.remove("show");
  };

  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener("click", () => {
      const isExpanded = navbarNav.classList.toggle("show");
      navbarToggle.classList.toggle("collapsed", !isExpanded);
      navbarToggle.setAttribute("aria-expanded", String(isExpanded));
    });

    document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
      const menu = toggle.parentElement?.querySelector(".dropdown-menu");
      if (!menu) {
        return;
      }

      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        const isOpen = menu.classList.toggle("show");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".nav-item.dropdown")) {
        document.querySelectorAll(".dropdown-menu.show").forEach((menu) => menu.classList.remove("show"));
        document.querySelectorAll(".dropdown-toggle[aria-expanded='true']").forEach((toggle) => {
          toggle.setAttribute("aria-expanded", "false");
        });
      }
    });

    window.closeNavbarNav = closeNavbar;
  }

  const tocSidebar = document.querySelector("#toc-sidebar");
  if (tocSidebar) {
    document.querySelectorAll(".publications h2").forEach((heading) => {
      heading.setAttribute("data-toc-skip", "");
    });

    if (typeof Toc !== "undefined" && typeof Toc.init === "function") {
      Toc.init(tocSidebar);
    }
  }

  const jupyterTheme = determineComputedTheme();
  document.querySelectorAll(".jupyter-notebook-iframe-container iframe").forEach((iframe) => {
    const applyNotebookStyles = () => {
      const iframeDocument = iframe.contentWindow?.document;
      if (!iframeDocument) {
        return;
      }

      if (!iframeDocument.querySelector("link[data-jupyter-theme]")) {
        const cssLink = iframeDocument.createElement("link");
        cssLink.href = "../css/jupyter.css";
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        cssLink.dataset.jupyterTheme = "true";
        iframeDocument.head?.appendChild(cssLink);
      }

      if (jupyterTheme === "dark") {
        iframeDocument.body?.setAttribute("data-jp-theme-light", "false");
        iframeDocument.body?.setAttribute("data-jp-theme-name", "JupyterLab Dark");
      }
    };

    iframe.addEventListener("load", applyNotebookStyles);
    applyNotebookStyles();
  });
});
