const totalDisplay = document.getElementById("total");
const storyPointDisplay = document.getElementById("story-point");

function select(element, value) {
    const container = element.parentElement;
    const cards = container.querySelectorAll(".card");
    cards.forEach(c => c.classList.remove("selected"));
    element.classList.add("selected");

    const selectedValues = Array.from(document.querySelectorAll(".factor")).map(f => {
        const selected = f.querySelector(".selected");
        if (!selected) return 0;
        return parseInt(selected.querySelector(".card-title").textContent.match(/\d+/)[0]);
    });

    const total = selectedValues.reduce((a, b) => a + b, 0);
    totalDisplay.textContent = total;

    let sp = "-";
    if (total >= 3 && total <= 4) sp = 3;
    else if (total === 5) sp = 5;
    else if (total === 6 || total === 7) sp = 8;
    else if (total === 8) sp = 13;
    else if (total === 9) sp = 21;

    storyPointDisplay.textContent = sp;
    storyPointDisplay.className = ""; // Limpia clases anteriores
    if (sp !== "-") {
        storyPointDisplay.classList.add(`sp-${sp}`);
}}

