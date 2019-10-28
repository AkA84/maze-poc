import { SET_MAZE, SET_LOADING, SET_ERROR } from "./action-types";

const initialState = {
  maze: {},
  loading: true,
  error: null
}

export default function rootReducer (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_MAZE:
      return { ...state, maze: action.payload };
    default:
      return state;
  }
}
