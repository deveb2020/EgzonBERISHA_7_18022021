
import {recipes} from "./Recipes.js";
import {allRecepiess} from "./recettes-template.js"
let recettes = recipes;


//select the input dom element
const serachInputBox = document.getElementById('search-box');
const recetteContainerDOM = document.getElementById('recettes-container');


//filter recipes using search box
serachInputBox.addEventListener('keyup', (key) => {

   const enteredValue = key.target.value.toLowerCase();
   
   if (enteredValue.length >= 3) {

        const filteredRecettes = recettes.filter((recette) => {
            return (
                recette.name.toLowerCase().includes(enteredValue) ||                                    // search by recette name
                recette.ingredients.some(i => i.ingredient.toLowerCase().includes(enteredValue)) ||     // search by ingredients
                recette.ustensils.some(u => u.toLowerCase().includes(enteredValue)) ||                  // search by ustensils
                recette.appliance.toLowerCase().includes(enteredValue)                                  // search by appliance
            )
        })
            recetteContainerDOM.innerHTML = "";
            allRecepiess(filteredRecettes);

   }else {
        recetteContainerDOM.innerHTML = ""; 
        allRecepiess(recettes);   
   }
});

