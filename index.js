/* jshint esversion:6 */
//------ constants------//
let apiKey = "511875a449msh345924786dde0edp1d0713jsnad35d7ea4431"; // set once
const apiHost = "themealdb.p.rapidapi.com";
let fetchParams = ""; // set once

// one time fetch strings
let categoryListString = "";
let cuisineListString = "";

function myDebug(str) {
    console.log(str);
}

function displayErrorMessage() {
  let htmlString = "Sorry, there was an error with the request.";

  $('section.js-results').html(htmlString);
  $('.js-results').removeClass("hidden");
}

// ------ Key Lists ------ //
// This is what we expect from the fetch requests
const mealKeyList = ["idMeal", "strMeal", "strMealThumb"];
const areaKeyList = ["strArea"];
const categoryKeyList = ["idCategory", "strCategory", "strCategoryDescription"];
const recipeKeyList = ["idMeal", "strMeal", "strArea", "strCategory", "strMealThumb", // (0-4)
  "strMeasure1", "strIngredient1",
  "strMeasure2", "strIngredient2",
  "strMeasure3", "strIngredient3",
  "strMeasure4", "strIngredient4",
  "strMeasure5", "strIngredient5",
  "strMeasure6", "strIngredient6",
  "strMeasure7", "strIngredient7",
  "strMeasure8", "strIngredient8",
  "strMeasure9", "strIngredient9",
  "strMeasure10", "strIngredient10", // (23-24)
  "strMeasure11", "strIngredient11",
  "strMeasure12", "strIngredient12",
  "strMeasure13", "strIngredient13",
  "strMeasure14", "strIngredient14",
  "strMeasure15", "strIngredient15",
  "strMeasure16", "strIngredient16",
  "strMeasure17", "strIngredient17",
  "strMeasure18", "strIngredient18",
  "strMeasure19", "strIngredient19",
  "strMeasure20", "strIngredient20",
  "strInstructions", "strYoutube"]; // (45-46)

//------ fetch parameters------//
function setupFetchParams() {

    fetchParams = {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": apiKey,
		    "x-rapidapi-host": apiHost
        }
    };
    
    // one time fetches
    oneTimeFetches();
}

//------ one-time fetch requests------//
/* List all meal categories
Includes strCategory, strCategoryDescription, and strCategoryThumb
for each object in the response array. */
function fetchMealCategories() {
  let searchUrl = "https://themealdb.p.rapidapi.com/categories.php";

  fetch(searchUrl, fetchParams)
  .then(response => response.json() )
  .then(responseJson => {
      parseCategoryResponse(responseJson);
  })
  .catch(err => {
    displayErrorMessage();
    console.log("There was an error with the request: " + err);
  });
}

/* List all areas (cuisines)
Includes strArea 
for each object in the response array. */
function fetchCuisines() {
    let searchUrl = "https://themealdb.p.rapidapi.com/list.php?a=list";

    fetch(searchUrl, fetchParams)
  .then(response => response.json() )
  .then(responseJson => {
      parseCuisineResponse(responseJson);
  })
  .catch(err => {
    displayErrorMessage();
    console.log("There was an error with the request: " + err);
  });
}

//------ Repeat Requests------//
/* List meals by ingredient list
Includes idMeal, strMeal, and strMealThumb
for each object in the response array. Ingredients are separated by %2C */
function fetchByIngredientList( ingredientList) {

  let searchUrl = `https://themealdb.p.rapidapi.com/filter.php?i=${ingredientList}`;

  fetch(searchUrl, fetchParams)
  .then(response => response.json() )
  .then(responseJson => {
      parseMealResponse(responseJson);
  })
  .catch(err => {
    displayErrorMessage();
    console.log("There was an error with the request: " + err);
  });
}

/* List meals by category
Includes idMeal, strMeal, and strMealThumb
for each object in the response array. */
function fetchByCategory( searchCategory) {
  let searchUrl = `https://themealdb.p.rapidapi.com/filter.php?c=${searchCategory}`;

  fetch(searchUrl, fetchParams)
  .then(response => response.json() )
  .then(responseJson => {
      parseMealResponse(responseJson);
  })
  .catch(err => {
    displayErrorMessage();
    console.log("There was an error with the request: " + err);
  });
}

