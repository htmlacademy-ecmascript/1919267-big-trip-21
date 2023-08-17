import { getRandomPositiveInteger } from '../utils.js';

const OFFERS = [
  ['taxi',
    [{id: 1,
      title: 'Upgrade to a business class',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 2,
      title: 'Taxi',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 3,
      title: 'Taxi luxe',
      price: getRandomPositiveInteger(50, 150),
    }]],
  ['bus',
    [{
      id: 1,
      title: 'bus1',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 2,
      title: 'bus3',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 3,
      title: 'bus2',
      price: getRandomPositiveInteger(50, 150),
    }]],
  ['train',
    [{
      id: 1,
      title: 'train1',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 2,
      title: 'train3',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 3,
      title: 'train2',
      price: getRandomPositiveInteger(50, 150),
    }]],
  ['ship',
    [{
      id: 1,
      title: 'ship1',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 2,
      title: 'ship3',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 3,
      title: 'ship2',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 4,
      title: 'ship4',
      price: getRandomPositiveInteger(50, 150),
    }]],
  ['drive',
    [{
      id: 1,
      title: 'drive1',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 2,
      title: 'drive2',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 3,
      title: 'drive3',
      price: getRandomPositiveInteger(50, 150),
    }]],
  ['flight',
    [{
      id: 1,
      title: 'flight1',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 2,
      title: 'flight3',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 3,
      title: 'flight2',
      price: getRandomPositiveInteger(50, 150),
    }]],
  ['check-in',
    [{
      id: 1,
      title: 'check-in1',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 2,
      title: 'check-in2',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 3,
      title: 'check-in3',
      price: getRandomPositiveInteger(50, 150),
    }]],
  ['sightseeing',
    [{
      id: 1,
      title: 'sightseeing1',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 2,
      title: 'sightseeing3',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 3,
      title: 'sightseeing2',
      price: getRandomPositiveInteger(50, 150),
    }]],
  ['restaurant',
    [{
      id: 1,
      title: 'restaurant1',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 2,
      title: 'restaurant3',
      price: getRandomPositiveInteger(50, 150),
    },
    {
      id: 3,
      title: 'restaurant2',
      price: getRandomPositiveInteger(50, 150),
    }]]
];

const mockOffers = new Map(OFFERS);

export {mockOffers};
