import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(minMax);
dayjs.extend(durationPlugin);

/**
 * Функция, возвращающая минимальную дату
 * @param {dayjs.ConfigType} date1
 * @param {dayjs.ConfigType} date2
 * @returns {dayjs.ConfigType}
 */

function getMinDate(date1, date2) {
  return dayjs.min(dayjs(), dayjs(date1), dayjs(date2));
}

/**
 * Функция, возвращающая максимальную дату
 * @param {dayjs.ConfigType} date1
 * @param {dayjs.ConfigType} date2
 * @returns {dayjs.ConfigType}
 */

function getMaxDate(date1, date2) {
  return dayjs.max(dayjs(), dayjs(date1), dayjs(date2));
}
/**
 * Функция, возвращающая отформатированную дату
 * @param {dayjs.ConfigType} date
 * @param {string} dateFormat
 * @returns {string}
 */

function formatDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

/**
 * Функция, возвращающая длительность события
 * @param {dayjs.ConfigType} dateFrom
 * @param {dayjs.ConfigType} dateTo
 * @returns {string}
 */

function getDuration(valueFrom, valueTo){
  const ms = dayjs(valueTo).diff(valueFrom);
  const duration = dayjs.duration(ms);

  if (duration.days()){
    return duration.format('DD[d] HH[h] mm[m]');
  }

  if (duration.hours()){
    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
}


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export {getRandomArrayElement, getRandomPositiveInteger, getMinDate, getMaxDate, formatDate, getDuration};
