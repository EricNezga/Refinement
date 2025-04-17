const totalDisplay = document.getElementById("total");
const storyPointDisplay = document.getElementById("story-point");

function select(element, value) {
  const container = element.closest(".factor");
  const cards = container.querySelectorAll(".card-row");
  cards.forEach(card => card.classList.remove("selected"));
  element.classList.add("selected");

  const selected = Array.from(document.querySelectorAll(".factor")).map(f => {
    const sel = f.querySelector(".selected");
    if (!sel) return 0;
    return parseInt(sel.querySelector(".card-title").textContent.match(/\d+/)[0]);
  });

  const total = selected.reduce((acc, val) => acc + val, 0);
  totalDisplay.textContent = total;

  let sp = "-";
  if (total >= 3 && total <= 4) sp = 3;
  else if (total === 5) sp = 5;
  else if (total >= 6 && total <= 7) sp = 8;
  else if (total === 8) sp = 13;
  else if (total === 9) sp = 21;

  storyPointDisplay.textContent = sp;
}