/* List meals by Area (cuisines)
Includes idMeal, strMeal, and strMealThumb
for each object in the response array. */
function fetchByCuisine( searchArea) {
  let searchUrl = `https://themealdb.p.rapidapi.com/filter.php?a=${searchArea}`;

  fetch(searchUrl, fetchParams)
  .then(response => response.json() )
  .then(responseJson => {
      parseMealResponse(responseJson);
  })
  .catch(err => {
    displayErrorMessage();
    console.log("There was an error with the request: " + err);
  });
}

//------ Full Recipe Requests ------//
/* Returns:
idMeal, strArea, strCategory, strMeal, strMealThumb,
strIngredient1-20
strMeasure1-20
strInstructions, strYoutube
for each object in the array
*/
// id
function fetchRecipeById(recipeId) {
    let searchUrl = `https://themealdb.p.rapidapi.com/lookup.php?i=${recipeId}`;
    
    fetch(searchUrl, fetchParams)
    .then(response => response.json() )
    .then(responseJson => {
        myDebug(responseJson);
        parseRecipeResponse(responseJson);
    })
    .catch(err => {
      displayErrorMessage();
      console.log("There was an error with the request: " + err);
    });
}
// by name -- NOT IMPLEMENTED since there is a good chance the API won't find anything.
/* function fetchRecipeByName(recipeName) {
    myDebug("fetchRecipeByName called");
    let searchUrl = `https://themealdb.p.rapidapi.com/search.php?s=${recipeName}`;

    fetch(searchUrl, fetchParams)
    .then(response => response.json() )
    .then(responseJson => {
        myDebug(responseJson);
        // call parser here
    })
    .catch(err => {
        console.log("There was an error with the request: " + err);
    });
} */
// 10 random
function fetchRecipesTenRandom() {
    let searchUrl = "https://themealdb.p.rapidapi.com/randomselection.php";

    fetch(searchUrl, fetchParams)
    .then(response => response.json() )
    .then(responseJson => {
      myDebug(responseJson);
      parseRecipeResponse(responseJson);
    })
    .catch(err => {
      displayErrorMessage();
      console.log("There was an error with the request: " + err);
    });
}
// ----- HTML FUNCTIONS ----- //
// mealKeyList = ["idMeal", "strMeal", "strMealThumb"];
function structureMealHtml(valueArray) {
  let htmlString = 
  `<div class="meal-child">
      <button type="button" class="mealButton" value="${valueArray[0]}"><h2>${valueArray[1]}</h2></button>
      <div class="imgContainer">
        <img src="${valueArray[2]}" alt="${valueArray[1]}">
      </div>
    </div>`;
  return htmlString;
}
  
// areaKeyList = ["strArea"];
function structureCuisineHtml(valueArray) {
  let htmlString = `<button type="button" class="cuisineButton cuisine-child" value="${valueArray[0]}"><h2>${valueArray[0]}</h2></button>`;
  return htmlString;
}

// categoryKeyList = ["idCategory", "strCategory", "strCategoryDescription"];
function structureCategoryHtml(valueArray) {
  let htmlString = 
  `<div class="category-child">
      <button type="button" class="categoryButton" value="${valueArray[1]}"><h2>${valueArray[1]}</h2></button>
      <p>${valueArray[2]}</p>
    </div>`;

  return htmlString;
}

/* recipeKeyList = ["idMeal", "strMeal", "strArea", "strCategory", "strMealThumb", (0-4)
  "strMeasure1", "strIngredient1",
  "strMeasure2", "strIngredient2",
  "strMeasure3", "strIngredient3",
  "strMeasure4", "strIngredient4",
  "strMeasure5", "strIngredient5",
  "strMeasure6", "strIngredient6",
  "strMeasure7", "strIngredient7",
  "strMeasure8", "strIngredient8",
  "strMeasure9", "strIngredient9",
  "strMeasure10", "strIngredient10",
  "strMeasure11", "strIngredient11",
  "strMeasure12", "strIngredient12",
  "strMeasure13", "strIngredient13",
  "strMeasure14", "strIngredient14",
  "strMeasure15", "strIngredient15",
  "strMeasure16", "strIngredient16",
  "strMeasure17", "strIngredient17",
  "strMeasure18", "strIngredient18",
  "strMeasure19", "strIngredient19",
  "strMeasure20", "strIngredient20",
  "strInstructions", "strYoutube"];   (45-46)
*/
function structureIngredientListHtml(valueArray) {

  let htmlString = "";
  let pairCount = 1;

  for( let i = 5; i < 44; i += 2) { //strMeasure1 = 5, strIngredient20 = 44
    if((valueArray[i] !== "") && (valueArray[i] !== null)) {
      htmlString += `<p class="ing-measure pair-${pairCount}">${valueArray[i]}  ${valueArray[i+1]}</p>`;
      pairCount++;
    }
  }

  return htmlString;
}

