import api from "./api";
import { findWinningMoves } from "./methods/find-winning-moves";
import { isMonsterInTheWay } from "./methods/is-monster-in-way";
import { moveTo } from "./methods/move-to";
import { print } from "./methods/print";
import { refresh } from "./methods/refresh";

// Prototype that any maze object will be linked to
const mazePrototype = {
  findWinningMoves,
  isMonsterInTheWay,
  moveTo,
  print,
  refresh
};

/**
 * Passes the given settings to the remote api, then creates a new maze object
 * that augments the data returned by the api
 *
 * @param {object} settings
 * @returns {object}
 */
async function createMaze (settings) {
  const mazeId = await api.create(settings);
  const maze = Object.create(mazePrototype);

  await maze.refresh(mazeId);

  return maze;
}

export { createMaze };
