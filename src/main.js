import EventsPresenter from './presenter/events-presenter.js';
import { render, RenderPosition } from './render.js';
import FiltersView from './view/filters-view.js';
import TripInfoView from './view/trip-info-view.js';
import './mock/points.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsBoardContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsBoardPresenter = new EventsPresenter({tripEventsBoardContainer: tripEventsBoardContainer});

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersContainer);
eventsBoardPresenter.init();
