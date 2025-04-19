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

  const fontSize = 1000;
  const padding = -200; // 🔽 reduce espacio entre números verticalmente
  const columnSpacing = fontSize * 0.45; // 🔽 reduce espacio horizontal
  const columns = Math.floor(window.innerWidth / columnSpacing);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = `${fontSize}px 'Dongle', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const elements = [];

  // Crear columnas con pilas de números
  for (let col = 0; col < columns; col++) {
    const x = col * columnSpacing + columnSpacing / 2;
    let y = -Math.random() * canvas.height;

    while (y < canvas.height + fontSize) {
      elements.push({
        x,
        y,
        value: fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)],
        opacity: Math.random() * 0.7 + 0.2,
        direction: Math.random() > 0.5 ? 1 : -1
      });
      y += fontSize + padding;
    }
  }

  const speed = 0.4;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const el of elements) {
      el.y += speed;

      // Oscilación de opacidad
      el.opacity += 0.005 * el.direction;
      if (el.opacity > 0.9) {
        el.opacity = 0.9;
        el.direction = -1;
      } else if (el.opacity < 0.2) {
        el.opacity = 0.2;
        el.direction = 1;
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${el.opacity.toFixed(2)})`;
      ctx.fillText(el.value, el.x, el.y);

      // Si sale por abajo, reaparece arriba
      if (el.y > canvas.height + fontSize) {
        el.y = -fontSize;
        el.value = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
});