function structureRecipeHtml(valueArray) {
  let htmlString = 
  `<section class="recipe" id="recipe-${valueArray[0]}">
    <div class="recipe-top">
      <div class="recipeHeader">
        <h2>${valueArray[1]}</h2>
        <h3>Cuisine: ${valueArray[2]}</h3>
        <h3>Category: ${valueArray[3]}</h3>
        <img src="${valueArray[4]}" alt="${valueArray[1]}">
      </div>
      <div class="ingredientsList">
        ${structureIngredientListHtml(valueArray)}
      </div>
    </div>
  <hr class="ingredient-break">
  <pre>${valueArray[45]}</pre>
  <a class="youtubeButton" href="${valueArray[46]}">Youtube</a>
  </section>`;
  return htmlString;
}


function generateHtmlElements( displayObj, keyList, fetchType) {
  let htmlString = "";
  let fetchResults = [];

  // organizes the fetchResults array based on keyList order
  for ( let i = 0; i < keyList.length; i++) {
    let objValue = displayObj[keyList[i]];

    fetchResults.push(objValue);
    
  }

  switch(fetchType) {
    case "category":
      myDebug("category");
      htmlString = structureCategoryHtml(fetchResults);
      break;
    
    case "cuisine":
      myDebug("cuisine");
      htmlString = structureCuisineHtml(fetchResults);
      break;

    case "meal":
      myDebug("meal");
      htmlString = structureMealHtml(fetchResults);
      break;

    case "recipe":
      myDebug("recipe");
      htmlString = structureRecipeHtml(fetchResults);
      htmlString += '<hr class="recipe-break">';
      break;

    default:
      console.log("Error occurred during parsing the fetch results.");
  }
  return htmlString;
}

// ------ Hide All Screens ------//
function hideAllScreens() {
  $('.contact').addClass("hidden");
  $('.js-results').addClass("hidden");
  $('.ingredientSearch').addClass("hidden");
  $('.info').addClass("hidden");
}


// ------ Parsing Response Arrays--------//
function parseCategoryResponse(responseJson) {
    const categoriesData = responseJson.categories;
    categoryListString += `<section class="category">
      ${categoriesData.map( category => generateHtmlElements(category,categoryKeyList, "category") ).join("\n")}
    </section>`;
}

// cuisines/areas
function parseCuisineResponse(responseJson) {
    const cuisinesData = responseJson.meals;
    cuisineListString += `<section class="cuisine">
        ${cuisinesData.map(cuisine => generateHtmlElements(cuisine, areaKeyList, "cuisine") ).join("\n")}
    </section>`;
}

// recipes
function parseRecipeResponse(responseJson) {
  const recipesData = responseJson.meals;
  let recipeString = "";

  if (recipesData) {// null = false
    recipesData.forEach( recipe => {
      recipeString += generateHtmlElements(recipe, recipeKeyList, "recipe");
    }) ;
  } 
  else {
    myDebug("no results");
    recipeString = '<p class="noResults">No results found.</p>';
  }

  $('section.js-results').html(recipeString);
  $('.js-results').removeClass("hidden");
}


// Includes idMeal, strMeal, and strMealThumb
function parseMealResponse(responseJson) {
  const mealsData = responseJson.meals;
  let mealsString = "";

  if (mealsData) {// null = false
    mealsString = `<section class="meal">
    ${mealsData.map( meal => generateHtmlElements(meal, mealKeyList, "meal") ).join("\n")}
    </section>`;
  }
  else {
    myDebug("no results");
    mealsString = '<p class="noResults">No results found.</p>';
  }

  $('section.js-results').html(mealsString);
  $('.js-results').removeClass("hidden");
}

