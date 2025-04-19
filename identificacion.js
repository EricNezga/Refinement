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
    value: fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)],
    opacity: Math.random() * 0.6 + 0.2,
    direction: Math.random() > 0.5 ? 1 : -1,
    opacitySpeed: Math.random() * 0.001 + 0.0005,
    ySpeed: 0.3 + Math.random() * 0.15
  }));

  function draw() {
    ctx.fillStyle = "rgba(254, 243, 199, 0.015)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drops.forEach(drop => {
      // Actualiza opacidad
      drop.opacity += drop.opacitySpeed * drop.direction;
      if (drop.opacity > 0.9) {
        drop.opacity = 0.9;
        drop.direction = -1;
      } else if (drop.opacity < 0.2) {
        drop.opacity = 0.2;
        drop.direction = 1;
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity.toFixed(2)})`;
      ctx.fillText(drop.value, drop.x, drop.y);

      drop.y += drop.ySpeed;

      // Al salir, reiniciar en la parte superior con otro número
      if (drop.y > canvas.height + verticalSpacing) {
        drop.y = -verticalSpacing * 2;
        drop.value = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
});
