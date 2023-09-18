import { Price, eventTypes, destinations } from '../const.js';
import { mockOffers } from './offers.js';
import {getMaxDate, getMinDate, getRandomArrayElement, getRandomPositiveInteger} from '../utils/common.js';

class MockPoint {
  constructor() {
    const date1 = `2023-${getRandomPositiveInteger(1,12)}-${getRandomPositiveInteger(1,30)}T${getRandomPositiveInteger(1,24)}:${getRandomPositiveInteger(1,59)}`;
    const date2 = `2023-${getRandomPositiveInteger(1,12)}-${getRandomPositiveInteger(1,30)}T${getRandomPositiveInteger(1,24)}:${getRandomPositiveInteger(1,59)}`;

    this.id = crypto.randomUUID();
    this.type = getRandomArrayElement(eventTypes);
    this.destination = getRandomArrayElement(destinations);
    this.dateFrom = getMinDate(date1, date2);
    this.dateTo = getMaxDate(date1, date2);
    this.basePrice = getRandomPositiveInteger(Price.MIN, Price.MAX);
    this.isFavorite = Boolean(getRandomPositiveInteger(0, 1));
    this.offers = mockOffers.get(this.type);
  }
}

const mockPoints = Array.from({length: getRandomPositiveInteger(1, 10)}, () => new MockPoint);

export {mockPoints};
