import BoardPresenter from './presenter/board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';
import PointsModel from './model/points-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import { offers } from './mock/offers.js';
import {mockPoints} from './mock/points.js';

const tripMainContainer = document.querySelector('.trip-main');
const pointsBoardContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel(mockPoints);
const offersModel = new OffersModel(offers);
const filterModel = new FilterModel();
const eventsBoardPresenter = new BoardPresenter({
  pointsBoardContainer,
  pointsModel,
  offersModel,
  filterModel
});
const filtersPresenter = new FiltersPresenter({
  filterContainer,
  pointsModel,
  filterModel
});

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
eventsBoardPresenter.init();
filtersPresenter.init();
