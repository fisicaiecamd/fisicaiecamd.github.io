let aprendizaje;
let evidencia;

window.addEventListener("load", () => {
    sessionStorage.removeItem("index");
    tabla_periodo(sessionStorage.getItem("periodo"));
});

async function tabla_periodo(periodo) {
    try {
        // Realiza la primera consulta
        const result = await fetch(`${Url}?func=periodo&grado=${periodo}`);
        if (!result.ok) {
            throw new Error("Error al obtener datos de aprendizaje");
        }
        aprendizaje = await result.json();
        
        // Muestra un mensaje mientras busca evidencias
        document.getElementById("msgEspera").innerHTML = "¡Buscando Evidencias!";
        
        // Realiza la segunda consulta
        const evid = await fetch(`${Url}?func=evidencia&grado=${periodo}`);
        if (!evid.ok) {
            throw new Error("Error al obtener evidencias");
        }
        evidencia = await evid.json();
        
        // Actualiza el DOM
        document.getElementById("spiner").classList.add("d-none");
        document.getElementById("vista_ap").classList.remove("d-none");
        vistasAprendizajes(periodo);
    } catch (error) {
        console.error("Error:", error.message);
        msg.innerHTML = "Ocurrió un error: " + error.message;
        
        // Asegura que los elementos del DOM se actualicen en caso de error
        document.getElementById("spiner").classList.add("d-none");
        document.getElementById("vista_ap").classList.add("d-none");
        document.getElementById("msgEspera").innerHTML = "Error en la solicitud, intente nuevamente.";
    }
}



async function vistasAprendizajes(periodo) {
    let AP = document.getElementById("vista_ap");
    let sam = 0;
    for (let i = 0; i < aprendizaje.length; i++) {
        AP.innerHTML += `
            <p class="d-inline-flex gap-1">
             <button
                class="btn btn-primary w-100 mt-3"
                id="btnAP${i}"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample${i}"
                aria-expanded="false"
                aria-controls="collapseExample">
                ${aprendizaje[i]}
            </button>
            </p>
            
            <div class="collapse" id="collapseExample${i}">
                <div class="card card-body" id="evidencias${i}">
                </div>
            </div>
            `;
        let EV = document.getElementById("evidencias" + i);
        for (let j = 0; j < evidencia[i].length; j++) {
            EV.innerHTML += `
          <p>
              <button class="btn btn-link text-decoration-none link-success act" id="${sam}">
                 ${evidencia[i][j]}
              </button>
          <p/>
          
            `;
            sam += 1;
        }
    }

    const btnActividades = document.querySelectorAll(".act");
    btnActividades.forEach((element) => {
        element.addEventListener("click", async () => {
            sessionStorage.setItem("index", element.id);
            window.location.href = "actividades.html";
        });
    });
}