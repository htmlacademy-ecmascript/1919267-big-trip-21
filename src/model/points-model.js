import { mockPoints } from '../mock/points.js';

export default class PointsModel {
  debugger;
  points = mockPoints;
  getPoints() {
    return this.points;
  }
}
