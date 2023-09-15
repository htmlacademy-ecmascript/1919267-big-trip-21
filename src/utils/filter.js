import { FilterType } from '../const';
import { isPointFuture, isPointPast, isPointPresent } from './point';

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point))
};

function generateFilter() {
  return Object.keys(filter).map(
    (filterType, index) => ({
      type: filterType,
      isChecked: index === 0
    })
  );
}

export {generateFilter};
