let aprendizaje;
let evidencia;


window.addEventListener("load", () => {
    sessionStorage.removeItem("index");
    tabla_periodo(sessionStorage.getItem("periodo"));
});

async function tabla_periodo(periodo) {
    try {
        const result = await fetch(Url + "?func=periodo&grado=" + periodo);
        if (result.ok) {
            aprendizaje = await result.json();
        }
        document.getElementById("msgEspera").innerHTML = "¡Consultando Evidencias!";
        const evid = await fetch(Url + "?func=evidencia&grado=" + periodo);
        if (evid.ok) {
            evidencia = await evid.json();
            document.getElementById("spiner").classList.add("d-none");
            document.getElementById("vista_ap").classList.remove("d-none");
            vistasAprendizajes(periodo);
        }
    } catch (e) {
        console.log(e.message);
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
              <a href="#" id="${sam}" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover act">
                ${evidencia[i][j]}
              </a>
          </p>
            `;
            sam += 1;
        }
    }

    const btnActividades = document.querySelectorAll(".act");
    btnActividades.forEach((element) => {
        element.addEventListener("click", async () => {
            sessionStorage.setItem("index", element.id);
            window.location.href ="actividades.html";
        });
    });
}
