const Price = {
  MIN: 10,
  MAX: 10000,
};

const TypesList = [
  {
    id: 1,
    title: 'restaurant'
  }, {
    id: 2,
    title: 'bus'
  }, {
    id: 3,
    title: 'train'
  }, {
    id: 4,
    title: 'ship'
  }, {
    id: 5,
    title: 'drive'
  }, {
    id: 6,
    title: 'flight'
  }, {
    id: 7,
    title: 'check-in'
  }, {
    id: 8,
    title: 'sightseeing'
  }, {
    id: 9,
    title: 'taxi'
  }
];

const BLANK_POINT = {
  id: crypto.randomUUID(),
  type: '',
  destination: '',
  dateFrom: null,
  dateTo: null,
  basePrice: 0,
  isFavorite: false,
  offers: []
};

const DATE_FORMAT = 'MMM DD';
const EDIT_FORM_DATE_FORMAT = 'DD/MM/YY hh:mm';

const TIME_FORMAT = 'HH:mm';

export {Price, TypesList, DATE_FORMAT, EDIT_FORM_DATE_FORMAT, TIME_FORMAT, BLANK_POINT};
