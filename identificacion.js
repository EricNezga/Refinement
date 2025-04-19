document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("username-input");
  const button = document.getElementById("login-button");

  button.addEventListener("click", () => {
    const name = input.value.trim();
    if (name) {
      localStorage.setItem("username", name);
      window.location.href = "index.html";
    } else {
      alert("Por favor introduce tu nombre");
    }
  });

  // === ANIMACIÓN DE FONDO ===
  const canvas = document.querySelector(".background-binary");
  const ctx = canvas.getContext("2d");

  const fibonacciValues = [1, 2, 3, 5, 8, 13, 21];

  const fontSize = 850;       // Muy grande
  const padding = 10;
  const cellSize = fontSize + padding;

  let elements = [];
  let cols, rows;

  function setupGrid() {
    cols = Math.ceil(window.innerWidth / cellSize);
    rows = Math.ceil(window.innerHeight / cellSize);
    elements = [];

    for (let y = 0; y < rows + 2; y++) {
      for (let x = 0; x < cols; x++) {
        elements.push({
          x: x * cellSize,
          y: y * cellSize - cellSize,
          value: fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)],
          opacity: Math.random() * 0.7 + 0.2,
          direction: Math.random() > 0.5 ? 1 : -1,
          speed: Math.random() * 0.005 + 0.002,
          ySpeed: Math.random() * 0.25 + 0.1
        });
      }
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  setupGrid();

  window.addEventListener("resize", () => {
    resizeCanvas();
    setupGrid(); // ⚠️ También regeneramos para evitar vacíos
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px 'Dongle', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (const el of elements) {
      el.opacity += el.speed * el.direction;

      if (el.opacity >= 0.9) {
        el.direction = -1;
        el.opacity = 0.9;
      } else if (el.opacity <= 0.2) {
        el.direction = 1;
        el.opacity = 0.2;
      }

      el.y += el.ySpeed;

      if (el.y > canvas.height + cellSize) {
        el.y = -cellSize;
        el.value = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${el.opacity.toFixed(2)})`;
      ctx.fillText(el.value, el.x + cellSize / 2, el.y + cellSize / 2);
    }

    requestAnimationFrame(animate);
  }

  animate();
});
