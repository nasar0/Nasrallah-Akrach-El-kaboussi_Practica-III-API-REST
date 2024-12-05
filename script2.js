"use strict";
let row = document.querySelector("#recetasFav .row");
let botonAñadir = document.querySelector("#botonAñadir")
let fav = JSON.parse(localStorage.getItem("dato")) || [];
let alerta=  document.querySelector("#alert");
let Cerrar = document.querySelector("#Cerrar");
let alertap = document.querySelector("#alert #text");

function obtenerDatos(url){
    return fetch(url)
    .then(respuestas => respuestas.json())
}
let p = "pacho tus muertos"
row.innerHTML = "";
 if (fav.length > 0) {
     fav.forEach(dato => {
        row.innerHTML+=`
            <div class="col-md-4">
                <div class="card bg-light mb-3" ">
                <div class="card-header"><img src="${dato.meals[0].strMealThumb}" class="img-fluid"></div>
                <div class="card-body">
                    <h4 class="card-title">${dato.meals[0].strMeal}</h4>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#emergente"  onClick="abrirModal(${dato.meals[0].idMeal})" >
                        Ver receta
                    </button>
                </div>
                </div>
            </div>`
            console.log(dato.meals[0])
     });
 } else {
    row.innerHTML = "<p>No tienes recetas favoritas.</p>"; 
 }

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

        for (let i = 1; i <= 20; i++) {
            const ingre = receta[`strIngredient${i}`];
            const cant = receta[`strMeasure${i}`];
            if (ingre && ingre.trim()) {
                const li = document.createElement("li");
                li.textContent = `${ingre} - ${cant}`;
                Ingredientes.appendChild(li);
            }
        }


        const botonAñadir = document.querySelector("#botonAñadir");
        const estaEnFavoritos = fav.some(f => f.meals[0].idMeal === receta.idMeal);
        
        if (estaEnFavoritos) {
            botonAñadir.textContent = "Eliminar de favoritos"; 
        } else {
            botonAñadir.textContent = "Agregar a favoritos"; 
        }

        botonAñadir.onclick = () => {
            if (estaEnFavoritos) {
                fav = fav.filter(f => f.meals[0].idMeal !== receta.idMeal);
                localStorage.setItem("dato", JSON.stringify(fav));
                botonAñadir.textContent = "Agregar a favoritos"; 
                alertap.textContent = "Se ha eliminado de favoritos";
            } else {

                fav.push(dato);
                localStorage.setItem("dato", JSON.stringify(fav));
                botonAñadir.textContent = "Eliminar de favoritos"; 
                alertap.textContent = "Agregado correctamente a favoritos";
            }

            // Mostrar alerta
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