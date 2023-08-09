import { render } from './render.js';
import FiltersView from './view/filters-view.js';
import TripSortView from './view/trip-sort-view.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripSortContainer = document.querySelector('.trip-events');

render(new FiltersView(), filtersContainer);
render(new TripSortView(), tripSortContainer);
