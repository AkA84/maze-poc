import api from "../api.js";

/**
 * Will refresh (= get the data from the remote api) the maze of the given id,
 * or if no id is given, then the internal maze id will be used instead
 *
 * @param {int} [mazeId]
 */
export async function refresh (mazeId = null) {
  mazeId = mazeId || this.maze_id;
  const mazeData = await api.fetch(mazeId);

  Object.assign(this, mazeData);
}
