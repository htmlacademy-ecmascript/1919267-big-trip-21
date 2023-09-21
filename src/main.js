import BoardPresenter from './presenter/board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';
import PointsModel from './model/points-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import OffersModel from './model/offers-model.js';
import { offers } from './mock/offers.js';

const tripMainContainer = document.querySelector('.trip-main');
const pointsBoardContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const offersModel = new OffersModel(offers);
const eventsBoardPresenter = new BoardPresenter({
  pointsBoardContainer,
  pointsModel,
  offersModel
});
const filtersPresenter = new FiltersPresenter({
  container: filtersContainer,
  pointsModel
});

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
eventsBoardPresenter.init();
filtersPresenter.init();
