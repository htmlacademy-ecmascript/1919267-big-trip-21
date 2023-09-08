import PointsListItemView from '../view/points-list-item-view';
import PointEditView from '../view/point-edit-view.js';
import {render, replace} from '../framework/render.js';

export default class PointPresenter {
  #pointsListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;

  constructor({pointsListContainer}) {
    this.#pointsListContainer = pointsListContainer;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointsListItemView({
      point: this.#point,
      onArrowClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#pointEditComponent = new PointEditView({
      point,
      onFormSubmit: () => this.#getBackToCardDisplay(),
      onArrowClick: () => this.#getBackToCardDisplay()
    });

    render(this.#pointComponent, this.#pointsListContainer);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#getBackToCardDisplay();
    }
  };

  #getBackToCardDisplay = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
  };
}
