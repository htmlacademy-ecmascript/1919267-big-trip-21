import dayjs from 'dayjs';
import { SortType } from '../const';

function getPointsDateDifference(pointA, pointB) {
  return dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

function getPointsDurationDifference(eventA, eventB) {
  const pointADuration = dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom));
  const pointBDuration = dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom));
  return pointBDuration - pointADuration;
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
