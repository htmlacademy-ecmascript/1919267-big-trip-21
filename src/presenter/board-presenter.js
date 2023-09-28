import {render, replace, remove, RenderPosition} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import PointSortView from '../view/point-sort-view.js';
import PointsListEmptyView from '../view/points-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, DEFAULT_SORT_TYPE, availableSortType, UserAction, UpdateType, FilterType } from '../const.js';
import { sorting } from '../utils/sorting.js';
import { filter } from '../utils/filter.js';
import AddPointPresenter from './add-point-presenter.js';

export default class BoardPresenter {
  #pointsModel = null;
  #filterModel = null;
  #pointsBoardContainer = null;
  #pointSortComponent = null;
  #currentSortType = DEFAULT_SORT_TYPE;
  #pointsListComponent = new PointsListView();
  #pointPresenters = new Map();
  #emptyListComponent = null;
  #addPointPresenter = null;

  constructor({pointsBoardContainer, pointsModel, filterModel, onAddPointDestroy}) {
    this.#pointsBoardContainer = pointsBoardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#addPointPresenter = new AddPointPresenter({
      container: this.#pointsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onAddPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const filteredPoints = filter[filterType](this.#pointsModel.points);

    return sorting[this.#currentSortType](filteredPoints);
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init() {
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
        this.#pointPresenters.get(data.id).init(data, this.destinations, this.offers);
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

  createPoint() {
    this.#currentSortType = DEFAULT_SORT_TYPE;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addPointPresenter.init(this.destinations, this.offers);

    if(this.#emptyListComponent !== null) {
      remove(this.#emptyListComponent);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#modeChangeHandler
    });
    pointPresenter.init(point, this.destinations, this.offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#addPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#emptyListComponent);

    if(resetSortType){
      this.#currentSortType = DEFAULT_SORT_TYPE;
    }
  };

  #renderPointContainer = () => {
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

  #renderEmptyList = () => {
    this.#emptyListComponent = new PointsListEmptyView({
      filterType: this.#filterModel.filter
    });
    render(this.#emptyListComponent, this.#pointsBoardContainer);
  };

  #renderBoard = () => {
    if(!this.points.length) {
      this.#renderEmptyList();
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
    this.#addPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
