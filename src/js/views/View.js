// this is a general module that will be extended by others Views (resultsView and recipeView)
// import icons from '../img/icons.svg'; // Parcel v1.0
import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg'; // Parcel v2.0

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup); // these methods will convert the string (newMarkup) into real DOM Node objects
    const newElements = Array.from(newDOM.querySelectorAll('*')); // select all the NEW elements AFTER we click the increase of decrease button of servings and store them in an ARRAY
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // select all the OLD elements BEFORE we click the increase of decrease button of servings and store them in an ARRAY
    // console.log(curElements);
    // console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // updates changed TEXT
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        // isEqualNode returns true or false if the elements are identical
        // the second condition make sure that elements contain text directly
        curEl.textContent = newEl.textContent; // in case if it is false we will update the DOM where it was about to change
      }

      // updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value)); // replace all the attributes in the current element by the attributes coming from the new element
    });
  }

  _clear() {
    this._parentElement.innerHTML = ''; // emptying out the container before adding the new elements to it
  }

  // render the spinner icon
  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    /div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // render the error in the user interface
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
            <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
