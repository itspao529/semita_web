// Cambia esta URL cuando subas la API a Render
const API_URL = "https://semita-api-pjk7.onrender.com";

const $ = (id) => document.getElementById(id);

async function enviar(ruta, cuerpo) {
  try {
    const r = await fetch(API_URL + ruta, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo)
    });
    const data = await r.json();
    $("aviso").textContent = r.ok ? "" : (data.error || "Error");
    actualizar();
  } catch (e) {
    $("aviso").textContent = "No se pudo conectar con la API";
  }
}

async function actualizar() {
  try {
    const r = await fetch(API_URL + "/api/estado");
    const e = await r.json();

    $("distancia").textContent = e.distancia.toFixed(1);

    $("modoActual").textContent = e.modo;
    $("modoActual").className =
      "badge badge-estado " + (e.modo === "automatico" ? "bg-success" : "bg-primary");

    $("motorActual").textContent = e.motor;

    $("motorActual").className =
  "badge badge-estado " +
  (e.motor === "detenido" ? "bg-danger" : "bg-warning text-dark motor-activo");

    // En modo automático los botones del motor se desactivan
    const auto = e.modo === "automatico";
    ["btnIzq", "btnDer", "btnStop"].forEach((id) => ($(id).disabled = auto));
    $("btnManual").classList.toggle("active", !auto);
    $("btnAuto").classList.toggle("active", auto);

    $("conexion").textContent = "Conectado a la API ✔";
  } catch (e) {
    $("conexion").textContent = "Sin conexión con la API ✖";
  }
}

$("btnManual").onclick = () => enviar("/api/modo", { modo: "manual" });
$("btnAuto").onclick   = () => enviar("/api/modo", { modo: "automatico" });
$("btnIzq").onclick    = () => enviar("/api/motor", { accion: "izquierda" });
$("btnDer").onclick    = () => enviar("/api/motor", { accion: "derecha" });
$("btnStop").onclick   = () => enviar("/api/motor", { accion: "detener" });

actualizar();
setInterval(actualizar, 1000); // refresca cada segundo