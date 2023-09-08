import {render} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import PointSortView from '../view/point-sort-view.js';
import PointsListEmptyView from '../view/points-list-empty-view.js';
import PointPresenter from './point-presenter.js';

export default class PointsPresenter {
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

    if(!this.#points.length) {
      render(new PointsListEmptyView(), this.#pointsBoardContainer);
      return;
    }

    render(this.#pointSortComponent, this.#pointsBoardContainer);
    render(this.#pointsListComponent, this.#pointsBoardContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element
    });
    pointPresenter.init(point);
  }
}
