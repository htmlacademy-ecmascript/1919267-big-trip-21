import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate({type}) {
  return `<div class="trip-filters__filter">
  <input
    id="filter-${type}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value=${type}
    data-filter-type="${type}"
  />
  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
</div>`;
}

function createFiltersFormTemplate(filters) {
  return `<form class="trip-filters" action="#" method="get">
  ${filters.length && filters.reduce((acc, item) => acc + createFilterItemTemplate(item), [])}

    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class FiltersView extends AbstractView {
  #filters = [];
  #handleFilterTypeChange = null;

  constructor({filters, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createFiltersFormTemplate(this.#filters);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleFilterTypeChange(evt.target.dataset.filterType);
  };
}
