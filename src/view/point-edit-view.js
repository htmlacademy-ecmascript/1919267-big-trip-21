import { BLANK_POINT, DateFormat, eventTypes, destinations } from '../const.js';
import { mockOffers } from '../mock/offers.js';
import { formatDate } from '../utils/common.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createOfferTemplate(offer) {
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}" type="checkbox" name="event-offer-${offer.title}">
  <label class="event__offer-label" for="event-offer-${offer.title}">
    <span class="event__offer-title">Add ${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;
}

function createEventTemplate(eventType) {
  return `<div class="event__type-item">
  <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
  <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType[0].toUpperCase() + eventType.slice(1)}</label>
</div>`;
}

function createDestinationsListTemplate() {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createPointEditTemplate(point) {
  const {type, destination, dateFrom, dateTo, basePrice, offers} = point;

  return (
    `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypes.length && eventTypes.reduce((acc, event) => acc + createEventTemplate(event), [])}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinations.length && createDestinationsListTemplate()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${formatDate(dateFrom, DateFormat.DATE_AND_TIME)}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${formatDate(dateTo, DateFormat.DATE_AND_TIME)}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${offers.length && offers.map((offer) => createOfferTemplate(offer)).join('')}
                    </div>

                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${destination.photos.map((photo) => `<img class="event__photo" src=${photo} alt="Event photo">`)}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`
  );
}

export default class PointEditView extends AbstractStatefulView {
  #point = null;
  #handleFormSubmit = null;
  #handleArrowClick = null;
  #handleDeleteClick = null;

  constructor ({point = BLANK_POINT, onFormSubmit, onArrowClick, onDeleteButtonClick}) {
    super();
    this.#point = point;
    this._setState(PointEditView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleArrowClick = onArrowClick;
    this.#handleDeleteClick = onDeleteButtonClick;
    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state);
  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#arrowClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#pointDeleteClickHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #arrowClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleArrowClick();
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const typeTitle = evt.target.value;
    const formattedTitle = (evt.target.value)[0].toUpperCase() + evt.target.value.slice(1);
    this.updateElement({
      type: formattedTitle,
      offers: mockOffers.get(typeTitle)
    });
  };

  #eventDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const chosenDestination = destinations.find((item) => item.name === evt.target.value);

    if (!chosenDestination) {
      evt.target.value = '';
      this.element.querySelector('.event__save-btn').disabled = true;
      return;
    }

    this.updateElement({
      destination: chosenDestination
    });
  };

  #priceInputChangeHandler = (evt) => {
    evt.preventDefault();
    const price = +(evt.target.value);

    if(isNaN(price) || price < 0) {
      evt.target.value = '';
      return;
    }

    this._setState({
      basePrice: evt.target.value,
    });
  };

  #pointDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };
}
