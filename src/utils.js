/**
 *
 * @param value
 * @param total
 * @returns {number}
 */
function inPercent(value, total) {
  return (value / total) * 100;
}

/**
 * @param percent
 * @param total
 * @returns {number}
 */
function inNumber(percent, total) {
  if (percent > 100) {
    throw Error('Invalid number');
  }
  return (percent / 100) * total;
}

/**
 *
 * @param x
 * @param y
 * @param containment
 * @returns {boolean}
 */
function insideContainment(x, y, containment) {
  return !(
    x < (containment.x) ||
    x > (containment.x + containment.width) ||
    y < (containment.y) ||
    y > (containment.y + containment.height)
  );
}

export {inNumber, inPercent, insideContainment};
