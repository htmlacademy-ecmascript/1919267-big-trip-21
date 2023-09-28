import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilter) {
  const {type} = filter;
  return `<div class="trip-filters__filter">
  <input
    id="filter-${type}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value=${type}
    ${type === currentFilter ? 'checked' : ''}
  />
  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
</div>`;
}

function createFiltersFormTemplate(filters, currentFilter) {
  return `<form class="trip-filters" action="#" method="get">
  ${filters.map((item) => createFilterItemTemplate(item, currentFilter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class FiltersView extends AbstractView {
  #filters = [];
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersFormTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#handleFilterTypeChange(evt.target.value);
  };
}
