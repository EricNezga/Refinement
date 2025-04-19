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
});

// ANIMACION DE FONDO

const canvas = document.querySelector('.background-binary');
const ctx = canvas.getContext('2d');

let columns = 0;
let drops = [];
const fibonacciValues = [1, 2, 3, 5, 8, 13, 21];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  columns = Math.floor(canvas.width / 40); // más grande = menos columnas
  drops = Array(columns).fill(0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function draw() {
  // Fondo con opacidad para "arrastrar" el rastro, da efecto de brillo suave
  ctx.fillStyle = 'rgba(254, 243, 199, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "32px Fredoka, sans-serif";
  ctx.fillStyle = '#1f2937';

  for (let i = 0; i < drops.length; i++) {
    const text = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];
    const x = i * 40;
    const y = drops[i] * 40;

    ctx.fillText(text, x, y);

    // Reinicia si sale del canvas, de lo contrario continúa cayendo
    if (y > canvas.height + Math.random() * 200) {
      drops[i] = 0;
    } else {
      drops[i]++;
    }
  }
}

setInterval(draw, 100);
