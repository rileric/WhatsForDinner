/* jshint esversion:6 */
//------ constants------//
let apiKey = ""; // set once
const apiHost = "themealdb.p.rapidapi.com";
let fetchParams = ""; // set once

// one time fetch strings
let categoryListString = "";
let cuisineListString = "";
let randomListString = "";

function myDebug(str) {
    console.log(str);
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
        console.log("There was an error with the request: " + err);
    });
 }

 //------ Repeat Requests------//
 /* List meals by ingredient list
Includes idMeal, strMeal, and strMealThumb
 for each object in the response array. Ingredients are separated by %2C */
 function fetchByIngredientList( ingredientList) {
    myDebug("fetchByIngredientList called");
    let searchUrl = `https://themealdb.p.rapidapi.com/filter.php?i=${ingredientList}`;

    fetch(searchUrl, fetchParams)
    .then(response => response.json() )
    .then(responseJson => {
        parseMealResponse(responseJson);
    })
    .catch(err => {
        console.log("There was an error with the request: " + err);
    });
 }

  /* List meals by category
Includes idMeal, strMeal, and strMealThumb
 for each object in the response array. */
 function fetchByCategory( searchCategory) {
    myDebug("fetchByCategory called");
    let searchUrl = `https://themealdb.p.rapidapi.com/filter.php?c=${searchCategory}`;

    fetch(searchUrl, fetchParams)
    .then(response => response.json() )
    .then(responseJson => {
        parseMealResponse(responseJson);
    })
    .catch(err => {
        console.log("There was an error with the request: " + err);
    });
}

  /* List meals by Area (cuisines)
Includes idMeal, strMeal, and strMealThumb
 for each object in the response array. */
 function fetchByCuisine( searchArea) {
    myDebug("fetchByCuisine called");
    let searchUrl = `https://themealdb.p.rapidapi.com/filter.php?a=${searchArea}`;

    fetch(searchUrl, fetchParams)
    .then(response => response.json() )
    .then(responseJson => {
        parseMealResponse(responseJson);
    })
    .catch(err => {
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
    myDebug("fetchRecipeById called");
    let searchUrl = `https://themealdb.p.rapidapi.com/lookup.php?i=${recipeId}`;
    
    fetch(searchUrl, fetchParams)
    .then(response => response.json() )
    .then(responseJson => {
        myDebug(responseJson);
        parseRecipeResponse(responseJson);
    })
    .catch(err => {
        console.log("There was an error with the request: " + err);
    });
}
// by name
function fetchRecipeByName(recipeName) {
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
}
// 10 random
function fetchRecipesTenRandom() {
    let searchUrl = "https://themealdb.p.rapidapi.com/randomselection.php";

    fetch(searchUrl, fetchParams)
    .then(response => response.json() )
    .then(responseJson => {
      parseRecipeResponse(responseJson);
    })
    .catch(err => {
        console.log("There was an error with the request: " + err);
    });
}
// ----- HTML FUNCTIONS ----- //
// mealKeyList = ["idMeal", "strMeal", "strMealThumb"];
function structureMealHtml(valueArray) {
    let htmlString = 
    `<section class="meal">
      <button type="button" class="mealButton" value="${valueArray[0]}"><h2>${valueArray[1]}</h2></button>
      <img src="${valueArray[2]}" alt="${valueArray[1]}">
    </section>`;
    return htmlString;
  }
  
  // areaKeyList = ["strArea"];
  function structureCuisineHtml(valueArray) {
    let htmlString = `<button class="cuisineButton" type="button" value="${valueArray[0]}">${valueArray[0]}</button>`;
    return htmlString;
  }
  
  // categoryKeyList = ["idCategory", "strCategory", "strCategoryDescription"];
  function structureCategoryHtml(valueArray) {
    let htmlString = 
    `<section class="category" id="category-${valueArray[0]}">
      <button type="button" class="categoryButton" value="${valueArray[1]}"><h2>${valueArray[1]}</h2></button>
      <p>${valueArray[2]}</p>
    </section>`;
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
      if(valueArray[i] != "") {
        htmlString += `<p class="ing-measure-pair-${pairCount}">${valueArray[i]}  ${valueArray[i+1]}</p>`;
        pairCount++;
      }
    }
  
    return htmlString;
  }
  
  function structureRecipeHtml(valueArray) {
    let htmlString = 
    `<section class="recipe" id="recipe-${valueArray[0]}">
      <h2>${valueArray[1]}</h2>
      <h3>Cuisine: ${valueArray[2]}</h3>
      <h3>Category: ${valueArray[3]}</h3>
      <img src="${valueArray[4]}" alt="${valueArray[1]}">`;
  
    htmlString += structureIngredientListHtml(valueArray);
    
    htmlString += 
    `<hr class="recipe-break">
    <p>${valueArray[45]}</p>
    <a href="${valueArray[46]}">Youtube</a>`;
    htmlString += `</section>`;
    return htmlString;
  }
  
  
  function generateHtmlElements( displayObj, keyList, fetchType) {
    let htmlString = "";
    let fetchResults = [];
  
    // organizes the fetchResults array based on keyList order
    for ( let i = 0; i < keyList.length; i++) {
      let objKey = keyList[i];
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
}


// ------ Parsing Response Arrays--------//
function parseCategoryResponse(responseJson) {
    const categoriesData = responseJson.categories;
    categoriesData.forEach( category => {
        categoryListString += generateHtmlElements(category, categoryKeyList, "category");
    }) ;

}

// cuisines/areas
function parseCuisineResponse(responseJson) {
    const cuisinesData = responseJson.meals;
    cuisinesData.forEach( cuisine => {
        cuisineListString += generateHtmlElements(cuisine, areaKeyList, "cuisine");
    }) ;
}

// recipes
/* function parseTenRandomResponse(responseJson) {
  let recipesData = responseJson.meals;
  randomListString = "";

  recipesData.forEach( recipe => {
    randomListString += generateHtmlElements(recipe, recipeKeyList, "recipe");
    randomListString += "<hr class='recipe-break'>";
  }) ;

  $('section.js-results').html(randomListString);
  $('.js-results').removeClass("hidden");
} */

function parseRecipeResponse(responseJson) {
  const recipesData = responseJson.meals;
  let recipeString = "";

  if (recipesData) {// null = false
    recipesData.forEach( recipe => {
      recipeString += generateHtmlElements(recipe, recipeKeyList, "recipe");
      recipeString += "<hr class='recipe-break'>";
    }) ;
  } 
  else {
    recipeString = "No results found.";
  }

  $('section.js-results').html(recipeString);
  $('.js-results').removeClass("hidden");
}


// Includes idMeal, strMeal, and strMealThumb
function parseMealResponse(responseJson) {
  myDebug("parseMealResponse called");
  const mealsData = responseJson.meals;
  let mealsString = "";

  if (mealsData) {// null = false
    mealsData.forEach( meal => {
      mealsString += generateHtmlElements(meal, mealKeyList, "meal");
      mealsString += "<hr class='meal-break'>";
    }) ;
  }
  else {
    mealsString = "No results found.";
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

      if(eval(`$('#ing${i}').val() != ""`) ){
        let ingredientName = "test"
        eval(`ingredientName = $('#ing${i}').val()`);
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
  watchIngredientSubmit();
  // dynamic
  handleCategoryButtons();
  handleCuisineButtons();
  handleMealButtons();
}

$(startApp);
