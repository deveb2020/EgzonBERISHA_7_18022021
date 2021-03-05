
import {recipes} from "./Recipes.js";
import {allRecepiess} from "./recettes-template.js"
let recettes = recipes;


//select the input dom element
const serachInputBox = document.getElementById('search-box');
const recetteContainerDOM = document.getElementById('recettes-container');
const suggestMessage = document.getElementById('suggest-message');
let recettesFromIngredients = [];
let recettesFromUstensiles = [];
let recettesFromDescription = [];
let recettesFromTitle = [];
let pElement = document.createElement('p');




//filter recipes using search box
serachInputBox.addEventListener('keyup', (key) => {

   const enteredValue = key.target.value.toLowerCase().trim();
   recettesFromIngredients = [];
   recettesFromUstensiles = [];
   recettesFromDescription = [];
   recettesFromTitle = [];

    if (enteredValue.length >= 3) {

        ingredients(enteredValue);
        ustensiles(enteredValue);
        titre(enteredValue);
        description(enteredValue);

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


function ingredients(enteredValue) {

    for (let i = 0; i < recettes.length; i ++) {
        for (let d = 0; d < recettes[i].ingredients.length; d++) {
            if ( recettes[i].ingredients[d].ingredient.toLocaleLowerCase().includes(enteredValue)) {

                recettesFromIngredients.push(recettes[i]);
                recetteContainerDOM.innerHTML = ""; 
                allRecepiess(recettesFromIngredients);

            };
        };
    };
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



