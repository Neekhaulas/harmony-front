import { combineReducers } from 'redux';
import servers from './servers';

const rootReducer = combineReducers({
  servers,
});

export default rootReducer;
