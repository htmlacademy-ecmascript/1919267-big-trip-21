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

export {isPointFuture, isPointPast, isPointPresent};
