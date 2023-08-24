import {render, replace} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import PointSortView from '../view/point-sort-view.js';
import PointsListItemView from '../view/points-list-item-view.js';
import PointEditView from '../view/point-edit-view.js';

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
    render(this.#pointSortComponent, this.#pointsBoardContainer);
    render(this.#pointsListComponent, this.#pointsBoardContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointsListItemView({
      point,
      onArrowClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointEditView({
      point,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onArrowClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointsListComponent.element);
  }
}
