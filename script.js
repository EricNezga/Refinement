const storyPointDisplay = document.getElementById("story-point");

function select(element, value) {
  const container = element.closest(".factor");
  const cards = container.querySelectorAll(".card-row");
  cards.forEach(card => card.classList.remove("selected"));
  element.classList.add("selected");
  element.setAttribute("data-value", value);

  const selectedValues = Array.from(document.querySelectorAll(".factor")).map(f => {
    const sel = f.querySelector(".selected");
    if (!sel) return 0;
    return valueFromCard(sel);
  });

  const total = selectedValues.reduce((acc, val) => acc + val, 0);

  let sp = "-";
  if (total >= 3 && total <= 4) sp = 3;
  else if (total === 5) sp = 5;
  else if (total >= 6 ) sp = 8;
  else if (total >= 7 && total <= 8) sp = 13;
  else if (total === 9) sp = 21;

  storyPointDisplay.textContent = sp;

  const factorName = container.dataset.factor.toLowerCase();
  const bubble = document.getElementById(`bubble-${factorName}`);
  bubble.textContent = value;
  bubble.classList.add("active");
}

function valueFromCard(card) {
  if (card.innerText.includes("ajustes") || card.innerText.includes("definida") || card.innerText.includes("ejecutar")) return 1;
  if (card.innerText.includes("negocio") || card.innerText.includes("criterio") || card.innerText.includes("manejables")) return 2;
  if (card.innerText.includes("capas") || card.innerText.includes("inestable") || card.innerText.includes("releases")) return 3;
  return 0;
}
