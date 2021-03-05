import {recipes} from "./Recipes.js";
import {allRecepiess} from "./recettes-template.js"
let recettes = recipes;


//create an empty array
const ustensilesDomElement = document.getElementById('Ustensiles-placeholder');
const tagsPlaceholder = document.getElementById('tags-placeholder');
const inputUstensile = document.getElementById('input-Ustensiles');
const recetteContainerDOM = document.getElementById('recettes-container');


let ustensilesArray = [];
let clickedTags = [];
let filteredRecettesClick = [];



//create an loop in recettes to grab all the wanted elements and push them to the empty array
recettes.forEach(recette => {
    recette.ustensils.forEach(u => {
        ustensilesArray.push(u)
    })
})

//create a new varible and remove the duplicants from the first array
let ustensilesArrayUniques = [...new Set(ustensilesArray)];



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////  DISPLAY INGREDIENTS BY DEFAULT //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//do a new loop on the filtered array and displat them into the right button 
function showUstensils(ustensiles) {

    ustensiles.forEach(element => {
        const listItem =  document.createElement('li');
        listItem.innerHTML = `${element}`
    
        listItem.classList.add('liUstensils');
        ustensilesDomElement.appendChild(listItem);
    })

}
showUstensils(ustensilesArrayUniques);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// ADD INGREDIENT IN TAGS BAR //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('click', (event) => {

    if (event.target.classList.contains('liUstensils')) {

        if (clickedTags.includes(event.target.innerHTML)) return 
        else {

             //create an element span each time
             const newElement = document.createElement('span');
             newElement.innerHTML = `${event.target.innerHTML}  <i class="fas fa-times-circle fa-times-circle-ustensiles"></i>`
             newElement.classList.add('clickedElementRed');
 
            //apprend the span element to the dom element
            tagsPlaceholder.appendChild(newElement);

            clickedTags.push(event.target.innerHTML);
            filterRecettesEnClick() 
        };
    };
});


function filterRecettesEnClick() {

    //emty the array 
    filteredRecettesClick = [];

    //loop throught each tag and execute this code
    clickedTags.forEach(tag => {

        filteredRecettesClick.push(...recettes.filter(recette => {

            return recette.ustensils.some(u => u.includes(tag)); 

        }))

    });

    recetteContainerDOM.innerHTML = " ";
    allRecepiess(filteredRecettesClick);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  REMOVE INGREDIENT FROM TAGS BAR /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-times-circle-ustensiles')) {

        //the NAME of the clicked element
        let currentTagName = event.path[1].innerText.trim();

        //the INDEX of clicked element
        let positionIndex = clickedTags.indexOf(currentTagName)

        //remove the clicked element from the Array
        clickedTags.splice(positionIndex, 1)

        //remove the tag from the tags BAR
        event.path[1].outerHTML = "";

        let removeRecetteFromArray =  filteredRecettesClick.filter(recettes => {
            
            return recettes.ustensils.every(u => u !== currentTagName )
        })

        //remove the old recettes
        recetteContainerDOM.innerHTML = " ";

        // add the new filtered liste
        allRecepiess(removeRecetteFromArray);

        //if clickedTags.length is less than 0
        if ( clickedTags.length <= 0) {

            allRecepiess(recettes);

        }
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// Filter ingredients on KEYUP ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// add an event listener on keyup
inputUstensile.addEventListener('keyup', (key) => {

    // store the input data inside a variable
    const enteredValue = key.target.value.toLowerCase();

    // filter ingredients Array and store the result of filtered Array inside of a new variable
    const filteredUstensiles = ustensilesArrayUniques.filter((ustensiles) => {
        return ( ustensiles.toLowerCase().includes(enteredValue) )
    });

    // clean the old html
    ustensilesDomElement.innerHTML = " ";
    
    // call the function to populate the the table with wanted ingredients
    showUstensils(filteredUstensiles);
})
