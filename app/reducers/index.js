import { combineReducers } from 'redux';
import servers from './servers';
import message from './message';

const rootReducer = combineReducers({
  servers,
  message,
});

export default rootReducer;
