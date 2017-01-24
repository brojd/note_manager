import axios from 'axios';
import { API_URL } from '../../config';
import { fetchAllDirectoriesSuccess, fetchAllDirectoriesError, updateDirectorySuccess,
  updateDirectoryError, addDirectorySuccess, addDirectoryError, setCurrentDirectory,
  deleteDirectorySuccess, deleteDirectoryError } from './directories';
import { fetchAllNoticesSuccess, updateAllNoticesSuccess, updateAllNoticesError, updateNoticeSuccess, updateNoticeError,
  addNoticeSuccess, addNoticeError, deleteNoticeSuccess, deleteNoticeError } from './notices';
import createTree from '../helpers/createTree';
import findAndModifyDir from '../helpers/findAndModifyDir';
import findDirById from '../helpers/findDirById';

export const fetchDirsAndNotices = () => {
  return function(dispatch) {
    axios.all([
        axios.get(`${API_URL}/directories`),
        axios.get(`${API_URL}/notices`)
      ])
      .then(axios.spread((dirResponse, noticeResponse) => {
        dispatch(fetchAllDirectoriesSuccess(dirResponse.data));
        dispatch(fetchAllNoticesSuccess(noticeResponse.data));
      }))
      .catch((err) => {
        dispatch(fetchAllDirectoriesError());
        console.error(err);
      });
  };
};

export const addDirectoryToRoot = (newDir, currentDirs) => {
  return function (dispatch) {
    axios.post(`${API_URL}/directories`, newDir)
      .then((res) => {
        const newItem = {
          ...res.data,
          isVisible: true
        };
        dispatch(addDirectorySuccess([...currentDirs, newItem]));
      })
      .catch((err) => {
        dispatch(addDirectoryError());
        console.error(err);
      });
  };
};

export const addDirectoryToChild = (newDir, currentDirs) => {
  return function (dispatch) {
    axios.post(`${API_URL}/directories`, newDir)
      .then((res) => {
        const newItem = { ...res.data };
        const newDirs = [ ...currentDirs ];
        const newParent = { ...findDirById(newItem.parentId, newDirs) };
        newParent.children.push(newItem);
        findAndModifyDir(newItem.parentId, newDirs, newParent);
        dispatch(addDirectorySuccess(newDirs));
      })
      .catch((err) => {
        dispatch(addDirectoryError());
        console.error(err);
      });
  };
};

export const deleteDirectory = (dirId) => {
  return function (dispatch) {
    axios.delete(`${API_URL}/directories/${dirId}`)
      .then((res) => {
        let newTree = createTree(res.data);
        let newDirs = newTree.children ? newTree.children.slice() : [];
        dispatch(deleteDirectorySuccess(newDirs));
        dispatch(setCurrentDirectory({}));
      })
      .catch((err) => {
        dispatch(deleteDirectoryError());
        console.error(err);
      });
  };
};

export const updateDirectory = (dirId, newDir) => {
  return function(dispatch) {
    axios.put(`${API_URL}/directories/${dirId}`, newDir)
      .then(() => {
        dispatch(updateDirectorySuccess(dirId, newDir));
      })
      .catch((err) => {
        dispatch(updateDirectoryError());
        console.error(err);
      });
  };
};

export const addNotice = (newNotice) => {
  return function(dispatch) {
    axios.post(`${API_URL}/notices`, newNotice)
      .then((res) => {
        dispatch(addNoticeSuccess(res.data));
      })
      .catch((err) => {
        dispatch(addNoticeError());
        console.error(err);
      });
  };
};

export const updateTwoNotices = (firstId, firstNotice, secondId, secondNotice, newNotices) => {
  return function(dispatch) {
    axios.all([
        axios.put(`${API_URL}/notices/${firstId}`, firstNotice),
        axios.put(`${API_URL}/notices/${secondId}`, secondNotice)
      ])
      .then(() => dispatch(updateAllNoticesSuccess(newNotices)))
      .catch((err) => {
        dispatch(updateAllNoticesError());
        console.error(err);
      });
  };
};

export const updateNotice = (noticeId, newNotice) => {
  return function(dispatch) {
    axios.put(`${API_URL}/notices/${noticeId}`, newNotice)
      .then(() => dispatch(updateNoticeSuccess(noticeId, newNotice)))
      .catch((err) => {
        dispatch(updateNoticeError());
        console.error(err);
      });
  };
};

export const deleteNotice = (noticeId) => {
  return function(dispatch) {
    axios.delete(`${API_URL}/notices/${noticeId}`)
      .then(() => dispatch(deleteNoticeSuccess(noticeId)))
      .catch((err) => {
        dispatch(deleteNoticeError());
        console.error(err);
      });
  };
};
