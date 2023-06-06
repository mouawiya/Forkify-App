import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';

import 'core-js/stable'; // for polyfilling everything else
import 'regenerator-runtime/runtime'; // for polyfilling async await
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    // guard clause for when there is no id
    if (!id) return;
    recipeView.renderSpinner();

    // 1) loading recipe
    await model.loadRecipe(id); // this is an async function so it will return a promise

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(); // get the value of "err" from the model then render it to the user interface
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return; // guard clause

    // 2) Load search results
    await model.loadSeachResults(query);

    // 3) render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
