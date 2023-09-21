import dayjs from 'dayjs';
import { Price, eventTypes, destinations } from '../const.js';
import {getMaxDate, getMinDate, getRandomArrayElement, getRandomPositiveInteger} from '../utils/common.js';

class MockPoint {
  constructor() {
    const date1 = `2023-${getRandomPositiveInteger(1,12)}-${getRandomPositiveInteger(1,30)}T${getRandomPositiveInteger(1,24)}:${getRandomPositiveInteger(1,59)}`;
    const date2 = `2023-${getRandomPositiveInteger(1,12)}-${getRandomPositiveInteger(1,30)}T${getRandomPositiveInteger(1,24)}:${getRandomPositiveInteger(1,59)}`;

    this.id = crypto.randomUUID();
    this.type = getRandomArrayElement(eventTypes);
    this.destination = getRandomArrayElement(destinations);
    this.dateFrom = dayjs(getMinDate(date1, date2)).toDate();
    this.dateTo = dayjs(getMaxDate(date1, date2)).toDate();
    this.basePrice = getRandomPositiveInteger(Price.MIN, Price.MAX);
    this.isFavorite = Boolean(getRandomPositiveInteger(0, 1));
  }
}

const mockPoints = Array.from({length: getRandomPositiveInteger(1, 10)}, () => new MockPoint);

export {mockPoints};
