export const loadSvgSprite = (url) => {
  fetch(url)
    .then((response) => response.text())
    .then((sprite) => {
      const div = document.createElement("div");
      div.style.display = "none";
      div.innerHTML = sprite;
      document.body.insertBefore(div, document.body.childNodes[0]);
    })
    .catch((error) => console.error("Error loading SVG sprite:", error));
};
