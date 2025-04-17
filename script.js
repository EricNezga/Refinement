const totalDisplay = document.getElementById("total");
const storyPointDisplay = document.getElementById("story-point");

function select(btn, value) {
    const container = btn.parentElement;
    const buttons = container.querySelectorAll("button");
    buttons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    const selectedValues = Array.from(document.querySelectorAll(".factor"))
        .map(f => {
            const selected = f.querySelector(".selected");
            return selected ? parseInt(selected.textContent.match(/\d+/)[0]) : 0;
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
}
