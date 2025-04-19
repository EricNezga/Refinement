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

  // === FONDO BINARIO TIPO "GRID" ===
  const canvas = document.querySelector('.background-binary');
  const ctx = canvas.getContext('2d');
  const fibonacciValues = [1, 2, 3, 5, 8, 13, 21];
  const elements = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    elements.length = 0;

    const cellWidth = 160;   // ← el ancho de cada celda (basado en tu imagen)
    const cellHeight = 160;  // ← el alto de cada celda

    const cols = Math.floor(canvas.width / cellWidth);
    const rows = Math.floor(canvas.height / cellHeight);
    const fontSize = 80; // Ajustado para el tamaño de celda

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        elements.push({
          x: x * cellWidth + cellWidth / 2,
          y: y * cellHeight + cellHeight / 2,
          value: fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)],
          opacity: Math.random() * 0.3 + 0.2,
          direction: Math.random() > 0.5 ? 1 : -1,
          speed: Math.random() * 0.005 + 0.002,
          fontSize: fontSize
        });
      }
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    elements.forEach(el => {
      el.opacity += el.speed * el.direction;

      if (el.opacity >= 0.6) el.direction = -1;
      if (el.opacity <= 0.1) el.direction = 1;

      ctx.font = `${el.fontSize}px 'Dongle', sans-serif`;
      ctx.fillStyle = `rgba(245, 245, 245, ${el.opacity})`;
      ctx.fillText(el.value, el.x, el.y);
    });

    requestAnimationFrame(animate);
  }

  animate();
});
