const Url =
    "https://script.google.com/macros/s/AKfycbydTOv6aVnMyu_nI2rrbX9Ys3xkdJI6On5yui86NBEXwDnGCxBhhcPVuTZLMJrEN1QIAQ/exec";
let periodo;

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


