import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(minMax);
dayjs.extend(durationPlugin);

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_DAY;

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

function getDuration(dateFrom, dateTo){
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));

  if (diff >= MSEC_IN_DAY) {
    return dayjs.duration(diff).format('DD[D] HH[H] mm[M]');
  }
  if (diff >= MSEC_IN_HOUR) {
    return dayjs.duration(diff).format('HH[H] mm[M]');
  }
  if (diff < MSEC_IN_HOUR) {
    return dayjs.duration(diff).format('mm[M]');
  }
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

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {getRandomArrayElement, getRandomPositiveInteger, updateItem, getMinDate, getMaxDate, formatDate, getDuration};
