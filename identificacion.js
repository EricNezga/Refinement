document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector(".background-binary");
  const ctx = canvas.getContext("2d");

  const fibonacciValues = [1, 2, 3, 5, 8, 13, 21];
  const fontSize = 1000;
  const columnSpacing = fontSize * 0.6;
  const columns = Math.floor(window.innerWidth / columnSpacing);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = `${fontSize}px 'Dongle', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const drops = new Array(columns).fill(0).map(() => ({
    y: Math.random() * canvas.height,
    opacity: Math.random() * 0.7 + 0.2
  }));

  function draw() {
    ctx.fillStyle = "rgba(254, 243, 199, 0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < columns; i++) {
      const x = i * columnSpacing + columnSpacing / 2;
      const drop = drops[i];

      // Alternar valor y opacidad levemente
      const value = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];
      drop.opacity += (Math.random() - 0.5) * 0.01;
      drop.opacity = Math.max(0.2, Math.min(0.9, drop.opacity));

      ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity.toFixed(2)})`;
      ctx.fillText(value, x, drop.y);

      drop.y += fontSize * 0.1;

      if (drop.y > canvas.height + fontSize) {
        drop.y = -fontSize;
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
});
