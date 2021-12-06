import merge from 'lodash/merge';
import { createSelector } from '@reduxjs/toolkit';
import * as types from '../actions/types';

const initialState = {
  files: [],
};

export default function servers(state, action) {
  switch (action.type) {
    case types.ADD_FILE: {
      const files = state.files.concat([action.file]);
      return Object.assign({}, state, { files: files });
    }
    case types.REMOVE_ALL_FILES: {
      return Object.assign({}, state, { files: [] });
    }
    default:
      return state || initialState;
  }
}

const allFiles = (state) => {
  return state.message.files;
};

export const getMessageFiles = createSelector(allFiles, (allFiles) => {
  return allFiles;
});
