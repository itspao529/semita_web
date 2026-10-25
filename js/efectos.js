// Ondas en los botones + corazoncitos al hacer clic
const adornos = ["💖", "✨", "🌸", "💗", "🦋", "💫"];

document.addEventListener("click", (ev) => {
  const btn = ev.target.closest(".btn");
  if (btn && !btn.disabled) {
    const r = btn.getBoundingClientRect();
    const d = Math.max(r.width, r.height);
    const onda = document.createElement("span");
    onda.className = "onda";
    onda.style.width = onda.style.height = d + "px";
    onda.style.left = ev.clientX - r.left - d / 2 + "px";
    onda.style.top = ev.clientY - r.top - d / 2 + "px";
    btn.appendChild(onda);
    setTimeout(() => onda.remove(), 700);
  }

  for (let i = 0; i < 7; i++) {
    const c = document.createElement("span");
    c.className = "chispa";
    c.textContent = adornos[Math.floor(Math.random() * adornos.length)];
    c.style.left = ev.clientX + "px";
    c.style.top = ev.clientY + "px";
    c.style.setProperty("--dx", (Math.random() * 140 - 70) + "px");
    c.style.setProperty("--dy", (-40 - Math.random() * 110) + "px");
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1000);
  }
});
