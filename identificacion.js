document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("username-input");
  const button = document.getElementById("login-button");

  button.addEventListener("click", () => {
    const name = input.value.trim();
    if (name) {
      localStorage.setItem("username", name);
      window.location.href = "index.html"; // Redirige al refinador
    } else {
      alert("Por favor introduce tu nombre");
    }
  });

  // === FONDO ANIMADO SUAVE ===
  const canvas = document.querySelector('.background-binary');
  const ctx = canvas.getContext('2d');
  const fibonacciValues = [01, 02, 03, 05, 08, 13, 21];
  const fontSize = 120;
  const columns = 5; // control de número total
  const rows = 4;
  const elements = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    elements.length = 0;

    for (let i = 0; i < columns * rows; i++) {
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)],
        opacity: Math.random() * 0.3 + 0.2, // más visibles incluso cuando no están iluminados
        direction: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 0.002 + 0.001
      });
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px 'Dongle', sans-serif`;
    ctx.textAlign = "center";

    elements.forEach(el => {
      el.opacity += el.speed * el.direction;

      if (el.opacity >= 0.7) el.direction = -1;
      if (el.opacity <= 0.2) el.direction = 1;

      ctx.fillStyle = `rgba(245, 245, 245, ${el.opacity})`;
      ctx.fillText(el.value, el.x, el.y);
    });

    requestAnimationFrame(animate);
  }

  animate();
});
