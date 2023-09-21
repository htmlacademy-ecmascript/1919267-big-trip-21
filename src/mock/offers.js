import { getRandomPositiveInteger } from '../utils/common.js';
import { eventTypes } from '../const.js';

const offers = [];

const generateOffer = (type) => ({
  id: crypto.randomUUID(),
  title: `Опции ${type}`,
  price: getRandomPositiveInteger(50, 500)
});

const createOffers = (type) => ({
  type,
  offers: Array.from({length: getRandomPositiveInteger(0, 6)}, () => generateOffer(type))
});

eventTypes.forEach((type) => offers.push(createOffers(type)));

export {offers};
