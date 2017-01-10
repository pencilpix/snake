/**
 * adding to vectors
 * @param {Object} v1 instance of Vector class
 * @param {Object} v2 instance of Vector Class
 */
export function addVector(v1, v2){
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  };
}
