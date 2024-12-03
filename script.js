"use strict";
//variables creadas para el ejercicio
let selectCategoria = document.querySelector("#categoria select");
const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
let row = document.querySelector("#recetas .row");
let botonAñadir = document.querySelector("#botonAñadir")
let fav = JSON.parse(localStorage.getItem("dato")) || [];
let alerta=  document.querySelector("#alert");
let Cerrar = document.querySelector("#Cerrar");
let alertap = document.querySelector("#alert #text");

function obtenerDatos(url){
    return fetch(url)
    .then(respuestas => respuestas.json())
}
function cargarCategorias() {
    obtenerDatos(url)
    .then(datos=>{
        datos.categories.forEach(dato => {
            selectCategoria.innerHTML+=`<option value="${dato.strCategory}">${dato.strCategory}</option>`
        });
    })
}
function mostrarRec(cat) {
    const urlcat = "https://www.themealdb.com/api/json/v1/1/filter.php?c="+cat;
    row.innerHTML="";
    obtenerDatos(urlcat)
    .then(datos=>{
        datos.meals.forEach(dato => {
            row.innerHTML+=`
            <div class="col-md-4">
                <div class="card bg-light mb-3" ">
                <div class="card-header"><img src="${dato.strMealThumb}" class="img-fluid"></div>
                <div class="card-body">
                    <h4 class="card-title">${dato.strMeal}</h4>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#emergente" onClick="abrirModal(${dato.idMeal})">
                        Ver receta
                    </button>
                </div>
                </div>
            </div>`
        });
    })
}
function abrirModal(id) {

    const url3 ="https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id;
    let titulo = document.querySelector("#emergenteLabel"); 
    let imagenes = document.querySelector("#imagenes"); 
    let instru = document.querySelector("#instru"); 
    let Ingredientes = document.querySelector("#Ingredientes");
    let li = document.createElement("li");
    Ingredientes.innerHTML=""
    obtenerDatos(url3)
    .then(dato=>{
        titulo.textContent=dato.meals[0].strMeal;
        imagenes.src=dato.meals[0].strMealThumb;
        instru.textContent=dato.meals[0].strInstructions
        for (let i = 1; i < 21; i++) {
            let ingre=dato.meals[0][`strIngredient`+i];
            let cant = dato.meals[0][`strMeasure`+i];
            if (ingre != "" && ingre != null ) {
                let li = document.createElement("li");
                li.textContent=ingre+" - "+cant;
                Ingredientes.append(li);
            }   
        }
        botonAñadir.addEventListener("click", () => {
            if (!fav.some(f => f.meals[0].idMeal === dato.meals[0].idMeal)) {
                fav.push(dato); 
                localStorage.setItem("dato", JSON.stringify(fav));
                botonAñadir.textContent = "Eliminar de favoritos"; 
                alerta.style.opacity = 1; 
                alerta.style.display = "block"; 
                alertap.textContent="Agregado Correctamente"

            } else {
                fav = fav.filter(f => f.meals[0].idMeal !== dato.meals[0].idMeal); 
                localStorage.setItem("dato", JSON.stringify(fav));
                botonAñadir.textContent = "Añadir a favoritos"; 
                alertap.textContent="Se a eliminado de favoritos "
            }
            setTimeout(() => {
                alerta.style.opacity = 0; 
                setTimeout(() => {
                    alerta.style.display = "none"; 
                }, 1000); 
            }, 1500);
            
        });
        
    })
    
}
Cerrar.addEventListener("click", () =>{
    alerta.style.display = "none";
})


cargarCategorias()