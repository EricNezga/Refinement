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

  // === FONDO BINARIO ESTÁTICO PERO ILUMINADO ===
  const canvas = document.querySelector('.background-binary');
  const ctx = canvas.getContext('2d');
  const fibonacciValues = [1, 2, 3, 5, 8, 13, 21];
  const spacing = 10;
  const elements = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    elements.length = 0;

    const cellSize = canvas.height / 9; // cada número ocupa 1/9 vertical
    const fontSize = cellSize * 0.9;    // poco margen interno

    const cols = Math.floor(canvas.width / (cellSize + spacing));
    const rows = Math.floor(canvas.height / (cellSize + spacing));

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        elements.push({
          x: x * (cellSize + spacing),
          y: y * (cellSize + spacing),
          value: fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)],
          opacity: Math.random() * 0.3 + 0.2,
          direction: Math.random() > 0.5 ? 1 : -1,
          speed: Math.random() * 0.005 + 0.001,
          fontSize: fontSize
        });
      }
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach(el => {
      el.opacity += el.speed * el.direction;

      if (el.opacity >= 0.7) el.direction = -1;
      if (el.opacity <= 0.2) el.direction = 1;

      ctx.font = `${el.fontSize}px 'Dongle', sans-serif`;
      ctx.fillStyle = `rgba(245, 245, 245, ${el.opacity})`;
      ctx.fillText(el.value, el.x, el.y + el.fontSize * 0.75); // centrado vertical
    });

    requestAnimationFrame(animate);
  }

  animate();
});
