import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // for polyfilling everything else
import 'regenerator-runtime/runtime'; // for polyfilling async await
import recipeView from './views/recipeView.js';

// console.log(icons);

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    // guard clause for when there is no id
    if (!id) return;
    recipeView.renderSpinner();

    // 1) loading recipe
    await model.loadRecipe(id); // this is an async function so it will return a promise

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
// write the previous two line with the following line:
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
