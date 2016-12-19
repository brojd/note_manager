const FETCH_ALL_NOTICES_SUCCESS = 'FETCH_ALL_NOTICES_SUCCESS';
export const fetchAllNoticesSuccess = (allNotices) => {
  return {
    'type': FETCH_ALL_NOTICES_SUCCESS,
    allNotices
  };
};

const ADD_NOTICE_SUCCESS = 'ADD_NOTICE_SUCCESS';
export const addNoticeSuccess = (newNotice) => {
  return {
    'type': ADD_NOTICE_SUCCESS,
    newNotice
  };
};

const ADD_NOTICE_ERROR = 'ADD_NOTICE_ERROR';
export const addNoticeError = () => {
  return {
    'type': ADD_NOTICE_ERROR
  };
};

const DELETE_NOTICE_SUCCESS = 'DELETE_NOTICE_SUCCESS';
export const deleteNoticeSuccess = (noticeId) => {
  return {
    'type': DELETE_NOTICE_SUCCESS,
    noticeId
  };
};

const DELETE_NOTICE_ERROR = 'DELETE_NOTICE_ERROR';
export const deleteNoticeError = () => {
  return {
    'type': DELETE_NOTICE_ERROR
  };
};

const UPDATE_ALL_NOTICES_SUCCESS = 'UPDATE_ALL_NOTICES_SUCCESS';
export const updateAllNoticesSuccess = (newNotices) => {
  return {
    'type': UPDATE_ALL_NOTICES_SUCCESS,
    newNotices
  };
};

const UPDATE_ALL_NOTICES_ERROR = 'UPDATE_ALL_NOTICES_ERROR';
export const updateAllNoticesError = () => {
  return {
    'type': UPDATE_ALL_NOTICES_ERROR
  };
};

const UPDATE_NOTICE_SUCCESS = 'UPDATE_NOTICE_SUCCESS';
export const updateNoticeSuccess = (noticeId, newNotice) => {
  return {
    'type': UPDATE_NOTICE_SUCCESS,
    noticeId,
    newNotice
  };
};

const UPDATE_NOTICE_ERROR = 'UPDATE_NOTICE_ERROR';
export const updateNoticeError = () => {
  return {
    'type': UPDATE_NOTICE_ERROR
  };
};

const SET_CURRENT_NOTICE = 'SET_CURRENT_NOTICE';
export const setCurrentNotice = (notice) => {
  return {
    'type': SET_CURRENT_NOTICE,
    notice
  };
};

const DO_SEARCH_FILTERING = 'DO_SEARCH_FILTERING';
export const doSearchFiltering = (filteringBoolean) => {
  return {
    'type': DO_SEARCH_FILTERING,
    filteringBoolean
  };
};

const SET_FILTER_NOTICE_ID = 'SET_FILTER_NOTICE_ID';
export const setFilterNoticeId = (noticeId) => {
  return {
    'type': SET_FILTER_NOTICE_ID,
    noticeId
  };
};

const TOGGLE_ADVANCED_SEARCH = 'TOGGLE_ADVANCED_SEARCH';
export const toggleAdvancedSearch = () => {
  return {
    'type': TOGGLE_ADVANCED_SEARCH
  };
};
