"use strict";

// Variables
let selectCategoria = document.querySelector("#categoria select");
const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
let row = document.querySelector("#recetas .row");
let botonAñadir = document.querySelector("#botonAñadir");
let fav = JSON.parse(localStorage.getItem("dato")) || [];
let alerta = document.querySelector("#alert");
let Cerrar = document.querySelector("#Cerrar");
let alertap = document.querySelector("#alert #text");

// Obtener datos de la API
function obtenerDatos(url) {
    return fetch(url)
    .then(respuestas => respuestas.json());
}

// Cargar categorías en el select
function cargarCategorias() {
    obtenerDatos(url)
    .then(datos => {
        datos.categories.forEach(dato => {
            selectCategoria.innerHTML += `<option value="${dato.strCategory}">${dato.strCategory}</option>`;
        });
    });
}

// Mostrar recetas por categoría
function mostrarRec(cat) {
    const urlcat = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + cat;
    row.innerHTML = "";
    obtenerDatos(urlcat)
    .then(datos => {
        datos.meals.forEach(dato => {
            row.innerHTML += `
            <div class="col-md-4">
                <div class="card bg-light mb-3">
                    <div class="card-header"><img src="${dato.strMealThumb}" class="img-fluid"></div>
                    <div class="card-body">
                        <h4 class="card-title">${dato.strMeal}</h4>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#emergente" onClick="abrirModal(${dato.idMeal})">
                            Ver receta
                        </button>
                    </div>
                </div>
            </div>`;
        });
    });
}

// Abrir modal con receta detallada
function abrirModal(id) {
    const url3 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
    let titulo = document.querySelector("#emergenteLabel");
    let imagenes = document.querySelector("#imagenes");
    let instru = document.querySelector("#instru");
    let Ingredientes = document.querySelector("#Ingredientes");
    Ingredientes.innerHTML = "";

    obtenerDatos(url3).then(dato => {
        const receta = dato.meals[0];
        titulo.textContent = receta.strMeal;
        imagenes.src = receta.strMealThumb;
        instru.textContent = receta.strInstructions;

        // Mostrar ingredientes
        for (let i = 1; i <= 20; i++) {
            const ingre = receta[`strIngredient${i}`];
            const cant = receta[`strMeasure${i}`];
            if (ingre && ingre.trim()) {
                const li = document.createElement("li");
                li.textContent = `${ingre} - ${cant}`;
                Ingredientes.appendChild(li);
            }
        }

        // Cambiar texto del botón según si está en favoritos
        const estaEnFavoritos = fav.some(f => f.meals[0].idMeal === receta.idMeal);
        botonAñadir.textContent = estaEnFavoritos ? "Eliminar de favoritos" : "Agregar a favoritos";

        // Manejo de favoritos
        botonAñadir.onclick = () => {
            if (estaEnFavoritos) {
                fav = fav.filter(f => f.meals[0].idMeal !== receta.idMeal);
                localStorage.setItem("dato", JSON.stringify(fav));
                alertap.textContent = "Se ha eliminado de favoritos";
            } else {
                fav.push(dato);
                localStorage.setItem("dato", JSON.stringify(fav));
                alertap.textContent = "Agregado correctamente a favoritos";
            }

            alerta.style.opacity = 1;
            alerta.style.display = "block";
            setTimeout(() => {
                alerta.style.opacity = 0;
                setTimeout(() => {
                    alerta.style.display = "none";
                }, 1000);
            }, 1500);
        };
    });
}

// Cerrar alerta
Cerrar.addEventListener("click", () => {
    alerta.style.display = "none";
});

// Cargar categorías al inicio
cargarCategorias();
