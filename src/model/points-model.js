import { mockPoints } from '../mock/points.js';

export default class PointsModel {
  #points = mockPoints;
  get points() {
    return this.#points;
  }
}
