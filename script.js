const storyPointDisplay = document.getElementById("story-point");
const toggleBtn = document.getElementById("toggle-view");
const wrapper = document.querySelector(".wrapper");

function select(element, value) {
  const container = element.closest(".factor");
  const cards = container.querySelectorAll(".card-row");

  cards.forEach(card => card.classList.remove("selected", "low", "medium", "high"));
  element.classList.add("selected");
  element.setAttribute("data-value", value);

  // Añadir clase de color dependiendo del valor
  if (value === 1) element.classList.add("low");
  else if (value === 2) element.classList.add("medium");
  else if (value === 3) element.classList.add("high");

  const selectedValues = Array.from(document.querySelectorAll(".factor")).map(f => {
    const sel = f.querySelector(".selected");
    if (!sel) return 0;
    return parseInt(sel.getAttribute("data-value")) || 0;
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
  bubble.setAttribute("data-value", value); // Añade esto
  bubble.classList.add("active");
}

// Cambiar vista simplificada
let isSimple = false;
toggleBtn.addEventListener("click", () => {
  isSimple = !isSimple;
  wrapper.classList.toggle("simple", isSimple);

  toggleBtn.innerHTML = isSimple
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-closed-icon"><path d="m15 18-.722-3.25"/><path d="M2 8a10.645 10.645 0 0 0 20 0"/><path d="m20 15-1.726-2.05"/><path d="m4 15 1.726-2.05"/><path d="m9 18 .722-3.25"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`;
});
