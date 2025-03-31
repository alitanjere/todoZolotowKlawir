let lista = document.getElementById("lista");
let entrada = document.getElementById("entrada");
let botonAgregar = document.getElementById("botonAgregar");
let botonEliminarCompletadas = document.getElementById("botonEliminarCompletadas");
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function mostrarTareas() {
    lista.innerHTML = "";
    for (let i = 0; i < tareas.length; i++) {
        let item = document.createElement("li");
        let texto = document.createElement("span");
        let botonEliminar = document.createElement("button");

        texto.textContent = tareas[i].texto;
        botonEliminar.textContent = "X";
        
        if (tareas[i].completada) {
            texto.classList.add("completada");
        }

        texto.onclick = function () {
            tareas[i].completada = !tareas[i].completada;
            guardarTareas();
        };
        
        botonEliminar.onclick = function () {
            tareas.splice(i, 1);
            guardarTareas();
        };
        
        item.appendChild(texto);
        item.appendChild(botonEliminar);
        lista.appendChild(item);
    }
}

function agregarTarea() {
    if (entrada.value === "") return;
    tareas.push({ texto: entrada.value, completada: false });
    entrada.value = "";
    guardarTareas();
}

function eliminarCompletadas() {
    tareas = tareas.filter(function (tarea) {
        return !tarea.completada;
    });
    guardarTareas();
}

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
}

botonAgregar.onclick = function () {
    agregarTarea();
    mostrarTareas();
};

botonEliminarCompletadas.onclick = eliminarCompletadas;

mostrarTareas();
