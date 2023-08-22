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

const MinutesInTime = {
  BASE_MIN: 60,
};

export {Price, types, DateFormat, BLANK_POINT};
