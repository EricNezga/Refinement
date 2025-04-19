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

  // === FONDO ANIMADO BINARIO ===
  const canvas = document.querySelector('.background-binary');
  const ctx = canvas.getContext('2d');

  const fibonacciValues = [1, 2, 3, 5, 8, 13, 21];
  const elements = [];
  const fontSize = 600;
  const cellSize = 300; // más espacio para evitar solapamientos

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    elements.length = 0;

    const cols = Math.ceil(canvas.width / cellSize) + 2;
    const rows = Math.ceil(canvas.height / cellSize) + 2;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const opacity = Math.random() * 0.7 + 0.2;

        elements.push({
          x: x * cellSize,
          y: y * cellSize,
          value: fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)],
          opacity,
          targetOpacity: opacity,
          direction: Math.random() > 0.5 ? 1 : -1,
          speed: Math.random() * 0.02 + 0.005,
          ySpeed: Math.random() * 0.1 + 0.02
        });
      }
    }
  }

  init();
  window.addEventListener("resize", init);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px 'Dongle', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    elements.forEach(el => {
      // Actualizamos opacidad suavemente
      el.opacity += el.speed * el.direction;

      if (el.opacity >= 0.9) {
        el.direction = -1;
        el.opacity = 0.9;
      } else if (el.opacity <= 0.2) {
        el.direction = 1;
        el.opacity = 0.2;
      }

      // Movimiento descendente
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
