//------ constants------//
var apiKey = "";
const apiHost = "themealdb.p.rapidapi.com";

function myDebug(str) {
    console.log(str);
}

//------ fetch parameters------//
function setupFetchParams() {

    toggleSplashScreenDisplay(); // just to make sure there is a key

    let fetchParams = {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": apiKey,
		    "x-rapidapi-host": apiHost
        }
    };
    return fetchParams;
}

//------ one-time fetch requests------//
/* List all meal categories
Includes strCategory, strCategoryDescription, and strCategoryThumb
 for each object in the response array. */
function fetchMealCategories() {
    myDebug("fetchMealCategories called");
    let searchUrl = "https://themealdb.p.rapidapi.com/categories.php";
}

/* List all areas (cuisines)
Includes strArea 
 for each object in the response array. */
 function fetchCuisines() {
     myDebug("fetchCuisines called");
     let searchUrl = "https://themealdb.p.rapidapi.com/list.php?a=list";
 }

 //------ Repeat Requests------//
 /* List meals by ingredient list
Includes idMeal, strMeal, and strMealThumb
 for each object in the response array. Ingredients are separated by %2C */
 function fetchByIngredientList( ingredientList) {
     myDebug("fetchByIngredientList called");
     let searchUrl = "https://themealdb.p.rapidapi.com/filter.php?i=";
 }

  /* List meals by category
Includes idMeal, strMeal, and strMealThumb
 for each object in the response array. */
 function fetchByCategory( searchCategory) {
    myDebug("fetchByCategory called");
    let searchUrl = "https://themealdb.p.rapidapi.com/filter.php?c=";
}

  /* List meals by Area (cuisines)
Includes idMeal, strMeal, and strMealThumb
 for each object in the response array. */
 function fetchByCuisine( searchArea) {
    myDebug("fetchByCuisine called");
    let searchUrl = "https://themealdb.p.rapidapi.com/filter.php?a=";
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
    let searchUrl = "https://themealdb.p.rapidapi.com/lookup.php?i=";
}
// by name
function fetchRecipeByName(recipeName) {
    myDebug("fetchRecipeByName called");
    let searchUrl = "https://themealdb.p.rapidapi.com/search.php?s=";
}
// 10 random
function fetchRecipesTenRandom() {
    myDebug("fetchRecipesTenRandom called");
    let searchUrl = "https://themealdb.p.rapidapi.com/randomselection.php";
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

  console.log("watchSplashScreen called");

  $('#keyForm').submit( event => {
      event.preventDefault();

      apiKey = $('#user-key').val();
      myDebug("User key = " + apiKey);
      toggleSplashScreenDisplay();
  });
}

$(watchSplashScreen);