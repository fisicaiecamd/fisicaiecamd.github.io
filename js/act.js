window.addEventListener("load", () => {
    tableAct();
    // Empujar el estado inicial al historial para controlar el retroceso
    history.pushState(null, null, window.location.href);
});

// window.addEventListener("popstate", function(event) {
//     // Manejar la acción del botón de retroceso aquí
//     if (confirm("¿Estás seguro de que deseas salir?")) {
//         window.history.back();
//     } else {
//         // Evitar la acción de retroceso del navegador
//         history.pushState(null, null, window.location.href);
//     }
// });

let actividad;
let estado_actividad;
let valoracion_final;

async function tableAct() {
    try {
        const actResponse = await fetch(`${Url}?func=actividades&periodo=${sessionStorage.getItem("periodo")}`);
        if (!actResponse.ok) {
            throw new Error("Error al obtener actividades");
        }
        actividad = await actResponse.json();

        document.getElementById("msgEspera").innerHTML = "¡Descargando estado de actividades!";
        const estadoResponse = await fetch(`${Url}?func=estado&id=${sessionStorage.getItem("id")}&periodo=${sessionStorage.getItem("periodo")}`);
        if (!estadoResponse.ok) {
            throw new Error("Error al obtener el estado de las actividades");
        }
        estado_actividad = await estadoResponse.json();

        document.getElementById("msgEspera").innerHTML = "¡Buscando Valoraciones!";
        const valoracionResponse = await fetch(`${Url}?func=valoracion&id=${sessionStorage.getItem("id")}&periodo=${sessionStorage.getItem("periodo")}`);
        if (!valoracionResponse.ok) {
            throw new Error("Error al obtener valoraciones");
        }
        valoracion_final = await valoracionResponse.json();

        document.getElementById("spiner").classList.add("d-none");
        document.getElementById("tabla").classList.remove("d-none");
        document.getElementById("viewVal").classList.remove("d-none");

        const valFinal = document.getElementById("valFinal");
        const tableBody = document.getElementById("tblBody");
        const index = sessionStorage.getItem("index");
        valFinal.innerHTML = valoracion_final[index];

        if (valFinal.innerHTML == "Competente Alto") {
            document.getElementById("emoji").classList.remove("bi-emoji-grimace", "text-warning", "bi-emoji-grin");
            document.getElementById("emoji").classList.add("bi-emoji-grin", "text-success");
            valFinal.classList.add("text-success");
        } else if (valFinal.innerHTML == "Competente Básico") {
            document.getElementById("emoji").classList.remove("bi-emoji-grimace", "text-warning", "bi-emoji-grin");
            document.getElementById("emoji").classList.add("bi-emoji-neutral", "text-warning");
            valFinal.classList.add("text-warning");
        } else if (valFinal.innerHTML == "En Proceso") {
            document.getElementById("emoji").classList.remove("bi-emoji-grimace", "text-warning", "bi-emoji-grin", "bi-emoji-neutral");
            document.getElementById("emoji").classList.add("bi-emoji-tear", "text-danger");
            valFinal.classList.add("text-danger");
        }

        tableBody.innerHTML = "";
        for (let e = 0; e < actividad[index].length; e++) {
            tableBody.innerHTML += `<tr><td>${actividad[index][e]}</td><td id="nt${e}">${estado_actividad[index][e]}</td></tr>`;
            if (
                estado_actividad[index][e] == "Presentar Refuerzo" ||
                estado_actividad[index][e] == "No presentó actividad" ||
                estado_actividad[index][e] == "No asistió"
            ) {
                document.getElementById(`nt${e}`).classList.add("text-danger");
            }
        }
    } catch (error) {
        console.error("Error:", error.message);
        document.getElementById("msgEspera").innerHTML = "Ocurrió un error: " + error.message;
        document.getElementById("spiner").classList.add("d-none");
        document.getElementById("tabla").classList.add("d-none");
        document.getElementById("viewVal").classList.add("d-none");
    }
}