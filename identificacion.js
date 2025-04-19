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
  const fontSize = 500;
  const cellSize = 180;

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
          ySpeed: Math.random() * 0.05 + 0.02
        });
      }
    }
  }

  init();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${fontSize}px 'Dongle', sans-serif`;

    elements.forEach(el => {
      // Movimiento descendente suave
      el.y += el.ySpeed;
      if (el.y > canvas.height + fontSize / 2) {
        el.y = -fontSize;
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${el.opacity.toFixed(3)})`;
      ctx.fillText(el.value, el.x, el.y);
    });

    requestAnimationFrame(animate);
  }

  animate();
});
