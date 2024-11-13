window.addEventListener("load", () => {
    let nombre = document.getElementById("offcanvasExampleLabel");
    nombre.innerHTML = sessionStorage.getItem("nombre");
});

function inicio() {
    window.location.href = "principal.html";
}

async function primer_periodo() {
    window.location.href = "primer_periodo.html";
}

async function segundo_periodo() {
    window.location.href = "segundo_periodo.html";
}

async function tercer_periodo() {
    window.location.href = "tercer_periodo.html";
}