// ---------- Handle Navigation and Fetching---------- //
function oneTimeFetches() {

    if(fetchParams != "") {
        fetchMealCategories();
        fetchCuisines();
    }
}

// handle Category button
function handleCategoryNavigation() {
    $('#categoryNav').on('click', event => {
        event.preventDefault();

        hideAllScreens();
        $('section.js-results').html(categoryListString);
        $('.js-results').removeClass("hidden");
    });
}

// handle Cuisine button
function handleCuisineNavigation() {
    $('#cuisineNav').on('click', event => {
        event.preventDefault();

        hideAllScreens();
        $('section.js-results').html(cuisineListString);
        $('.js-results').removeClass("hidden");
    });
}

// handle Random button
function handleRandomeNavigation() {
  $('#randomNav').on('click', event => {
      event.preventDefault();

      hideAllScreens();
      fetchRecipesTenRandom();
  });
}


// handle Ingredients Button
function handleIngredientsNavigation() {
  $('#ingredientsNav').on('click', event => {
      event.preventDefault();

      hideAllScreens();
      $('.ingredientSearch').removeClass("hidden");
  });
}

// handle Contact Button
function handleContactNavigation() {
  $('#contactNav').on('click', event => {
      event.preventDefault();

      hideAllScreens();
      $('.contact').removeClass("hidden");
  });
}
// handle About Button
function handleAboutNavigation() {
  $('footer').on('click', '#aboutNav', event => {
      event.preventDefault();

      hideAllScreens();
      $('.info').removeClass("hidden");
  });
}

// handle dynamic buttons
function handleCategoryButtons() {

  $('.js-results').on('click', '.categoryButton', event => {
    let clickedButton = event.currentTarget;
    let clickedCategory = clickedButton.value;

    hideAllScreens();
    fetchByCategory(clickedCategory);
  });
}

function handleCuisineButtons() {

  $('.js-results').on('click', '.cuisineButton', event => {
    let clickedButton = event.currentTarget;
    let clickedCuisine = clickedButton.value;

    hideAllScreens();
    fetchByCuisine(clickedCuisine);
  });
}

function handleMealButtons() {

  $('.js-results').on('click', '.mealButton', event => {
    let clickedButton = event.currentTarget;
    let clickedMeal = clickedButton.value;

    hideAllScreens();
    fetchRecipeById(clickedMeal);
  });
}

// ---------- Form Submissions  ----------
function watchIngredientSubmit() {

  $('#ingForm').submit( event => {
    event.preventDefault();
    myDebug("ingFormSubmit clicked");

    let ingredientList = [];

    for( let i=1; i < 11; i++) {
      
      let ingredientName = $(`#ing${i}`).val();
      if( ingredientName != "" ) {
        
        ingredientList.push(encodeURIComponent(ingredientName));
      }
      
    }
    let ingredientListString = ingredientList.join("%2C");
    myDebug(ingredientListString);

    hideAllScreens();
    fetchByIngredientList(ingredientListString);
  });
}

// ---------- Splash Screen ----------
function toggleSplashScreenDisplay() {

  if( apiKey === "") {
      $('.keySplash').removeClass("hidden");
  }
  else {
      $('.keySplash').addClass("hidden");
  }
}

function watchSplashScreen() {

  toggleSplashScreenDisplay(); // see if it needs to be revealed

  if( apiKey != "") {
      setupFetchParams();
  }

  $('#keyForm').submit( event => {
      event.preventDefault();

      apiKey = $('#user-key').val();
      setupFetchParams();
      toggleSplashScreenDisplay();
  });
}


// ------ Initial Function ------ //
function startApp() {
  myDebug("startApp called");
  watchSplashScreen();
  handleCategoryNavigation();
  handleCuisineNavigation();
  handleRandomeNavigation();
  handleIngredientsNavigation();
  handleContactNavigation();
  handleAboutNavigation();
  watchIngredientSubmit();
  // dynamic
  handleCategoryButtons();
  handleCuisineButtons();
  handleMealButtons();
}

$(startApp);
