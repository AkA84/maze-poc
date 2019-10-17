import api from "../api.js";

export async function print () {
  return await api.print(this.maze_id);
}
