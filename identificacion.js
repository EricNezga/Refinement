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
  const fontSize = 700;
  const cellSize = 400; // tamaño fijo de celda
  const columns = 9;
  const rows = 7;
  const elements = [];

  // 📐 canvas fijo al cargar, sin regenerarse en resize
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = `${fontSize}px 'Dongle', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 🧱 generar grilla fija
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      elements.push({
        x: x * cellSize + cellSize / 2,
        y: y * cellSize + cellSize / 2,
        value: fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)],
        opacity: Math.random() * 0.7 + 0.2,
        direction: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 0.005 + 0.002,
        ySpeed: Math.random() * 0.3 + 0.1
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach(el => {
      el.opacity += el.speed * el.direction;

      if (el.opacity > 0.9) {
        el.opacity = 0.9;
        el.direction = -1;
      } else if (el.opacity < 0.2) {
        el.opacity = 0.2;
        el.direction = 1;
      }

      el.y += el.ySpeed;
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
