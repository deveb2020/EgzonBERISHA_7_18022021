import {recipes} from "./Recipes.js";
import {allRecepiess} from "./recettes-template.js"
let recettes = recipes;



//DOM elements
const appareilPlaceholder = document.getElementById('Appareil-placeholder');
const tagsPlaceholder = document.getElementById('tags-placeholder');
const inputAppareils = document.getElementById('input-Appareil');
const recetteContainerDOM = document.getElementById('recettes-container');

let clickedTags = [];
let appareilArray = [];
let filteredRecettesClick = [];


//create an loop in recettes to grab all the wanted elements and push them to the empty array
recettes.forEach(recette => {
    appareilArray.push(recette.appliance)
})

//create a new varible and remove the duplicants from the first array
let appareilArrayUniques = [...new Set(appareilArray)];


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////  DISPLAY INGREDIENTS BY DEFAULT //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Display all the appareils by default
function showAppareils(appareils) {

    appareils.forEach(appareil => {
        const listItem =  document.createElement('li');
        listItem.innerHTML = `${appareil}`
    
        listItem.classList.add('liAppareil');
        appareilPlaceholder.appendChild(listItem);
    })
}

showAppareils(appareilArrayUniques);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// ADD APPAREILS IN TAGS BAR //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//add a event listener to each element of the array
document.addEventListener('click', (event) =>{

    if (event.target.classList.contains('liAppareil')) {

        // verify if the ingrediant is in the array RETURN if not continue execution
        if (clickedTags.includes(event.target.innerHTML)) return
        else {
            //create an element span each time
            const newElement = document.createElement('span');
            newElement.innerHTML = `${event.target.innerHTML}  <i class="fas fa-times-circle fa-times-circle-appareil"></i>`
            newElement.classList.add('clickedElementGreen');

            //append the span element to the dom element
            tagsPlaceholder.appendChild(newElement)
            
            //remove the search value from the search box
            inputAppareils.value = "";

            // call the function to display every ingredient by default
            showAppareils(appareilArrayUniques);

            //fill the Array each time we click an element
            clickedTags.push(event.target.innerHTML);
            filterRecettesEnClick() 
        };
    }
})

// filter RECETTES ARRAY using tags 
function filterRecettesEnClick() {

    //emty the array 
    filteredRecettesClick = [];
    
    //loop throught each tag and execute this code
    clickedTags.forEach(tag => {

        filteredRecettesClick.push(...recettes.filter(recette => {

            return recette.appliance.includes(tag); 

        }))

    })

    recetteContainerDOM.innerHTML = " ";
    allRecepiess(filteredRecettesClick);
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  REMOVE INGREDIENT FROM TAGS BAR /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-times-circle-appareil')) {

        console.log(event)

        //the NAME of the clicked element
        let currentTagName = event.path[1].innerText.trim();

        //the INDEX of clicked element
        let positionIndex = clickedTags.indexOf(currentTagName)

        //remove the clicked element from the Array
        clickedTags.splice(positionIndex, 1)

        //remove the tag from the tags BAR
        event.path[1].outerHTML = "";

        let removeRecetteFromArray =  filteredRecettesClick.filter(recettes => {
            
            return (recettes.appliance !== currentTagName)
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
inputAppareils.addEventListener('keyup', (key) => {

    // store the input data inside a variable
    const enteredValue = key.target.value.toLowerCase();

    // filter appliance Array and store the result of filtered Array inside of a new variable
    const filteredAppareil = appareilArrayUniques.filter((appareil) => {
        return  (appareil.toLowerCase().includes(enteredValue)); 
    });

    // clean the old html
    appareilPlaceholder.innerHTML = "";
    
    // call the function to populate the the table with wanted ingredients
    showAppareils(filteredAppareil);
});


