import BoardPresenter from './presenter/board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';
import PointsModel from './model/points-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import FilterModel from './model/filter-model.js';
import { offers } from './mock/offers.js';
import {mockPoints} from './mock/points.js';
import AddPointButtonView from './view/add-point-button-view.js';
import { destinations } from './mock/destinations.js';

const tripMainContainer = document.querySelector('.trip-main');
const pointsBoardContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel(mockPoints, destinations, offers);
const filterModel = new FilterModel();

const eventsBoardPresenter = new BoardPresenter({
  pointsBoardContainer,
  pointsModel,
  filterModel,
  onAddPointDestroy: handleNewTaskFormClose
});
const filtersPresenter = new FiltersPresenter({
  filterContainer,
  pointsModel,
  filterModel
});

const addPointComponent = new AddPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewTaskFormClose() {
  addPointComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  eventsBoardPresenter.createPoint();
  addPointComponent.element.disabled = true;
}

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(addPointComponent, tripMainContainer);

filtersPresenter.init();
eventsBoardPresenter.init();
