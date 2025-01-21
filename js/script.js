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
    let data;
    try {
        const result = await fetch(Url + "?func=buscar&id=" + id);
        if (result.ok) {
            data = await result.json();
            loadding.classList.add("d-none");
            init.classList.remove("disabled");
            
            // Verifica si los datos esperados están presentes
            if (data.grado != undefined && data.nombre != undefined && data.id != undefined) {
                sessionStorage.clear();
                sessionStorage.setItem("grado", data.grado);
                sessionStorage.setItem("id", data.id);
                sessionStorage.setItem("nombre", data.nombre);
                window.location.href = "principal.html";
            } else {
                // Si los datos no están presentes, muestra un mensaje de error
                msg.innerHTML = "El estudiante no existe en la base de datos";
            }
        }
    } catch (e) {
        console.log("Error " + e.message);
        loadding.classList.add("d-none");
        init.classList.remove("disabled");
        msg.innerHTML = e.message;
    }
}