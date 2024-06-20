const formatInstruction = (text) => {
  return text
    .split("\r\n")
    .filter((paragraph) => paragraph.trim() !== "")
    .map((paragraph) => `<p>${paragraph}</p><br>`)
    .join("");
};

export default formatInstruction;
