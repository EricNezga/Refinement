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
  const fontSize = 600;
  const padding = 20;
  const cellSize = fontSize + padding;

  const elements = [];

  // Cálculo de filas y columnas solo una vez
  const cols = Math.ceil(window.innerWidth / cellSize);
  const rows = Math.ceil(window.innerHeight / cellSize);

  function generateGridElements() {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const value = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];

        elements.push({
          x: x * cellSize,
          y: y * cellSize,
          value: value,
          opacity: Math.random() * 0.7 + 0.2,
          direction: Math.random() > 0.5 ? 1 : -1,
          speed: Math.random() * 0.005 + 0.002,
          ySpeed: Math.random() * 0.15 + 0.05
        });
      }
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  generateGridElements();

  window.addEventListener("resize", () => {
    resizeCanvas(); // Solo redimensiona, sin reiniciar los elementos
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px 'Dongle', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    elements.forEach(el => {
      el.opacity += el.speed * el.direction;

      if (el.opacity >= 0.9) {
        el.direction = -1;
        el.opacity = 0.9;
      } else if (el.opacity <= 0.2) {
        el.direction = 1;
        el.opacity = 0.2;
      }

      // Movimiento descendente suave
      el.y += el.ySpeed;
      if (el.y > canvas.height + fontSize) {
        el.y = -fontSize;
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${el.opacity.toFixed(3)})`;
      ctx.fillText(el.value, el.x + cellSize / 2, el.y + cellSize / 2);
    });

    requestAnimationFrame(animate);
  }

  animate();
});
