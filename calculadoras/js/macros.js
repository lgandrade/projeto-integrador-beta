// Set variable equal to the DOM element button with id "carry-pdct" 
let carryPdct = document.getElementById("carry-pdct");

// Attach event listener to the variable, to run function "importPdct" when a "click" event occurs
carryPdct.addEventListener("click", importPdct);

// Hide the "choose-macro" table until PDCT has been imported
let macroSplitDisplay = document.getElementById("choose-macro");
macroSplitDisplay.classList.add("hide");

// Defining the importPdct function to be ran by event listener above
function importPdct() {
    /*Take the pdct from local storage and set it to the inner HTML contents of the DOM element "pdct-box"
    This displays/imports the user's pdct from the previous page in preparation for the application of 
    Macro-nutrient split option selections */
    if (isNaN(localStorage.pdct)) {
        alert("Please complete PDCT calculation on prior page before proceeding");
        document.getElementById("pdct-box").innerHTML = "";
        return;
    }
    document.getElementById("pdct-box").innerHTML = localStorage.pdct;
    macroSplitDisplay.classList.remove("hide");
}

let toFinalStepBtn = document.getElementById("toFinalStepBtn");
let yourMacrosSection = document.getElementById("yourMacrosSection");

let macroChoice = document.getElementById("calculate-macros");
macroChoice.classList.add("hide");

// Add event listener to the button, to run function "splitMacros" when a "click" event occurs 
macroChoice.addEventListener("click", splitMacros);

/* Create an array of all DOM elements with name "macro_choice" (i.e all radio buttons) and store
in variable macroArray*/
let macroArray = document.getElementsByName("macro_choice");

// find all radio buttons
const radios = document.querySelectorAll("input[name='macro_choice']");
// add click-event for all radio buttons
radios.forEach((radio) => {
    radio.addEventListener("click", checkRadio);
});

// check if any radio buttons are 'checked'
function checkRadio() {
    // unhide the macroChoice button
    macroChoice.classList.remove("hide");
}

// Declare variable for use in function splitMacros to check which macro option the user has selected
let chosenOption;

/* Function used by event listener to go through each macroArray element and check if it has been selected, applying the 
appropriate macronutrient split in each case*/
function splitMacros(event) {
    // Prevent default submission of form when button is clicked
    event.preventDefault();

    // Keep navbar link to next page, next step button, and macro display table hidden until pdct is present in local storage
    if (!localStorage.getItem("pdct")) {
        alert("Please complete PDCT calculation on prior page before proceeding");
        return;
    }

    let pdct = parseInt(localStorage.pdct, 10);
    let protein = 0, carbs = 0, fat = 0;

    // Apply the "standard" macronutrient split if "standard" radio button has been selected by user 
    if (macroArray[0].checked) {
        chosenOption = "standard";
        protein = Math.floor(pdct * 0.25);
        carbs = Math.floor(pdct * 0.45);
        fat = Math.floor(pdct * 0.30);
        localStorage.setItem("macro", "standard");

        // Apply the "high protein" macronutrient split if the "high protein" radio button has been selected by user 
    } else if (macroArray[1].checked) {
        chosenOption = "highprotein";
        protein = Math.floor(pdct * 0.40);
        carbs = Math.floor(pdct * 0.35);
        fat = Math.floor(pdct * 0.25);
        localStorage.setItem("macro", "highprotein");

        // Apply the "lowcarb" macronutrient split if the "low carb" radio button has been selected by user 
    } else if (macroArray[2].checked) {
        chosenOption = "lowcarb";
        protein = Math.floor(pdct * 0.35);
        carbs = Math.floor(pdct * 0.10);
        fat = Math.floor(pdct * 0.55);
        localStorage.setItem("macro", "lowcarb");

    } else {
        // If no option is selected
        chosenOption = "notselected";
        alert("Please select a macronutrient split option.");
        return;
    }

    // Update each HTML element on the DOM using the variables above
    document.getElementById("protein").innerHTML = protein;
    document.getElementById("carbs").innerHTML = carbs;
    document.getElementById("fat").innerHTML = fat;
    document.getElementById("total").innerHTML = pdct;

    // Show the macro results and the link to the final step
    yourMacrosSection.classList.remove("hide");
    toFinalStepBtn.classList.remove("hide");
    // End of splitMacros function
}
