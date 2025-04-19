document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector(".background-binary");
  const ctx = canvas.getContext("2d");

  const fibonacciValues = [1, 2, 3, 5, 8, 13, 21];
  const fontSize = 1000;
  const verticalSpacing = fontSize * 1.1; // Extra espacio entre filas
  const horizontalSpacing = fontSize * 0.75; // Espacio entre columnas

  const columns = Math.floor(window.innerWidth / horizontalSpacing);
  const rows = Math.ceil(window.innerHeight / verticalSpacing) + 2;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = `${fontSize}px 'Dongle', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  // Crear drops por columna
  const drops = Array.from({ length: columns }, (_, i) => ({
    x: i * horizontalSpacing + horizontalSpacing / 2,
    y: Math.random() * -canvas.height, // empieza fuera del canvas
    opacity: Math.random() * 0.7 + 0.2,
  }));

  function draw() {
    ctx.fillStyle = "rgba(254, 243, 199, 0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let drop of drops) {
      const value = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];
      ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity.toFixed(2)})`;
      ctx.fillText(value, drop.x, drop.y);

      // Mover hacia abajo de forma uniforme
      drop.y += 2; // velocidad suave

      if (drop.y > canvas.height + verticalSpacing) {
        drop.y = -verticalSpacing * 2; // reaparece arriba
        drop.opacity = Math.random() * 0.7 + 0.2;
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
});
