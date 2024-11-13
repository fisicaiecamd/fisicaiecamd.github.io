let aprendizaje;
let evidencia;

window.addEventListener("load", () => {
    tabla_periodo();
});

async function tabla_periodo(grado) {
    const result = await fetch(Url + "?func=periodo&grado=" + sessionStorage.getItem("grado"));
    if (result.ok) {
        aprendizaje = await result.json();
        console.log(aprendizaje);
    }
    console.log("ya paso");
    const evid = await fetch(Url + "?func=evidencia&grado=" + sessionStorage.getItem("grado"));
    if (evid.ok) {
        evidencia = await evid.json();
        console.log(evidencia);
        document.getElementById("spiner").classList.add("d-none");
        document.getElementById("vista_ap").classList.remove("d-none");
        vistasAprendizajes();
    }
}

function vistasAprendizajes() {
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
        }
    }
}
