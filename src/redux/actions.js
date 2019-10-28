import { SET_MAZE, NEW_MAZE, SET_LOADING, SET_ERROR, MOVE_PLAYER } from "./action-types";

/**
 * @param {object} maze
 */
export function setMaze (maze) {
  return { type: SET_MAZE, payload: maze };
}

/**
 * @param {boolean} loadingState
 */
export function setLoading (loadingState) {
  return { type: SET_LOADING, payload: loadingState };
}

/**
 * @param {string} error
 */
export function setError (error) {
  return { type: SET_ERROR, payload: error };
}


// Saga actions

/**
 * @param {object} settings
 */
export function newMaze(settings) {
  return { type: NEW_MAZE, payload: settings };
}

/**
 * @param {object} direction
 */
export function movePlayer(direction) {
  return { type: MOVE_PLAYER, payload: direction };
}
