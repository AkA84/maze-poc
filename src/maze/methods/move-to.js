import api from "../api";

/**
 * 
 * @param {string} direction
 */
export async function moveTo(direction) {
  await api.move(direction, this.maze_id);
}
