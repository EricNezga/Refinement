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

// ANIMACIÓN BINARIA DE FONDO
const canvas = document.querySelector('.background-binary');
const ctx = canvas.getContext('2d');

let ypos = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const cols = Math.floor(canvas.width / 20);
  ypos = Array(cols).fill(0);
}

resizeCanvas(); // Inicial
window.addEventListener("resize", resizeCanvas);

function binaryMatrix() {
  ctx.fillStyle = 'rgba(254, 243, 199, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#1f2937';
  ctx.font = '18px monospace';

  ypos.forEach((y, i) => {
    const text = Math.round(Math.random());
    const x = i * 20;
    ctx.fillText(text, x, y);

    ypos[i] = y > canvas.height + Math.random() * 100 ? 0 : y + 20;
  });
}

setInterval(binaryMatrix, 80);
