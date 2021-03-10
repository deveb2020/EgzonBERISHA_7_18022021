
import {recipes} from "./Recipes.js";
import {allRecepiess} from "./recettes-template.js"
import {showIngredients, filterRecettesEnClick} from "./ingredients-logic.js"
import {showUstensils} from "./ustensiles-logic.js"
import {showAppareils} from "./appareils-logic.js"
let recettes = recipes;

//select the input dom element
const serachInputBox = document.getElementById('search-box');
const recetteContainerDOM = document.getElementById('recettes-container');
const suggestMessage = document.getElementById('suggest-message');
let pElement = document.createElement('p');

let recettesFromIngredients = []; 
let recettesFromUstensiles = [];
let recettesFromDescription = [];
let recettesFromTitle = [];

let ingredientsFiltered = [];
let ustensilesFiltered = [];
let appareilFiltered = [];


//filter recipes using search box
serachInputBox.addEventListener('keyup', (key) => {

   const enteredValue = key.target.value.toLowerCase().trim();
   clearTheOldElement()

    if (enteredValue.length >= 3) {

        ingredients(enteredValue);
        ustensiles(enteredValue);
        titre(enteredValue);
        description(enteredValue);
        //advanced filtering
        advancedFilteringFunctionsInvok()
        // remove duplicants and display to the right button liste
        uniqueElements()
        //show and hide the error message
        showSuggestionMessage()

    }else {

        //remove the error message
        suggestMessage.innerHTML = "";
        // clear the oldHTML if there are less than three letters
        recetteContainerDOM.innerHTML = ""; 
        allRecepiess(recettes);   
    }
});


export function ingredients(enteredValue) {

    let recettesByIngredients = [];

    for (let i = 0; i < recettes.length; i ++) {
        for (let d = 0; d < recettes[i].ingredients.length; d++) {
            if ( recettes[i].ingredients[d].ingredient.toLocaleLowerCase().includes(enteredValue)) {

                recettesFromIngredients.push(recettes[i]); 
                recettesByIngredients.push(recettes[i]);
                recetteContainerDOM.innerHTML = ""; 
                allRecepiess(recettesFromIngredients);

            };
        };
    };
    
    return recettesByIngredients;
};

function ustensiles(enteredValue) {

    for (let i = 0; i < recettes.length; i ++) {
        for (let d = 0; d < recettes[i].ustensils.length; d++) {
            if ( recettes[i].ustensils[d].toLocaleLowerCase().includes(enteredValue)) {

                recettesFromUstensiles.push(recettes[i]);
                recetteContainerDOM.innerHTML = ""; 
                allRecepiess(recettesFromUstensiles);
            }
        };
    };
};

function titre(enteredValue){

    for (let i = 0; i < recettes.length; i++) {

        if (recettes[i].name.toLocaleLowerCase().includes(enteredValue)) {

            recettesFromTitle.push(recettes[i]);
            recetteContainerDOM.innerHTML = ""; 
            allRecepiess(recettesFromTitle);
        };
    };
};

function description(enteredValue) {

    for (let i = 0; i < recettes.length; i++) {

        if (recettes[i].description.toLocaleLowerCase().includes(enteredValue)) {
           
            recettesFromDescription.push(recettes[i]);
            recetteContainerDOM.innerHTML = ""; 
            allRecepiess(recettesFromDescription);
        };
    };
};

//show and hide the error message
function showSuggestionMessage() {

    
    if (recettesFromUstensiles.length <= 0 && 
        recettesFromIngredients.length <= 0 && 
        recettesFromTitle.length <= 0 && 
        recettesFromDescription.length <= 0)

    {
        // show the message
        suggestMessage.style.display = "block";
        
        pElement.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."; 

        suggestMessage.appendChild(pElement);

        //remove all the recettes
        recetteContainerDOM.innerHTML = "";

    }else {

        //hide the message error
        suggestMessage.style.display = "none";

        // populate with filtered recettes
        allRecepiess(recettesFromIngredients);
        allRecepiess(recettesFromUstensiles);
        //allRecepiess(recettesFromTitle);
        //allRecepiess(recettesFromDescription);
    };
};


// grab ingredients appareil and ustensiles from each recette filtered and fill the empty arrays
function ingredientsRecettes() {

    ingredientsFiltered = [];
    ustensilesFiltered = [];
    appareilFiltered = [];

    recettesFromIngredients.forEach(recette => {
        appareilFiltered.push(recette.appliance);
        recette.ingredients.forEach(i => ingredientsFiltered.push(i.ingredient));
        recette.ustensils.forEach(u => ustensilesFiltered.push(u));
    });

};

function ustensilesRecettes() {

    ingredientsFiltered = [];
    ustensilesFiltered = [];
    appareilFiltered = [];

    recettesFromUstensiles.forEach(recette => {
        appareilFiltered.push(recette.appliance);
        recette.ingredients.forEach(i => ingredientsFiltered.push(i.ingredient));
        recette.ustensils.forEach(u => ustensilesFiltered.push(u));
    });

};

function descriptionRecettes() {

    ingredientsFiltered = [];
    ustensilesFiltered = [];
    appareilFiltered = [];

    recettesFromDescription.forEach(recette => {
        appareilFiltered.push(recette.appliance);
        recette.ingredients.forEach(i => ingredientsFiltered.push(i.ingredient));
        recette.ustensils.forEach(u => ustensilesFiltered.push(u));
    });

    showIngredients(ingredientsFiltered);

};

function tittleRecettes() {

    ingredientsFiltered = [];
    ustensilesFiltered = [];
    appareilFiltered = [];

    recettesFromTitle.forEach(recette => {
        appareilFiltered.push(recette.appliance);
        recette.ingredients.forEach(i => ingredientsFiltered.push(i.ingredient));
        recette.ustensils.forEach(u => ustensilesFiltered.push(u));
    });

};

// remove duplicants
function uniqueElements() {

    let ingredientsUnique = [...new Set(ingredientsFiltered)];
    let ustensilesUnique = [...new Set(ustensilesFiltered)];
    let appareilUnique = [...new Set(appareilFiltered)];

    // show new elements in buttons liste
    showIngredients(ingredientsUnique);
    showUstensils(ustensilesUnique);
    showAppareils(appareilUnique);

    console.log("filter by title", ingredientsUnique);
};

function clearTheOldElement() {

    recettesFromIngredients = [];
    recettesFromUstensiles = [];
    recettesFromDescription = [];
    recettesFromTitle = [];
}


//BUG - the browser is reading only the last function 
function advancedFilteringFunctionsInvok() {
    
    // advanced filtering  
    ustensilesRecettes();
    descriptionRecettes();
    tittleRecettes();
    ingredientsRecettes(); // <------ this function is being read NOT OTHERS
}












