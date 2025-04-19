document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector(".background-binary");
  const ctx = canvas.getContext("2d");

  const fibonacciValues = [1, 2, 3, 5, 8, 13, 21];
  const fontSize = 1000;
  const cellSize = 400;
  const columns = 10;
  const rows = 8;
  const elements = [];

  const fixedSpeed = 0.4;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = `${fontSize}px 'Dongle', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      elements.push({
        x: x * cellSize + cellSize / 2,
        y: y * cellSize + cellSize / 2,
        value: fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)],
        opacity: Math.random() * 0.7 + 0.2,
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach(el => {
      // Opacidad suave
      el.opacity += 0.005 * el.direction;
      if (el.opacity > 0.9) {
        el.opacity = 0.9;
        el.direction = -1;
      } else if (el.opacity < 0.2) {
        el.opacity = 0.2;
        el.direction = 1;
      }

      // Caída uniforme
      el.y += fixedSpeed;

      if (el.y > canvas.height + cellSize / 2) {
        el.y = -cellSize / 2;
        el.value = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${el.opacity.toFixed(2)})`;
      ctx.fillText(el.value, el.x, el.y);
    });

    requestAnimationFrame(animate);
  }

  animate();
});
