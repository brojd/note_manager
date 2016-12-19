import createTree from '../helpers/createTree';
import findAndModifyDir from '../helpers/findAndModifyDir';

const initialState = {
  allDirectories: [],
  allNotices: [],
  currentDirectory: {},
  fetchError: false,
  updateError: false,
  addError: false,
  deleteError: false
};

const reducer = function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_ALL_DIRECTORIES_SUCCESS':
      return Object.assign({ ...state, allDirectories: createTree(action.directories), fetchError: false });
    case 'FETCH_ALL_DIRECTORIES_ERROR':
      return Object.assign({ ...state, fetchError: true });
    case 'ADD_DIRECTORY_SUCCESS':
      return Object.assign({
        ...state,
        allDirectories: Object.assign({ ...state.allDirectories, children: action.newDirs, addError: false })
      });
    case 'ADD_DIRECTORY_ERROR':
      return Object.assign({ ...state, addError: true });
    case 'DELETE_DIRECTORY_SUCCESS':
      return Object.assign({
        ...state,
        allDirectories: Object.assign({ ...state.allDirectories, children: action.newDirs, deleteError: false })
      });
    case 'DELETE_DIRECTORY_ERROR':
      return Object.assign({ ...state, deleteError: true });
    case 'UPDATE_DIRECTORY_SUCCESS':
      {
        let dirsCopy = Object.assign({...state.allDirectories});
        findAndModifyDir(action.dirId, dirsCopy.children, action.newDir);
        return Object.assign({
          ...state,
          allDirectories: Object.assign({...state.allDirectories, children: dirsCopy.children}),
          updateError: false
        });
      }
    case 'UPDATE_DIRECTORY_ERROR':
      return Object.assign({ ...state, updateError: true });
    case 'UPDATE_ALL_DIRECTORIES':
      return Object.assign({
        ...state,
        allDirectories: Object.assign({ ...state.allDirectories, children: action.newDirs })
      });
    case 'SET_CURRENT_DIRECTORY':
      if (action.currentDir) {
        return Object.assign({ ...state, currentDirectory: action.currentDir });
      }
  }
  return state;
};

export default reducer;
