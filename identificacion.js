document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector(".background-binary");
  const ctx = canvas.getContext("2d");

  const fibonacciValues = [1, 2, 3, 5, 8, 13, 21];
  const fontSize = 1000;
  const verticalSpacing = fontSize * 1.15;
  const horizontalSpacing = fontSize * 0.8;
  const columns = Math.floor(window.innerWidth / horizontalSpacing);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = `${fontSize}px 'Dongle', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const drops = Array.from({ length: columns }, (_, i) => ({
    x: i * horizontalSpacing + horizontalSpacing / 2,
    y: Math.random() * -canvas.height,
    opacity: Math.random() * 0.6 + 0.2,
    direction: Math.random() > 0.5 ? 1 : -1,
    opacitySpeed: Math.random() * 0.001 + 0.0005, // 🔁 más lento
    ySpeed: 0.3 + Math.random() * 0.15 // 👇 más lento
  }));

  function draw() {
    // Fondo translúcido suave
    ctx.fillStyle = "rgba(254, 243, 199, 0.015)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drops.forEach(drop => {
      const value = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];

      // Oscilación de opacidad mucho más lenta
      drop.opacity += drop.opacitySpeed * drop.direction;
      if (drop.opacity > 0.9) {
        drop.opacity = 0.9;
        drop.direction = -1;
      } else if (drop.opacity < 0.2) {
        drop.opacity = 0.2;
        drop.direction = 1;
      }

      // Dibujar número
      ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity.toFixed(2)})`;
      ctx.fillText(value, drop.x, drop.y);

      // Mover hacia abajo suavemente
      drop.y += drop.ySpeed;

      // Si se sale, vuelve arriba
      if (drop.y > canvas.height + verticalSpacing) {
        drop.y = -verticalSpacing * 2;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
});
