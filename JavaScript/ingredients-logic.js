import {recipes} from "./Recipes.js";
import {allRecepiess} from "./recettes-template.js"
let recettes = recipes;


// Global Variables 
const tagsPlaceholder = document.getElementById('tags-placeholder');
const ingrediantsPlaceholder = document.getElementById("Ingrediants-placeholder");
const recetteContainerDOM = document.getElementById('recettes-container');
const inputIngredient = document.getElementById('input-Ingrediants');

let ingrediantsArray = [];
let clickedTags = [];
let filteredRecettesClick = [];


// fill the array ingrediantsArray with all the ingredients 
recettes.forEach(recette => {
    recette.ingredients.forEach((element, index) => {
        ingrediantsArray.push(element.ingredient);
    })
})

 // remove all the duplicants from ingrediantsArray and put the uniques in this Variable
let ingrediantsArrayNoDuplics = [...new Set(ingrediantsArray)];



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////  DISPLAY INGREDIENTS BY DEFAULT //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Display all the ingredients by default
function showIngredients(ingredients) {

    ingredients.forEach((ingredient, index) => {
        const listItem =  document.createElement('li');
        listItem.innerHTML = `${ingredient}`
    
        ingrediantsPlaceholder.appendChild(listItem);
        listItem.classList.add('liIngrediants');
    })
    
}
showIngredients(ingrediantsArrayNoDuplics);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// ADD INGREDIENT IN TAGS BAR //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//add a event listener to each element of the array
document.addEventListener('click', (event) => {

    if (event.target.classList.contains('liIngrediants')) {
       
        // verify if the ingrediant is in the array RETURN if not continue execution
        if (clickedTags.includes(event.target.innerHTML)) return
        else {
            //create an element span each time
            const newElement = document.createElement('span');
            newElement.innerHTML = `${event.target.innerHTML}  <i class="fas fa-times-circle fa-times-circle-ingredients"></i>`
            newElement.classList.add('clickedElement');

            //apprend the span element to the dom element
            tagsPlaceholder.appendChild(newElement)
            
            //remove the search value from the search box
            inputIngredient.value = "";

            // call the function to display every ingredient by default
            showIngredients(ingrediantsArrayNoDuplics);

            //fill the Array each time we click an element
            clickedTags.push(event.target.innerHTML);
            filterRecettesEnClick() 
        };

    };

});



// filter RECETTES ARRAY using tags 
function filterRecettesEnClick() {

    //emty the array 
    filteredRecettesClick = [];
    
    //loop throught each tag and execute this code
    clickedTags.forEach(tag => {

        filteredRecettesClick.push(...recettes.filter(recette => {

            return recette.ingredients.some(i => i.ingredient.includes(tag)); 

        }))

    })
    
    recetteContainerDOM.innerHTML = " ";
    allRecepiess(filteredRecettesClick);
};



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  REMOVE INGREDIENT FROM TAGS BAR /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-times-circle-ingredients')) {

        //the NAME of the clicked element
        let currentTagName = event.path[1].innerText.trim();

        //the INDEX of clicked element
        let positionIndex = clickedTags.indexOf(currentTagName)

        //remove the clicked element from the Array
        clickedTags.splice(positionIndex, 1)

        //remove the tag from the tags BAR
        event.path[1].outerHTML = "";

        let removeRecetteFromArray =  filteredRecettesClick.filter(recettes => {
            
            return recettes.ingredients.every(i => i.ingredient !== currentTagName )
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
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// Filter ingredients on KEYUP ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// grab the input element from the DOM
const inputIngrediants = document.getElementById('input-Ingrediants');

// add an event listener on keyup
inputIngrediants.addEventListener('keyup', (key) => {

    // store the input data inside a variable
    const enteredValue = key.target.value.toLowerCase();

    // filter ingredients Array and store the result of filtered Array inside of a new variable
    const filteredIngredients = ingrediantsArrayNoDuplics.filter((ingredients) => {
        return ( ingredients.toLowerCase().includes(enteredValue) )
    });

    // clean the old html
    ingrediantsPlaceholder.innerHTML = " ";
    
    // call the function to populate the the table with wanted ingredients
    showIngredients(filteredIngredients);

})






