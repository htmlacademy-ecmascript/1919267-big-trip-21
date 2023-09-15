import {render, replace, remove, RenderPosition} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import PointSortView from '../view/point-sort-view.js';
import PointsListEmptyView from '../view/points-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType, DEFAULT_SORT_TYPE, availableSortType } from '../const.js';
import { sorting } from '../utils/sorting.js';

export default class BoardPresenter {
  #pointsModel = null;
  #points = [];
  #pointsBoardContainer = null;
  #pointSortComponent = null;
  #currentSortType = DEFAULT_SORT_TYPE;
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
    const sortTypes = Object.values(SortType)
      .map((type) => ({
        type,
        isDisabled: !availableSortType[type],
        isChecked: (type === this.#currentSortType)
      }));

    const prevSortComponent = this.#pointSortComponent;
    this.#pointSortComponent = new PointSortView({
      sortItems: sortTypes,
      onSortTypeChange: this.#sortChangeHandler
    });

    if(prevSortComponent){
      replace(this.#pointSortComponent, prevSortComponent);
      remove(prevSortComponent);
    }else{
      render(this.#pointSortComponent, this.#pointsBoardContainer);
    }
    render(this.#pointSortComponent, this.#pointsBoardContainer, RenderPosition.AFTERBEGIN);
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

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#points = sorting[this.#currentSortType](this.#points);
  };

  #sortChangeHandler = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderSort();
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
