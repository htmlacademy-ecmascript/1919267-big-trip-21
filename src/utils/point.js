import dayjs from 'dayjs';

function isPointFuture(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPointPresent(point) {
  return dayjs().isBefore(point.dateFrom) && dayjs().isAfter(point.dateTo);
}

function isPointPast(point) {
  return dayjs().isAfter(point.dateTo);
}

const areDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);

export {isPointFuture, isPointPast, isPointPresent, areDatesEqual};
