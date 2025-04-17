const storyPointDisplay = document.getElementById("story-point");
const toggleViewBtn = document.getElementById("toggle-view");
const wrapper = document.querySelector(".wrapper");
const eyeIcon = document.getElementById("eye-icon");

let simpleMode = false;

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
  if (total === 3) sp = 3;
  else if (total === 4 || total === 5) sp = 5;
  else if (total === 6 || total === 7) sp = 8;
  else if (total === 8) sp = 13;
  else if (total === 9) sp = 21;

  storyPointDisplay.textContent = sp;

  const factorName = container.dataset.factor.toLowerCase();
  const bubble = document.getElementById(`bubble-${factorName}`);
  bubble.textContent = value;
  bubble.classList.add("active");
}

function valueFromCard(card) {
  return parseInt(card.getAttribute("data-value")) || 0;
}

toggleViewBtn.addEventListener("click", () => {
  simpleMode = !simpleMode;
  wrapper.classList.toggle("simple", simpleMode);
  // Cambia el ícono
  eyeIcon.setAttribute(
    "d",
    simpleMode
      ? "M17.94 17.94 15 15m-6 0-2.94 2.94M1 1l22 22M9.88 9.88a3 3 0 0 0 4.24 4.24M7.67 4.93A10.72 10.72 0 0 1 12 4c4.5 0 8.36 2.94 9.88 7-.37 1.02-.9 1.97-1.57 2.83M6.14 6.14C3.54 7.77 1.95 10.04 1 12c.69 1.35 1.71 2.57 2.93 3.55"
      : "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
  );
});
