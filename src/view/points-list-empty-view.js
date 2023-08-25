import AbstractView from '../framework/view/abstract-view.js';

function createPointsListEmptyTemplate () {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class PointsListEmptyView extends AbstractView {
  get template() {
    return createPointsListEmptyTemplate();
  }
}
