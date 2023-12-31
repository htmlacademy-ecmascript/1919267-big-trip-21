const Price = {
  MIN: 10,
  MAX: 10000,
};

const eventTypes = ['restaurant', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'taxi'];

const BLANK_POINT = {
  id: crypto.randomUUID(),
  type: 'flight',
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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

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
const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

export {
  Price,
  eventTypes,
  DateFormat,
  BLANK_POINT,
  FilterType,
  Mode,
  SortType,
  availableSortType,
  DEFAULT_SORT_TYPE,
  DEFAULT_FILTER_TYPE,
  UserAction,
  UpdateType
};
