import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now'
};

function createPointsListEmptyTemplate (filterType) {
  const noPointsTextValue = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${noPointsTextValue}</p>`;
}

export default class PointsListEmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createPointsListEmptyTemplate(this.#filterType);
  }
}
