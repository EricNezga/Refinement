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

// ANIMACIÓN DE FONDO

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
  // Fondo con opacidad baja para crear efecto de arrastre muy suave
  ctx.fillStyle = 'rgba(254, 243, 199, 0.02)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '200px Dongle, sans-serif';

  for (let i = 0; i < drops.length; i++) {
    const value = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];
    const x = i * 40;
    const y = drops[i] * 90;

    // Color con opacidad aleatoria entre 10% y 40%
    const opacity = 0.1 + Math.random() * 0.3;
    ctx.fillStyle = `rgba(240, 240, 240, ${opacity})`; // gris muy claro tirando a blanco

    ctx.fillText(value, x, y);

    // Reiniciar si se sale
    if (y > canvas.height + Math.random() * 200) {
      drops[i] = 0;
    } else {
      drops[i]++;
    }
  }
}

setInterval(draw, 100);
