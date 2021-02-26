import {recipes} from "./Recipes.js";
import {allRecepiess} from "./recettes-template.js"
let recettes = recipes;


//create an empty array
let ustensilesArray = [];
const ustensilesDomElement = document.getElementById('Ustensiles-placeholder');

//create an loop in recettes to grab all the wanted elements and push them to the empty array
recettes.forEach(recette => {
    recette.ustensils.forEach(u => {
        ustensilesArray.push(u)
    })
})

//create a new varible and remove the duplicants from the first array
let ustensilesArrayUniques = [...new Set(ustensilesArray)];

//do a new loop on the filtered array and displat them into the right button 
ustensilesArrayUniques.forEach(element => {
    const listItem =  document.createElement('li');
    listItem.innerHTML = `${element}`

    listItem.classList.add('liUstensils');
    ustensilesDomElement.appendChild(listItem);
})