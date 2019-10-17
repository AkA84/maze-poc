/**
 * Based on its current position, it predicts whether the monster is
 * in the way of the player given a set of moves that the player will do
 *
 * @param {array} moves
 * @returns {boolean}
 */
export function isMonsterInTheWay (moves) {
  const monsterCell = this.domokun[0];

  return !!moves.find(move => move.nextCell === monsterCell);
};
