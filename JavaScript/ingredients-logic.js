import {recipes} from "./Recipes.js";
import {allRecepiess} from "./recettes-template.js"
let recettes = recipes;


// Global Variables 
const tagsPlaceholder = document.getElementById('tags-placeholder');
const ingrediantsPlaceholder = document.getElementById("Ingrediants-placeholder");
const recetteContainerDOM = document.getElementById('recettes-container');
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


// create a function to display all the ingredients by default
function showIngredients(ingredients) {

    ingredients.forEach((ingredient, index) => {
        const listItem =  document.createElement('li');
        listItem.innerHTML = `${ingredient}`
    
        ingrediantsPlaceholder.appendChild(listItem);
        listItem.classList.add('liIngrediants');
    })
    
}
showIngredients(ingrediantsArrayNoDuplics);


//////////////////////////////////// ADD the ingrediant in the tags bar //////////////////////////////////////////

//add a event listener to each element of the array
document.addEventListener('click', (event) => {

    if (event.target.classList.contains('liIngrediants')) {
       
        // verify if the ingrediant is in the array RETURN if not continue execution
        if (clickedTags.includes(event.target.innerHTML)) return
        else {
            //create an element span each time
            const newElement = document.createElement('span');
            newElement.innerHTML = `${event.target.innerHTML}  <i class="fas fa-times-circle"></i>`
            newElement.classList.add('clickedElement');

            //apprend the span element to the dom element
            tagsPlaceholder.appendChild(newElement)
            
            //fill the Array each time we click an element
            clickedTags.push(event.target.innerHTML);
            filterRecettesEnClick() 
        };

    };

});

// filter RECETTES ARRAY using tags 
function filterRecettesEnClick() {

    //loop throught each tag and execute this code
    clickedTags.forEach(tag => {

        filteredRecettesClick.push(...recettes.filter(recette => {

            return recette.ingredients.some(i => i.ingredient.includes(tag)); 
        }))

    })
    
    recetteContainerDOM.innerHTML = " ";
    allRecepiess(filteredRecettesClick);
};




//////////////////////////////////// REMOVE the ingrediant from the tags bar //////////////////////////////////////////

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-times-circle')) {

        //the NAME of the clicked element
        let currentTagName = event.path[1].innerText.trim();

        //the INDEX of clicked element
        let positionIndex = clickedTags.indexOf(currentTagName)

        //remove the clicked element from the Array
        clickedTags.splice(positionIndex, 1)

        //remove the tag from the tags BAR
        event.path[1].outerHTML = " ";


        if ( clickedTags.length <= 0) {

            allRecepiess(recettes);

        }
    }
})



///////////////////////////////////////// Filter ingredients in KEYUP ///////////////////////////////////////////////

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






 