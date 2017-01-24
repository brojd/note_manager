import { createSelector } from 'reselect';

const allDirectoriesSelector = state => state.directories.allDirectories;
export const getAllDirectories = createSelector(
  allDirectoriesSelector,
  (allDirectories) => allDirectories
);

const currentDirectorySelector = state => state.directories.currentDirectory;
export const getCurrentDirectory = createSelector(
  currentDirectorySelector,
  (currentDirectory) => currentDirectory
);

const updateErrorSelector = state => state.directories.updateError;
export const getUpdateError = createSelector(
  updateErrorSelector,
  (updateError) => updateError
);

const addErrorSelector = state => state.directories.addError;
export const getAddDirError = createSelector(
  addErrorSelector,
  (addError) => addError
);

const deleteErrorSelector = state => state.directories.deleteError;
export const getDeleteDirError = createSelector(
  deleteErrorSelector,
  (deleteError) => deleteError
);
