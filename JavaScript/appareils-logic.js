import {recipes} from "./Recipes.js";
import {allRecepiess} from "./recettes-template.js"
let recettes = recipes;



//create an empty array
let appareilArray = [];
const appareilDomElement = document.getElementById('Appareil-placeholder');

//create an loop in recettes to grab all the wanted elements and push them to the empty array
recettes.forEach(recette => {
    appareilArray.push(recette.appliance)
})

//create a new varible and remove the duplicants from the first array
let appareilArrayUniques = [...new Set(appareilArray)];


//do a new loop on the filtered array and displat them into the right button 
appareilArrayUniques.forEach(appareil => {
    const listItem =  document.createElement('li');
    listItem.innerHTML = `${appareil}`

    listItem.classList.add('liAppareil');
    appareilDomElement.appendChild(listItem);
})
