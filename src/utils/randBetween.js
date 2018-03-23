/**
 * Returns a random number between the numbers you specify
 * @function randBetween
 * @param {number} min - Lower number of two numbers between which a random number is chosen; this number must be less than upper
 * @param {number} max - Upper number of two numbers between which a random number is chosen
 * @returns {number}
 */
export default function randBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}
