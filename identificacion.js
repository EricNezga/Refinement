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

  // === FONDO ANIMADO ===
  const canvas = document.querySelector('.background-binary');
  const ctx = canvas.getContext('2d');
  const fibonacciValues = [1, 2, 3, 5, 8, 13, 21];

  const elements = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    elements.length = 0;

    const cellWidth = 180;
    const cellHeight = 180;
    const fontSize = 150;

    const cols = Math.floor(canvas.width / cellWidth);
    const rows = Math.floor(canvas.height / cellHeight);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        elements.push({
          x: x * cellWidth + cellWidth / 2,
          y: y * cellHeight + cellHeight / 2,
          value: fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)],
          opacity: Math.random() * 0.5 + 0.3,
          direction: Math.random() > 0.5 ? 1 : -1,
          speed: Math.random() * 0.003 + 0.0015,
          fontSize: fontSize,
          lastChange: Date.now(),
          changeInterval: 2000 + Math.random() * 3000 // cada 2–5s cambia
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

    const now = Date.now();

    elements.forEach(el => {
      // Cambio de número periódico
      if (now - el.lastChange > el.changeInterval) {
        el.value = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];
        el.lastChange = now;
      }

      // Transición de opacidad
      el.opacity += el.speed * el.direction;
      if (el.opacity >= 0.8) el.direction = -1;
      if (el.opacity <= 0.3) el.direction = 1;

      ctx.font = `${el.fontSize}px 'Dongle', sans-serif`;
      ctx.fillStyle = `rgba(229, 231, 235, ${el.opacity})`; // gris suave
      ctx.fillText(el.value, el.x, el.y);
    });

    requestAnimationFrame(animate);
  }

  animate();
});
