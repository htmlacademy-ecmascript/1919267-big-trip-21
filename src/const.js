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

const FilterType = {
  EVERYTHING: {
    title: 'everything',
    message: 'Click New Event to create your first point'
  },
  FUTURE: {
    title: 'future',
    messaage: 'There are no future events now'
  },
  PRESENT: {
    title: 'present',
    message: 'There are no present events now'
  },
  PAST: {
    title: 'past',
    message: 'There are no past events now'
  },
};

export {Price, types, DateFormat, BLANK_POINT, FilterType};
