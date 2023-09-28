import flatpickr from 'flatpickr';
import he from 'he';
import { BLANK_POINT, DateFormat, eventTypes } from '../const.js';
import { formatDate } from '../utils/common.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import 'flatpickr/dist/flatpickr.min.css';

function createEventTemplate(eventType) {
  return `<div class="event__type-item">
  <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
  <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType[0].toUpperCase() + eventType.slice(1)}</label>
</div>`;
}

function createDestinationsListTemplate(destinations) {
  return destinations.map((destination) => `<option value="${he.encode(destination.name)}"></option>`).join('');
}

function createPointEditTemplate(point, offers, destinations) {
  const {type, destination, dateFrom, dateTo, basePrice} = point;

  //DESTINATIONS BLOCK
  const pointDestination = destinations.find((item) => item.id === destination.id);

  function createDestinationPhotosTemplate() {
    if (pointDestination?.photos.length > 0) {
      const photos = pointDestination.photos.map((photo) =>
        `<img class="event__photo" src="${he.encode(photo)}" alt="${he.encode(pointDestination.name)}">`
      ).join('');

      return `<div class="event__photos-container">
        <div class="event__photos-tape">${photos}</div>
      </div>`;
    }
  }

  const destinationPhotosTemplate = createDestinationPhotosTemplate();

  function createDestinationsBlockTemplate() {
    if (destination !== '' && typeof pointDestination !== 'undefined' && pointDestination.description !== '') {
      return `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${he.encode(pointDestination.description)}</p>
        ${destinationPhotosTemplate ? destinationPhotosTemplate : ''}
      </section>`;
    }
  }

  const destinationsBlockTemplate = createDestinationsBlockTemplate();

  //OFFERS BLOCK
  const pointOffers = offers.find((item) => item.type === type);

  const createTypeOffersTemplate = () => pointOffers.offers.map((offer) => {
    const isChecked = offers.includes(offer.id) ? 'checked' : '';
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" data-id="${he.encode(offer.id)}" id="event-offer-${he.encode(offer.id)}" type="checkbox" name="event-offer-${he.encode(offer.id)}" ${isChecked}>
      <label class="event__offer-label" for="event-offer-${he.encode(offer.id)}">
        <span class="event__offer-title">${he.encode(offer.title)}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${he.encode(String(offer.price))}</span>
      </label>
    </div>`;
  }).join('');

  const typeOffersTemplate = createTypeOffersTemplate();


  function createOffersBlockTemplate() {
    if (pointOffers.offers.length > 0) {
      return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${typeOffersTemplate}
              </div>
            </section>`;
    }
  }
  const offersBlockTemplate = createOffersBlockTemplate();

  return (
    `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${he.encode(type)}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypes.reduce((acc, event) => acc + createEventTemplate(event), '')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination ? he.encode(pointDestination.name) : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createDestinationsListTemplate(destinations)}
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
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${he.encode(String(basePrice))}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${offersBlockTemplate ? offersBlockTemplate : ''}
                  ${destinationsBlockTemplate ? destinationsBlockTemplate : ''}
                </section>
              </form>
            </li>`
  );
}

export default class PointEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleArrowClick = null;
  #handleDeleteClick = null;
  #offers = [];
  #destinations = [];
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor ({point = BLANK_POINT, destinations, offers, onFormSubmit, onArrowClick, onDeleteButtonClick}) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleArrowClick = onArrowClick;
    this.#handleDeleteClick = onDeleteButtonClick;
    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#offers, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #setDatepicker = () => {
    const commonSettings = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true,
    };

    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...commonSettings,
        defaultDate: this._state.dateFrom,
        onchange: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo,
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...commonSettings,
        defaultDate: this._state.dateTo,
        onchange: this.#dateToChangeHandler,
        minDate: this._state.dateFrom,
      }
    );
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => ({...state});

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState({point})
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#arrowClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((input) => input.addEventListener('change', this.#offerChangeHandler));
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#pointDeleteClickHandler);
    this.#setDatepicker();
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
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #eventDestinationChangeHandler = (evt) => {
    const currentDestination = this.#destinations.find((pointDestination) => pointDestination.name === evt.target.value);

    this.updateElement({
      destination: currentDestination
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

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const updatedCheckedOffers = [];
    checkedOffers.map((element) => updatedCheckedOffers.push(element.dataset.id));
    this._setState({
      offers: updatedCheckedOffers,
    });
  };

  #pointDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };
}
