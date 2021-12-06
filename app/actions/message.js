import * as types from './types';

export const addFile = (file, dispatch) =>
  dispatch({ type: types.ADD_FILE, file });
export const removeAllFiles = (dispatch) =>
  dispatch({ type: types.REMOVE_ALL_FILES });
