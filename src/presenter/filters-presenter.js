import { render } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';

export default class FiltersPresenter {
  #container = null;
  #filters = [];

  constructor({container, filterTypes}) {
    this.#container = container;

    this.#filters = filterTypes;
  }

  init() {
    render(new FiltersView(this.#filters), this.#container);
  }
}
