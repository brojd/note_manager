import { createSelector } from 'reselect';

const allNoticesSelector = state => state.notices.allNotices;
export const getAllNotices = createSelector(
  allNoticesSelector,
  (allNotices) => allNotices
);

const currentNoticeSelector = state => state.notices.currentNotice;
export const getCurrentNotice = createSelector(
  currentNoticeSelector,
  (currentNotice) => currentNotice
);

const filteringBooleanSelector = state => state.notices.searchFilteringBoolean;
export const getFilteringBoolean = createSelector(
  filteringBooleanSelector,
  (searchFilteringBoolean) => searchFilteringBoolean
);

const advancedSearchSelector = state => state.notices.advancedSearch;
export const getAdvancedSearch = createSelector(
  advancedSearchSelector,
  (advancedSearch) => advancedSearch
);

const updateErrorSelector = state => state.notices.updateError;
export const getUpdateError = createSelector(
  updateErrorSelector,
  (updateError) => updateError
);

const filteredNoticeIdSelector = state => state.notices.filteredNoticeId;
export const getFilteredNoticeId = createSelector(
  filteredNoticeIdSelector,
  (filteredNoticeId) => filteredNoticeId
);
