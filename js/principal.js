const Url =
    "https://script.google.com/macros/s/AKfycbzFKQkCe2LEcpVAWeFAThoiy91WduesBhMTLlneGaHNhzW1GIKesfuKIIdgkq4hli8c/exec";

window.addEventListener("load", () => {
    if (sessionStorage.getItem("nombre")) {
        let nombre = document.getElementById("offcanvasExampleLabel");
        nombre.innerHTML = sessionStorage.getItem("nombre");
    } else {
        window.location.href = "index.html";
    }
});

function inicio() {
    sessionStorage.removeItem("periodo");
    window.location.href = "principal.html";
}

async function primer_periodo() {
    sessionStorage.setItem("periodo", sessionStorage.getItem("grado"));
    window.location.href = "primer_periodo.html";
}

async function segundo_periodo() {
    sessionStorage.setItem("periodo", sessionStorage.getItem("grado") + "-2");
    window.location.href = "primer_periodo.html";
}

async function tercer_periodo() {
    sessionStorage.setItem("periodo", sessionStorage.getItem("grado") + "-3");
    window.location.href = "primer_periodo.html";
}

async function actividades() {
    window.location.href = "actividades.html";
}
