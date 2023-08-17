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

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';

export {Price, TypesList, DATE_FORMAT, TIME_FORMAT};
