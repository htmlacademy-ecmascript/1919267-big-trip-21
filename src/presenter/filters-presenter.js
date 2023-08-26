import { FilterType } from '../const.js';
import { render } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';

export default class FiltersPresenter {
  #container = null;
  #filters = [];

  constructor(container) {
    this.#container = container;

    this.#filters = Object.keys(FilterType);
  }

  init() {
    render(new FiltersView(this.#filters), this.#container);
  }
}
