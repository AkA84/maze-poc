import cloneDeep from "lodash/cloneDeep"
import { takeLatest, put, call, select } from "redux-saga/effects";
import { NEW_MAZE, MOVE_PLAYER } from "./action-types";
import { setMaze, setLoading, setError } from "./actions";
import { createMaze } from "../maze";

/**
 * @param {object} action.payload The settings of the new maze
 */
export function* createNewMaze (action) {
  yield put(setError(null));
  yield put(setLoading(true));

  try {
    const newMaze = yield call(createMaze, action.payload);

    yield put(setMaze(newMaze));
    yield put(setLoading(false));
  } catch ({ name, message }) {
    yield put(setError(message));
  }
}

/**
 * @param {object} action.payload A direction object
 */
function* movePlayer(action) {
  const maze = yield select(state => state.maze);

  try {
    yield call([maze, 'moveTo'], action.payload);
    yield call([maze, 'refresh']);

    const updatedMaze = cloneDeep(maze);
    yield put(setMaze(updatedMaze));
  } catch ({ name, message }) {
    yield put(setError(message));
  }
}

export default function* rootSaga () {
  yield takeLatest(NEW_MAZE, createNewMaze);
  yield takeLatest(MOVE_PLAYER, movePlayer);
}
