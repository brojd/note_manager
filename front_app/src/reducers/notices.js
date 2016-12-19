import _ from 'lodash';

const initialState = {
  allNotices: [],
  currentNotice: {},
  filteredNoticeId: null,
  searchFilteringBoolean: false,
  advancedSearch: false,
  updateError: false,
  addError: false,
  deleteError: false
};

const reducer = function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_ALL_NOTICES_SUCCESS':
      return Object.assign({ ...state, allNotices: action.allNotices });
    case 'ADD_NOTICE_SUCCESS':
      {
        let allNoticesCopy = state.allNotices.slice();
        allNoticesCopy.push(action.newNotice);
        return Object.assign({ ...state, allNotices: allNoticesCopy, addError: false });
      }
    case 'ADD_NOTICE_ERROR':
      return Object.assign({ ...state, addError: true });
    case 'DELETE_NOTICE_SUCCESS':
      {
        let allNoticesCopy = state.allNotices.slice();
        _.remove(allNoticesCopy, (n) => n.id === action.noticeId);
        return Object.assign({ ...state, allNotices: allNoticesCopy, currentNotice: {}, deleteError: false });
      }
    case 'DELETE_NOTICE_ERROR':
      return Object.assign({ ...state, deleteError: true });
    case 'UPDATE_ALL_NOTICES_SUCCESS':
      return Object.assign({ ...state, allNotices: action.newNotices, updateError: false });
    case 'UPDATE_ALL_NOTICES_ERROR':
      return Object.assign({ ...state, updateError: true });
    case 'UPDATE_NOTICE_SUCCESS':
      {
        let allNoticesCopy = state.allNotices.slice();
        allNoticesCopy.filter((n) => n.id === action.noticeId)[0] = action.newNotice;
        return Object.assign({ ...state, allNotices: allNoticesCopy, updateError: false });
      }
    case 'UPDATE_NOTICE_ERROR':
      return Object.assign({ ...state, updateError: true });
    case 'SET_CURRENT_NOTICE':
      return Object.assign({ ...state, currentNotice: action.notice });
    case 'DO_SEARCH_FILTERING':
      return Object.assign({ ...state, searchFilteringBoolean: action.filteringBoolean });
    case 'SET_FILTER_NOTICE_ID':
      return Object.assign({ ...state, filteredNoticeId: action.noticeId });
    case 'TOGGLE_ADVANCED_SEARCH':
      return Object.assign({ ...state, advancedSearch: !state.advancedSearch });
  }
  return state;
};

export default reducer;
