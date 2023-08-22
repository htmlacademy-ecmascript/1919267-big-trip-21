import {render} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventsListItemView from '../view/events-list-item-view.js';

export default class EventsPresenter {
  tripSortComponent = new TripSortView();
  eventsListComponent = new EventsListView();

  constructor({tripEventsBoardContainer, pointsModel}) {
    this.tripEventsBoardContainer = tripEventsBoardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    render(this.tripSortComponent, this.tripEventsBoardContainer);
    render(this.eventsListComponent, this.tripEventsBoardContainer);
    render(new EventEditView({point: this.points[0]}), this.eventsListComponent.element);

    for (let i = 0; i < this.points.length; i++) {
      render(new EventsListItemView({point: this.points[i]}), this.eventsListComponent.element);
    }
  }
}
