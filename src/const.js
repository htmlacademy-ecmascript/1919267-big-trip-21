const Price = {
  MIN: 10,
  MAX: 10000,
};

const types = ['restaurant', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'taxi'];

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

const DateFormat = {
  SHORT_DATE: 'MMM DD',
  DATE_AND_TIME: 'DD/MM/YY[&nbsp;]hh:mm',
  TIME: 'HH:mm',
};

const FILTER_TYPES = [
  {
    title: 'everything',
    message: 'Click New Event to create your first point'
  },
  {
    title: 'future',
    messaage: 'There are no future events now'
  },
  {
    title: 'present',
    message: 'There are no present events now'
  },
  {
    title: 'past',
    message: 'There are no past events now'
  },
];

const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const availableSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFERS]: false
};

const DEFAULT_SORT_TYPE = SortType.DAY;

export {Price, types, DateFormat, BLANK_POINT, FILTER_TYPES, Mode, SortType, availableSortType, DEFAULT_SORT_TYPE};
