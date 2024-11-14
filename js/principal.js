const Url =
    "https://script.google.com/macros/s/AKfycbydTOv6aVnMyu_nI2rrbX9Ys3xkdJI6On5yui86NBEXwDnGCxBhhcPVuTZLMJrEN1QIAQ/exec";
let periodo;

window.addEventListener("load", () => {
    let nombre = document.getElementById("offcanvasExampleLabel");
    nombre.innerHTML = sessionStorage.getItem("nombre");
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
    sessionStorage.setItem("periodo", sessionStorage.getItem("grado")+"-2");
    window.location.href = "primer_periodo.html";
}

async function tercer_periodo() {
    sessionStorage.setItem("periodo", sessionStorage.getItem("grado")+"-3");
    window.location.href = "primer_periodo.html";
}

async function actividades(){
    window.location.href ="actividades.html";
}
