import PointsListItemView from '../view/points-list-item-view';
import PointEditView from '../view/point-edit-view.js';
import {render, replace, remove} from '../framework/render.js';
import {Mode, UserAction, UpdateType} from '../const';
import { areDatesEqual } from '../utils/point';

export default class PointPresenter {
  #pointsListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #offersModel = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({pointsListContainer, offersModel, onDataChange, onModeChange}) {
    this.#pointsListContainer = pointsListContainer;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointsListItemView({
      point: this.#point,
      offers: this.#offersModel.offers,
      onDataChange: this.#handleDataChange,
      onArrowClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavouriteClick
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      offers: this.#offersModel.offers,
      onFormSubmit: this.#handleFormSubmit,
      onArrowClick: this.#handleFormCollapse,
      onDeleteButtonClick: this.#handleDeleteClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  #handleFormCollapse = () => {
    this.resetView();
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate = !areDatesEqual(this.#point.dateFrom, update.dateFrom) ||
    !areDatesEqual(this.#point.dateTo, update.dateTo) ||
    this.#point.basePrice !== update.basePrice;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#getBackToCardDisplay();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#getBackToCardDisplay();
    }
  };

  #handleFavouriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #getBackToCardDisplay = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDIT;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
