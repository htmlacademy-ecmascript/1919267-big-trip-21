import {render} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import PointSortView from '../view/point-sort-view.js';
import PointsListEmptyView from '../view/points-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';

export default class BoardPresenter {
  #pointsModel = null;
  #points = [];
  #pointsBoardContainer = null;
  #pointSortComponent = null;
  #pointsListComponent = null;
  #pointPresenters = new Map();

  constructor({pointsBoardContainer, pointsModel}) {
    this.#pointsBoardContainer = pointsBoardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      onDataChange: this.#pointChangeHandler,
      onModeChange: this.#modeChangeHandler
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  #renderPointContainer = () => {
    this.#pointsListComponent = new PointsListView();
    render(this.#pointsListComponent, this.#pointsBoardContainer);
  };

  #renderSort = () => {
    this.#pointSortComponent = new PointSortView();
    render(this.#pointSortComponent, this.#pointsBoardContainer);
  };

  #renderBoard = () => {
    if(!this.#points.length) {
      render(new PointsListEmptyView(), this.#pointsBoardContainer);
      return;
    }

    this.#renderSort();
    this.#renderPointContainer();
    this.#renderPoints();
  };

  #pointChangeHandler = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
