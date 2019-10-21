import api from "../api";

export async function print () {
  return await api.print(this.maze_id);
}
