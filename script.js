const storyPointDisplay = document.getElementById("story-point");
const toggleBtn = document.getElementById("toggleView");
const wrapper = document.querySelector(".wrapper");

function select(element, value) {
  const container = element.closest(".factor");
  const cards = container.querySelectorAll(".card-row");

  cards.forEach(card => card.classList.remove("selected"));
  element.classList.add("selected");
  element.setAttribute("data-value", value);

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
  bubble.classList.add("active");
}

// Toggle simple view
toggleBtn.addEventListener("click", () => {
  wrapper.classList.toggle("simple");
  toggleBtn.innerHTML = wrapper.classList.contains("simple")
    ? `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-eye-closed-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-.722-3.25"/><path d="M2 8a10.645 10.645 0 0 0 20 0"/><path d="m20 15-1.726-2.05"/><path d="m4 15 1.726-2.05"/><path d="m9 18 .722-3.25"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`;
});

// Show toggle on resize back to wide
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    toggleBtn.style.display = "flex";
  } else if (!wrapper.classList.contains("simple")) {
    toggleBtn.style.display = "none";
  }
});
