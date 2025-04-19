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
  const fontSize = 500; // Tamaño enorme
  const cellSize = 180; // Separación base entre números

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.ceil(canvas.width / cellSize) + 2;
    const rows = Math.ceil(canvas.height / cellSize) + 2;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        elements.push({
          x: x * cellSize,
          y: y * cellSize,
          value: fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)],
          opacity: Math.random() * 0.7 + 0.2,
          direction: Math.random() > 0.5 ? 1 : -1,
          speed: Math.random() * 0.003 + 0.001,
          lastChange: Date.now(),
          changeInterval: 3000 + Math.random() * 3000
        });
      }
    }
  }

  init(); // Solo una vez para que no parpadee con resize

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    elements.forEach(el => {
      const now = Date.now();
      if (now - el.lastChange > el.changeInterval) {
        el.value = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];
        el.lastChange = now;
      }

      el.opacity += el.speed * el.direction;
      if (el.opacity > 0.9) el.direction = -1;
      if (el.opacity < 0.2) el.direction = 1;

      ctx.font = `${fontSize}px 'Dongle', sans-serif`;
      ctx.fillStyle = `rgba(255, 255, 255, ${el.opacity})`; // blanco puro
      ctx.fillText(el.value, el.x, el.y);
    });

    requestAnimationFrame(animate);
  }

  animate();
});
