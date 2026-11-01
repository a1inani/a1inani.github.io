document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".jupyter-notebook-iframe-container iframe").forEach((iframe) => {
    const setLinksToNewTab = () => {
      const iframeDocument = iframe.contentWindow?.document;
      if (!iframeDocument) {
        return;
      }

      iframeDocument.querySelectorAll("a[href]").forEach((link) => {
        link.setAttribute("target", "_blank");
      });
    };

    iframe.addEventListener("load", setLinksToNewTab);
    setLinksToNewTab();
  });
});
