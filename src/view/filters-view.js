import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

function createFilterItemTemplate(filterTitle) {
  return `<div class="trip-filters__filter">
  <input id="filter-${filterTitle}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${filterTitle}>
  <label class="trip-filters__filter-label" for="filter-${filterTitle}">${filterTitle}</label>
</div>`;
}

function createFiltersFormTemplate() {
  const filterTitles = Object.keys(FilterType);
  return `<form class="trip-filters" action="#" method="get">
    ${filterTitles.length && filterTitles.map((filter) => createFilterItemTemplate(filter)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class FiltersView extends AbstractView {
  get template() {
    return createFiltersFormTemplate();
  }
}
