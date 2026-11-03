document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".language-chartjs").forEach((element) => {
    const canvas = document.createElement("canvas");
    const chartConfig = element.textContent;
    element.textContent = "";
    element.appendChild(canvas);

    const context = canvas.getContext("2d");
    if (context && chartConfig) {
      new Chart(context, JSON.parse(chartConfig));
      element.setAttribute("data-processed", "true");
    }
  });
});
