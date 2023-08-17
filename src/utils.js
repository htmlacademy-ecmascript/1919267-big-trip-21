import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import {DATE_FORMAT, TIME_FORMAT} from './const.js';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getMinDate(date1, date2) {
  dayjs.extend(minMax);
  return dayjs.min(dayjs(), dayjs(date1), dayjs(date2));
}
function getMaxDate(date1, date2) {
  dayjs.extend(minMax);
  return dayjs.max(dayjs(), dayjs(date1), dayjs(date2));
}

function formatDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function formatDateToTime(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

function getDuration(dateFrom, dateTo) {
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);
  const differenceInMinutes = endDate.diff(startDate, 'minute');

  const years = Math.floor(differenceInMinutes / 525960);
  const months = Math.floor(differenceInMinutes % 525960 / 43800);
  const days = Math.floor(differenceInMinutes % 43800 / 1440);
  const hours = Math.floor(differenceInMinutes % 1440 / 60);
  const minutes = Math.floor(differenceInMinutes % 60 / 1);

  let message = '';
  message += (years > 0) ? `${years}Y ` : '';
  message += (months > 0) ? `${months}M ` : '';
  message += (days > 0) ? `${days}D ` : '';
  message += (hours > 0) ? `${hours}H ` : '';
  message += (minutes > 0) ? `${minutes}M` : '';

  return message;
}

export {getRandomArrayElement, getRandomPositiveInteger, getMinDate, getMaxDate, formatDate, formatDateToTime, getDuration};
