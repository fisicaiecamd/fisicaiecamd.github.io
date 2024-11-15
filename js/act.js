window.addEventListener("load", () => {
    tableAct();
});

let actividad;
let estado_actividad;
let valoracion_final;

async function tableAct() {
    const act = await fetch(Url + "?func=actividades&periodo=" + sessionStorage.getItem("periodo"));
    if (act.ok) {
        actividad = await act.json();
    }
    document.getElementById("msgEspera").innerHTML = "¡Descargando estado de actividades!";
    const estado = await fetch(
        Url + "?func=estado&id=" + sessionStorage.getItem("id") + "&periodo=" + sessionStorage.getItem("periodo")
    );
    if (estado.ok) {
        estado_actividad = await estado.json();
    }
    document.getElementById("msgEspera").innerHTML = "¡Buscando Valoraciones!";
    const valoracion = await fetch(
        Url + "?func=valoracion&id=" + sessionStorage.getItem("id") + "&periodo=" + sessionStorage.getItem("periodo")
    );
    if (valoracion.ok) {
        valoracion_final = await valoracion.json();
    }
    document.getElementById("spiner").classList.add("d-none");
    document.getElementById("tabla").classList.remove("d-none");
    document.getElementById("viewVal").classList.remove("d-none");
    let valFinal = document.getElementById("valFinal");
    const tableBody = document.getElementById("tblBody");
    let index = sessionStorage.getItem("index");
    valFinal.innerHTML = valoracion_final[index];
    if(valFinal.innerHTML == "Competente Alto"){
        document.getElementById("emoji").classList.remove("bi-emoji-grimace", "text-warning", "bi-emoji-grin");
        document.getElementById("emoji").classList.add("bi-emoji-grin", "text-success");
        valFinal.classList.add("text-success");
    }if(valFinal.innerHTML == "Competente Básico"){
        document.getElementById("emoji").classList.remove("bi-emoji-grimace", "text-warning", "bi-emoji-grin");
        document.getElementById("emoji").classList.add("bi-emoji-neutral", "text-warning");
        valFinal.classList.add("text-warning");
    }
    if(valFinal.innerHTML == "En Proceso"){
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
            let td = document.getElementById("nt" + e);
            td.classList.add("text-danger");
        }
    }
    
}
