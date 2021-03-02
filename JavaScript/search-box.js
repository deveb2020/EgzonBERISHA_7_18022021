
import {recipes} from "./Recipes.js";
import {allRecepiess} from "./recettes-template.js"
let recettes = recipes;


//select the input dom element
const serachInputBox = document.getElementById('search-box');
const recetteContainerDOM = document.getElementById('recettes-container');
const suggestMessage = document.getElementById('suggest-message');


//filter recipes using search box
serachInputBox.addEventListener('keyup', (key) => {

   const enteredValue = key.target.value.toLowerCase();
   
   if (enteredValue.length >= 3) {

        const filteredRecettes = recettes.filter((recette) => {
            return (
                recette.name.toLowerCase().includes(enteredValue) ||                                    // search by recette name
                recette.ingredients.some(i => i.ingredient.toLowerCase().includes(enteredValue)) ||     // search by ingredients
                recette.ustensils.some(u => u.toLowerCase().includes(enteredValue)) ||                  // search by ustensils
                recette.appliance.toLowerCase().includes(enteredValue) ||                               // search by appliance
                recette.description.toLowerCase().includes(enteredValue)                                // search by description        
            )
        })

            recetteContainerDOM.innerHTML = "";
            allRecepiess(filteredRecettes);

            //call the function to display the error message
            showSuggestionMessage (filteredRecettes)

   }else {
        recetteContainerDOM.innerHTML = ""; 
        allRecepiess(recettes);   
   }
});


//show the suggestion message if no match is found bettwen the input value ant the array element
function showSuggestionMessage (filteredRecettes) {

    if (filteredRecettes.length <= 0) {
                
        let pElement = document.createElement('p');

        //clear the html of the parent div each time the condition is true
        suggestMessage.innerHTML = "";

        //populate the html of the child p each time the condition is true
        pElement.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."

        suggestMessage.append(pElement);

    }else {

        // clear the suggestion div if no need for him
        suggestMessage.innerHTML = "";

        //clear the old recettes from the reccetes container before populating with new values 
        recetteContainerDOM.innerHTML = "";
        allRecepiess(filteredRecettes);
    }
};