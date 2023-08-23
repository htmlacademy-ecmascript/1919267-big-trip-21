import {render} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import PointSortView from '../view/point-sort-view.js';
import EventEditView from '../view/event-edit-view.js';
import PointsListItemView from '../view/points-list-item-view.js';

export default class EventsPresenter {
  #pointsModel = null;
  #points = [];
  #pointsBoardContainer = null;
  #pointSortComponent = new PointSortView();
  #pointsListComponent = new PointsListView();

  constructor({pointsBoardContainer, pointsModel}) {
    this.#pointsBoardContainer = pointsBoardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    render(this.#pointSortComponent, this.#pointsBoardContainer);
    render(this.#pointsListComponent, this.#pointsBoardContainer);
    render(new EventEditView({point: this.#points[0]}), this.#pointsListComponent.element);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointsListItemView({point});
    render(pointComponent, this.#pointsListComponent.element);
  }
}
