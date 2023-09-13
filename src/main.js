import BoardPresenter from './presenter/board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';
import PointsModel from './model/points-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const pointsBoardContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const eventsBoardPresenter = new BoardPresenter({
  pointsBoardContainer,
  pointsModel
});
const filtersPresenter = new FiltersPresenter(filtersContainer);

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
eventsBoardPresenter.init();
filtersPresenter.init();
