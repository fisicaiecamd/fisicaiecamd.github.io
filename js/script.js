const Url =
    "https://script.google.com/macros/s/AKfycbzFKQkCe2LEcpVAWeFAThoiy91WduesBhMTLlneGaHNhzW1GIKesfuKIIdgkq4hli8c/exec";

let init = document.getElementById("btnLogin");
let loadding = document.getElementById("loadin");
let msg = document.getElementById("msgError");

init.addEventListener("click", (e) => {
    msg.innerHTML = "";
    loadding.classList.remove("d-none");
    init.classList.add("disabled");
    listarEstudiante(document.querySelector("#floatingInput").value);
});

async function listarEstudiante(id) {
    try {
        loadding.classList.remove("d-none");
        init.classList.add("disabled");

        const result = await fetch(`${Url}?func=buscar&id=${id}`);
        loadding.classList.add("d-none");
        init.classList.remove("disabled");

        if (!result.ok) {
            throw new Error("Error en la solicitud");
        }

        const data = await result.json();

        if (data.grado && data.nombre && data.id) {
            sessionStorage.clear();
            sessionStorage.setItem("grado", data.grado);
            sessionStorage.setItem("id", data.id);
            sessionStorage.setItem("nombre", data.nombre);
            window.location.href = "principal.html";
        } else {
            msg.innerHTML = "El estudiante no existe en la base de datos";
        }
    } catch (error) {
        loadding.classList.add("d-none");
        init.classList.remove("disabled");
        msg.innerHTML = error.message === "Error en la solicitud" ? "Documento inválido" : error.message;
        console.log("Error:", error.message);
    }
}
