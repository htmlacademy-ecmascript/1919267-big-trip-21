import { DEFAULT_FILTER_TYPE, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';
import { render, replace, remove } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';

export default class FiltersPresenter {
  #container = null;
  #pointsModel = null;
  #points = [];
  #filters = [];
  #filterComponent = null;
  #currentFilterType = DEFAULT_FILTER_TYPE;

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#filters = Object.values(FilterType)
      .map((type) => ({
        type,
        isDisabled: false,
        isChecked: (type === this.#currentFilterType)
      }));

    this.#renderFilters();
  }

  #renderFilters () {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters: this.#filters,
      onFilterTypeChange: this.#filterChangeHandler
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #filterChangeHandler = (filterType) => {
    this.#filterPoints(filterType);
  };

  #filterPoints = (filterType) => {
    this.#currentFilterType = filterType;
    this.#points = filter[this.#currentFilterType](this.#points);
  };
}
