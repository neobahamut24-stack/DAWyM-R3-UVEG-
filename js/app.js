const formulario = document.getElementById("formulario");
const entradaTarea = document.getElementById("tarea");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const mensajeVacio = document.getElementById("vacio");
const botonLimpiar = document.getElementById("limpiar");

let tareas = [];

async function solicitarAPI(url, opciones = {}) {
    const respuesta = await fetch(url, {
        ...opciones,
        headers: {
            "Content-Type": "application/json",
            ...opciones.headers
        }
    });

    if (!respuesta.ok) {
        const error = await respuesta.json().catch(() => ({}));
        throw new Error(error.error || "No se pudo completar la operación.");
    }

    if (respuesta.status === 204) {
        return null;
    }

    return respuesta.json();
}

function actualizarContador() {
    const pendientes = tareas.filter(tarea => !tarea.completada).length;

    contador.textContent =
        `${pendientes} ${pendientes === 1 ? "tarea pendiente" : "tareas pendientes"}`;

    mensajeVacio.hidden = tareas.length > 0;
}

function renderizarTareas() {
    lista.replaceChildren();

    tareas.forEach(tarea => {
        const elemento = document.createElement("li");
        elemento.className = "tarea";

        if (tarea.completada) {
            elemento.classList.add("completada");
        }

        const casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.checked = Boolean(tarea.completada);
        casilla.setAttribute("aria-label", "Marcar tarea como completada");

        casilla.addEventListener("change", async () => {
            casilla.disabled = true;

            try {
                await solicitarAPI(`/api/tareas/${tarea.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ completada: casilla.checked })
                });

                tarea.completada = casilla.checked;
                renderizarTareas();
            } catch (error) {
                alert(error.message);
                casilla.checked = Boolean(tarea.completada);
                casilla.disabled = false;
            }
        });

        const texto = document.createElement("span");
        texto.textContent = tarea.titulo;

        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.className = "eliminar";
        eliminar.textContent = "Eliminar";
        eliminar.setAttribute("aria-label", `Eliminar ${tarea.titulo}`);

        eliminar.addEventListener("click", async () => {
            eliminar.disabled = true;

            try {
                await solicitarAPI(`/api/tareas/${tarea.id}`, {
                    method: "DELETE"
                });

                tareas = tareas.filter(item => item.id !== tarea.id);
                renderizarTareas();
            } catch (error) {
                alert(error.message);
                eliminar.disabled = false;
            }
        });

        elemento.append(casilla, texto, eliminar);
        lista.append(elemento);
    });

    actualizarContador();
}

async function cargarTareas() {
    try {
        tareas = await solicitarAPI("/api/tareas");
        renderizarTareas();
    } catch (error) {
        console.error("Error al cargar tareas:", error);
        alert("No se pudieron cargar las tareas. Verifica que el servidor esté funcionando.");
    }
}

formulario.addEventListener("submit", async evento => {
    evento.preventDefault();

    const texto = entradaTarea.value.trim();

    if (!texto) {
        return;
    }

    try {
        const nuevaTarea = await solicitarAPI("/api/tareas", {
            method: "POST",
            body: JSON.stringify({ titulo: texto })
        });

        tareas.unshift(nuevaTarea);
        entradaTarea.value = "";
        entradaTarea.focus();
        renderizarTareas();
    } catch (error) {
        alert(error.message);
    }
});

botonLimpiar.addEventListener("click", async () => {
    try {
        await solicitarAPI("/api/tareas/completadas", {
            method: "DELETE"
        });

        tareas = tareas.filter(tarea => !tarea.completada);
        renderizarTareas();
    } catch (error) {
        alert(error.message);
    }
});

cargarTareas();