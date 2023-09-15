import dayjs from 'dayjs';
import { SortType } from '../const';

function getPointsDateDifference(pointA, pointB) {
  return dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

function getPointsDurationDifference(eventA, eventB) {
  const eventDurationA = getEventDuration(eventA);
  const eventDurationB = getEventDuration(eventB);

  return eventDurationB - eventDurationA;
}

function getEventDuration(event) {
  return dayjs(event.dateTo).diff(dayjs(event.dateFrom));
}

function getPointsPriceDifference(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

const sorting = {
  [SortType.DAY]: (points) => [...points].sort(getPointsDateDifference),
  [SortType.PRICE]: (points) => [...points].toSorted(getPointsPriceDifference),
  [SortType.TIME]: (points) => [...points].toSorted(getPointsDurationDifference),
  [SortType.EVENT]: () => {
    throw new Error(`Sort by ${SortType.EVENT} is not implemented`);
  },
  [SortType.OFFERS]: () => {
    throw new Error(`Sort by ${SortType.OFFERS} is not implemented`);
  }
};

export {sorting};
