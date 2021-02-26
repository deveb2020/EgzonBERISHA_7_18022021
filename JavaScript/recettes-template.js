import {recipes} from "./Recipes.js";


let allTheRecipes = recipes;
const recetteContainerDOM = document.getElementById('recettes-container');

//grab allTheRecipes and do a for each to it and put them into the template literale
export function allRecepiess(recepies) {

    recepies.forEach(recette => {

        let newDivElt = document.createElement('div');
        newDivElt.classList.add('recette-box');
        newDivElt.innerHTML = `
        <div class="recette-informations">
            <div class="tittle-and-time">
                <h1> ${recette.name} </h1>
                <span><i class="fas fa-clock" ></i> ${recette.time} min</span>
            </div>
            <div class="ingrediants-and-instructions">
                <div class="ingrediants">
                    ${recette.ingredients.map(element => `<div><span><b>${element.ingredient}: </b></span><span>${ "quantity" in element ? element.quantity : ""} </span><span>${ "unit" in element? element.unit.substring(0,2) : ""}</span></div>`).join(" ")}
                </div>
                <div class="instructions">
                    <span>${recette.description}</span>
                </div>        
            </div>
        </div>
        `
        recetteContainerDOM.appendChild(newDivElt)
    })
}

allRecepiess(allTheRecipes);
