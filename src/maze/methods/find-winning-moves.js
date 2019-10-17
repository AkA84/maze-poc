const ALL_DIRECTIONS = ['west', 'east', 'north', 'south'];

let maze;
let moves;
let wasHere;

/**
 * Finds the moves that will take the player to the maze's exit
 *
 * @returns {array}
 */
export function findWinningMoves () {
  maze = this; // to avoid a plethora of `.bind()`s and `.call()`s

  // reset
  moves = [];
  wasHere = [];

  recursiveSolve(maze.pony[0]);

  return moves.reverse();
};

/**
 * Adaptation of the recursive algorithm linked below
 *
 * @see https://en.wikipedia.org/wiki/Maze_solving_algorithm#Recursive_algorithm
 * @param {*} cell
 */
function recursiveSolve (cell) {
  if (~wasHere.indexOf(cell)) {
    return false;
  } else {
    wasHere.push(cell);
  }

  if (cell === maze['end-point'][0]) {
    return true;
  }

  const walls = getCellWalls(cell);

  return ALL_DIRECTIONS
    .filter(direction => !~walls.indexOf(direction))
    .some(direction => {
      let nextCell = getSiblingCellIndex(cell, direction);

      if (recursiveSolve(nextCell)) {
        moves.push({ nextCell, direction });
        return true;
      }

      return false;
  });
}

/**
 * > If you want to find all walkable directions from place X
 * > you need to use the array entries X, X+1 and X+width
 * > to construct all walls around the place X.
 *
 * @param {number} cell
 * @return {object}
 */
function getCellWalls (cell) {
  const data = maze.data

  const walls = [...data[cell]];
  const leftCell = data[getSiblingCellIndex(cell, 'east')];
  const belowCell = data[getSiblingCellIndex(cell, 'south')];

  (typeof leftCell === 'undefined' || leftCell.indexOf('west') > -1) && walls.push('east');
  (typeof belowCell === 'undefined' || belowCell.indexOf('north') > -1) && walls.push('south');

  return walls;
}

/**
 * Returns the index of the sibling of a cell in the given direction
 *
 * @param {number} cell
 * @param {string} direction
 */
function getSiblingCellIndex (cell, direction) {
  switch (direction) {
    case 'west':
      return cell - 1;
    case 'east':
      return cell + 1;
    case 'north':
      return cell - maze.size[0];
    case 'south':
      return cell + maze.size[0];
    default:
      return null;
  }
}
