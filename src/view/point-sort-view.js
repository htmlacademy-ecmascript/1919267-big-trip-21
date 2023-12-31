import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate ({type, isDisabled}, currentSortType) {
  return `<div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${type}"
        data-sort-type="${type}"
        ${(isDisabled) ? 'disabled' : ''}
        ${(type === currentSortType) ? 'checked' : ''}
      />
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>
  `;
}

function createPointSortListTemplate (sortTypes, currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortTypes.length && sortTypes.reduce((acc, item) => acc + createSortItemTemplate(item, currentSortType), [])}
    </form>`
  );
}

export default class PointSortView extends AbstractView {
  #sortTypes = [];
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({sortItems, currentSortType, onSortTypeChange}) {
    super();
    this.#sortTypes = sortItems;
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createPointSortListTemplate(this.#sortTypes, this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
