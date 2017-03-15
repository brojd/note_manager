const FETCH_ALL_DIRECTORIES_SUCCESS = 'FETCH_ALL_DIRECTORIES_SUCCESS';
export const fetchAllDirectoriesSuccess = (directories) => {
  return {
    'type': FETCH_ALL_DIRECTORIES_SUCCESS,
    directories
  };
};
const FETCH_ALL_DIRECTORIES_ERROR = 'FETCH_ALL_DIRECTORIES_ERROR';
export const fetchAllDirectoriesError = () => {
  return {
    'type': FETCH_ALL_DIRECTORIES_ERROR
  };
};
const ADD_DIRECTORY_SUCCESS = 'ADD_DIRECTORY_SUCCESS';
export const addDirectorySuccess = (newDirs) => {
  return {
    'type': ADD_DIRECTORY_SUCCESS,
    newDirs
  };
};
const ADD_DIRECTORY_ERROR = 'ADD_DIRECTORY_ERROR';
export const addDirectoryError = () => {
  return {
    'type': ADD_DIRECTORY_ERROR
  };
};
const DELETE_DIRECTORY_SUCCESS = 'DELETE_DIRECTORY_SUCCESS';
export const deleteDirectorySuccess = (newDirs) => {
  return {
    'type': DELETE_DIRECTORY_SUCCESS,
    newDirs
  };
};
const DELETE_DIRECTORY_ERROR = 'DELETE_DIRECTORY_ERROR';
export const deleteDirectoryError = () => {
  return {
    'type': DELETE_DIRECTORY_ERROR
  };
};
const UPDATE_DIRECTORY_SUCCESS = 'UPDATE_DIRECTORY_SUCCESS';
export const updateDirectorySuccess = (dirId, newDir) => {
  return {
    'type': UPDATE_DIRECTORY_SUCCESS,
    dirId,
    newDir
  };
};
const UPDATE_DIRECTORY_ERROR = 'UPDATE_DIRECTORY_ERROR';
export const updateDirectoryError = () => {
  return {
    'type': UPDATE_DIRECTORY_ERROR
  };
};
const UPDATE_ALL_DIRECTORIES = 'UPDATE_ALL_DIRECTORIES';
export const updateAllDirectories = (newDirs) => {
  return {
    'type': UPDATE_ALL_DIRECTORIES,
    'newDirs': newDirs
  };
};
const SET_CURRENT_DIRECTORY = 'SET_CURRENT_DIRECTORY';
export const setCurrentDirectory = (currentDir) => {
  return {
    'type': SET_CURRENT_DIRECTORY,
    'currentDir': currentDir
  };
};
