document.addEventListener("DOMContentLoaded", () => {
  const inputName = document.getElementById("username-input");
  const inputEmail = document.getElementById("email-input");
  const loginButton = document.getElementById("login-button");
  const guestButton = document.getElementById("guest-button");
  const emailError = document.getElementById("email-error");

  const avatarModal = document.getElementById("avatarModal");
  const avatarCloseBtn = document.getElementById("avatarCloseBtn");
  const avatarIcons = avatarModal?.querySelectorAll(".avatar");
  const confirmButton = document.getElementById("confirmAvatarBtn");
  const avatarError = document.getElementById("avatar-error");

  let selectedAvatar = null;
  let selectedColor = null;

  const colorOptions = ["#facc15", "#38bdf8", "#4ade80", "#a78bfa", "#f472b6"];
  const getRandomColor = () => colorOptions[Math.floor(Math.random() * colorOptions.length)];

  // === Mostrar y resetear modal de avatar ===
  const openAvatarModal = () => {
    selectedAvatar = null;
    avatarError.textContent = "";

    avatarIcons?.forEach(icon => {
      icon.classList.remove("selected", "animate");
      icon.setAttribute("stroke", "#1f2937");
      icon.style.backgroundColor = "#f9fafb";
    });

    avatarModal.classList.remove("hidden");
  };

  // === Cerrar modal de avatar ===
  avatarCloseBtn?.addEventListener("click", () => {
    avatarModal.classList.add("hidden");
    avatarError.textContent = "";

    if (selectedAvatar) {
      selectedAvatar.classList.remove("selected", "animate");
      selectedAvatar.setAttribute("stroke", "#1f2937");
      selectedAvatar.style.backgroundColor = "#f9fafb";
      selectedAvatar = null;
    }
  });

  // === Confirmar avatar y continuar ===
  confirmButton?.addEventListener("click", () => {
    if (!selectedAvatar) {
      avatarError.textContent = "Por favor selecciona un avatar antes de continuar.";
      return;
    }

    avatarError.textContent = "";
    const iconId = selectedAvatar.getAttribute("data-avatar");
    localStorage.setItem("avatar", iconId);
    localStorage.setItem("avatarColor", selectedColor || "#facc15");

    window.location.href = "refinador.html";
  });

  // === Selección de avatar con reinicio de animación siempre ===
  avatarIcons?.forEach(icon => {
    icon.addEventListener("click", () => {
      avatarIcons.forEach(i => {
        i.classList.remove("selected", "animate");
        i.setAttribute("stroke", "#1f2937");
        i.style.backgroundColor = "#f9fafb";
      });

      selectedAvatar = icon;
      selectedColor = getRandomColor();

      icon.classList.add("selected");
      icon.setAttribute("stroke", "#ffffff");
      icon.style.backgroundColor = selectedColor;

      // Forzar reinicio de animación
      icon.classList.remove("animate");
      void icon.offsetWidth;
      icon.classList.add("animate");

      avatarError.textContent = "";
    });
  });

  // === Login con email ===
  loginButton.addEventListener("click", () => {
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();

    emailError.style.display = "none";
    inputEmail.classList.remove("shake");

    if (!email) {
      emailError.textContent = "Por favor introduce tu correo electrónico.";
      emailError.style.display = "block";
      inputEmail.classList.add("shake");
      setTimeout(() => inputEmail.classList.remove("shake"), 500);
      return;
    }

    const finalName = name || email.split("@")[0];
    localStorage.setItem("username", finalName);
    localStorage.setItem("email", email);
    localStorage.setItem("guest", "false");

    openAvatarModal();
  });

  // === Login como invitado ===
  guestButton.addEventListener("click", () => {
    localStorage.setItem("username", `Invitado_${Math.floor(Math.random() * 1000)}`);
    localStorage.setItem("guest", "true");
    localStorage.removeItem("email");

    openAvatarModal();
  });

  // === Animación de fondo ===
  const canvas = document.querySelector(".background-binary");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const fibonacciValues = [1, 2, 3, 5, 8, 13, 21];
  const columns = 6;
  const rowsVisible = 3;
  const totalRows = 4;
  const cellSize = Math.ceil(window.innerHeight / rowsVisible);
  const fontSize = cellSize * 2;
  const elements = [];
  const fixedSpeed = 0.4;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = `${fontSize}px 'Dongle', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  function getNonRepeatingRandom(prevValue) {
    let newValue;
    do {
      newValue = fibonacciValues[Math.floor(Math.random() * fibonacciValues.length)];
    } while (newValue === prevValue);
    return newValue;
  }

  for (let y = 0; y < totalRows; y++) {
    for (let x = 0; x < columns; x++) {
      const prev = elements.length > 0 ? elements[elements.length - 1].value : null;
      elements.push({
        x: x * cellSize + cellSize / 2,
        y: y * cellSize + cellSize / 2,
        value: getNonRepeatingRandom(prev),
        opacity: Math.random() * 0.7 + 0.2,
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach((el, i) => {
      el.opacity += 0.003 * el.direction;
      if (el.opacity > 0.9) {
        el.opacity = 0.9;
        el.direction = -1;
      } else if (el.opacity < 0.2) {
        el.opacity = 0.2;
        el.direction = 1;
      }

      el.y += fixedSpeed;

      if (el.y > canvas.height + cellSize / 2) {
        el.y = -cellSize / 2;
        const previous = elements[i - columns]?.value ?? null;
        el.value = getNonRepeatingRandom(previous);
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${el.opacity.toFixed(2)})`;
      ctx.fillText(el.value, el.x, el.y);
    });

    requestAnimationFrame(animate);
  }

  animate();
});
