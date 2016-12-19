import { combineReducers } from 'redux';
import directories from './directories';
import notices from './notices';

const reducers = combineReducers({
  directories,
  notices
});

export default reducers;
