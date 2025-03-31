let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let lista = document.getElementById("listaTareas");
let entrada = document.getElementById("entradaTarea");
let filtroActual = "todas";
let tareaMasRapidaElemento = document.getElementById("tareaMasRapida");

document.getElementById("agregarTarea").onclick = () => {
    if (entrada.value !== "") {
        let ahora = new Date().getTime(); 
        let tarea = {
            texto: entrada.value,
            completada: false,
            fechaCreacion: ahora,
            fechaCompletado: null
        };
        tareas.push(tarea);
        entrada.value = "";
        guardarTareas();
    }
};

document.getElementById("filtroTodas").onclick = () => {
    filtroActual = "todas";
    mostrarTareas();
};

document.getElementById("filtroPendientes").onclick = () => {
    filtroActual = "pendientes";
    mostrarTareas();
};

document.getElementById("filtroCompletadas").onclick = () => {
    filtroActual = "completadas";
    mostrarTareas();
};

document.getElementById("eliminarCompletadas").onclick = () => {
    tareas = tareas.filter(t => !t.completada);
    guardarTareas();
};

function mostrarTareas() {
    lista.innerHTML = "";
    let tareasFiltradas = tareas;

    if (filtroActual === "pendientes") {
        tareasFiltradas = tareas.filter(t => !t.completada);
    } else if (filtroActual === "completadas") {
        tareasFiltradas = tareas.filter(t => t.completada);
    }

    tareasFiltradas.forEach((tarea, index) => {
        let item = document.createElement("li");
        let texto = document.createElement("span");
        let checkbox = document.createElement("input");
        let infoTiempo = document.createElement("small");
        let botonEliminar = document.createElement("button");

        texto.textContent = tarea.texto;
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;
        botonEliminar.textContent = "X";

        let fechaCreacionLegible = new Date(tarea.fechaCreacion).toLocaleString();
        infoTiempo.innerHTML = `📅 Creada: ${fechaCreacionLegible}`;
        
        if (tarea.completada && tarea.fechaCompletado) {
            texto.classList.add("completada");
            let fechaCompletadoLegible = new Date(tarea.fechaCompletado).toLocaleString();
            infoTiempo.innerHTML += ` | ✅ Completada: ${fechaCompletadoLegible}`;
        }

        checkbox.onclick = () => {
            if (checkbox.checked) {
                tareas[index].completada = true;
                tareas[index].fechaCompletado = new Date().getTime();
            } else {
                tareas[index].completada = false;
                tareas[index].fechaCompletado = null;
            }
            guardarTareas();
        };

        botonEliminar.onclick = () => {
            tareas.splice(index, 1);
            guardarTareas();
        };

        item.appendChild(checkbox);
        item.appendChild(texto);
        item.appendChild(infoTiempo);
        item.appendChild(botonEliminar);
        lista.appendChild(item);
    });

    mostrarTareaMasRapida();
}

function mostrarTareaMasRapida() {
    let tareasCompletadas = tareas.filter(t => t.completada && t.fechaCompletado);

    if (tareasCompletadas.length > 0) {
        let tareaMasRapida = tareasCompletadas.reduce((t1, t2) => {
            let tiempoT1 = t1.fechaCompletado - t1.fechaCreacion;
            let tiempoT2 = t2.fechaCompletado - t2.fechaCreacion;
            return tiempoT1 < tiempoT2 ? t1 : t2;
        });

        let tiempoTotal = ((tareaMasRapida.fechaCompletado - tareaMasRapida.fechaCreacion) / 1000).toFixed(2);
        tareaMasRapidaElemento.innerHTML = `🏆 Tarea más rápida: <b>${tareaMasRapida.texto}</b> en ${tiempoTotal} segundos.`;
    } else {
        tareaMasRapidaElemento.innerHTML = "🏆 No hay tareas completadas aún.";
    }
}

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
}

mostrarTareas();
