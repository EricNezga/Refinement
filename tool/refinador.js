// === USUARIO ===
const username = localStorage.getItem("username");
if (!username) {
  window.location.href = "../home/login.html";
} else {
  document.getElementById("user-greeting").textContent = `Hola, ${username}!`;
}

// === CIERRE DE SESIÓN ===
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("username");
  window.location.href = "../home/login.html";
});

// === VARIABLES ===
const storyPointDisplay = document.getElementById("story-point"); // SP cabecera
const averageSpDisplay = document.getElementById("average-sp");   // SP resumen lateral
const spBox = document.getElementById("sp-local");                // Badge principal con animación

const toggleBtn = document.getElementById("toggle-view");
const wrapper = document.querySelector(".wrapper");
const cardContents = document.querySelectorAll(".card-content");

// === SELECTOR DE TARJETAS ===
function select(element, value) {
  const container = element.closest(".factor");
  const cards = container.querySelectorAll(".card-row");

  cards.forEach(card => card.classList.remove("selected", "low", "medium", "high"));
  element.classList.add("selected");
  element.setAttribute("data-value", value);

  if (value === 1) element.classList.add("low");
  else if (value === 2) element.classList.add("medium");
  else if (value === 3) element.classList.add("high");

  const selectedValues = Array.from(document.querySelectorAll(".factor")).map(f => {
    const sel = f.querySelector(".selected");
    return sel ? parseInt(sel.getAttribute("data-value")) || 0 : 0;
  });

  const total = selectedValues.reduce((acc, val) => acc + val, 0);
  let sp = "-";
  if (total === 3) sp = 3;
  else if ([4, 5].includes(total)) sp = 5;
  else if ([6, 7].includes(total)) sp = 8;
  else if (total === 8) sp = 13;
  else if (total === 9) sp = 21;

  // Actualiza SP visualmente en los dos elementos
  storyPointDisplay.textContent = sp;
  if (averageSpDisplay) averageSpDisplay.textContent = sp;

  // Animación en el SP badge de cabecera
  if (spBox) {
    spBox.classList.remove("wobble");
    void spBox.offsetWidth;
    spBox.classList.add("wobble");
  }

  // Actualiza bubble del factor
  const factorName = container.dataset.factor.toLowerCase();
  const bubble = document.getElementById(`bubble-${factorName}`);
  if (bubble) {
    bubble.textContent = value;
    bubble.setAttribute("data-value", value);
    bubble.classList.add("active");

    bubble.style.animation = "none";
    void bubble.offsetWidth;
    bubble.style.animation = "pulse 0.25s ease";
  }

  // Reinicia animación de la selección
  element.style.animation = "none";
  void element.offsetWidth;
  element.style.animation = "pulse 0.25s ease";
}

// === TOGGLE VISTA SIMPLE ===
let isSimple = false;
toggleBtn?.addEventListener("click", () => {
  isSimple = !isSimple;
  wrapper.classList.toggle("simple", isSimple);

  cardContents.forEach(content => {
    if (isSimple) {
      content.style.transitionDelay = "0s";
      content.style.opacity = "0";
      content.style.visibility = "hidden";
      setTimeout(() => {
        if (wrapper.classList.contains("simple")) content.style.display = "none";
      }, 300);
    } else {
      content.style.display = "block";
      setTimeout(() => {
        content.style.transitionDelay = "200ms";
        content.style.opacity = "1";
        content.style.visibility = "visible";
      }, 50);
    }
  });

  if (toggleBtn) {
    toggleBtn.innerHTML = isSimple
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-closed-icon"><path d="m15 18-.722-3.25"/><path d="M2 8a10.645 10.645 0 0 0 20 0"/><path d="m20 15-1.726-2.05"/><path d="m4 15 1.726-2.05"/><path d="m9 18 .722-3.25"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`;
  }
});

// === MOSTRAR TAREA ACTIVA ===
const taskInput = document.getElementById("task-url");
const loadPreviewBtn = document.getElementById("load-preview");
const taskBanner = document.getElementById("active-task-banner");
const taskIdDisplay = document.getElementById("active-task-id");

loadPreviewBtn.addEventListener("click", () => {
  const url = taskInput.value.trim();
  if (!url) return;

  const match = url.match(/([A-Z]+-\d+)/i);
  const taskId = match ? match[1].toUpperCase() : "Tarea no reconocida";

  taskIdDisplay.textContent = `Tarea activa: ${taskId}`;
  taskBanner.classList.remove("hidden");
  taskBanner.classList.add("visible");
});
