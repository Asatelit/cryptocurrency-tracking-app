/**
 * Create an object with values equal to its key names.
 * @function keyMirror
 * @param {Object} obj
 * @returns {Object}
 */
export default function keyMirror(obj) {
  Object.keys(obj).forEach(key => Object.assign(obj, { [key]: key }));
  return obj;
}
