import {render, replace, remove, RenderPosition} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import PointSortView from '../view/point-sort-view.js';
import PointsListEmptyView from '../view/points-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, DEFAULT_SORT_TYPE, availableSortType, UserAction, UpdateType } from '../const.js';
import { sorting } from '../utils/sorting.js';

export default class BoardPresenter {
  #points = null;
  #pointsModel = null;
  #offersModel = null;
  #pointsBoardContainer = null;
  #pointSortComponent = null;
  #currentSortType = DEFAULT_SORT_TYPE;
  #pointsListComponent = null;
  #pointPresenters = new Map();

  constructor({pointsBoardContainer, pointsModel, offersModel}) {
    this.#pointsBoardContainer = pointsBoardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return this.#pointsModel.points;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#points = sorting[this.#currentSortType](this.#points);
    this.#renderBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#modeChangeHandler
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#pointSortComponent);
    remove(this.#pointsListComponent);

    if(resetSortType){
      this.#currentSortType = DEFAULT_SORT_TYPE;
    }
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
      }));

    const prevSortComponent = this.#pointSortComponent;
    this.#pointSortComponent = new PointSortView({
      sortItems: sortTypes,
      currentSortType: this.#currentSortType,
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
    if(!this.points.length) {
      render(new PointsListEmptyView(), this.#pointsBoardContainer);
      return;
    }

    this.#renderSort();
    this.#renderPointContainer();
    this.#renderPoints();
  };

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    return sorting[this.#currentSortType](this.points);
  };

  #sortChangeHandler = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearBoard();
    this.#renderSort();
    this.#renderBoard();
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
