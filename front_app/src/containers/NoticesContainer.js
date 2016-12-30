import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrentNotice, doSearchFiltering, toggleAdvancedSearch, setFilterNoticeId } from '../actions/notices';
import { setCurrentDirectory } from '../actions/directories';
import { updateTwoNotices, updateNotice } from '../actions/async';
import NoticesList from '../components/NoticesList/NoticesList.component';
import SearchForm from '../components/SearchForm/SearchForm.component';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {browserHistory} from 'react-router';

class NoticesContainer extends Component {
  
  constructor() {
    super();
    this._moveNotice = this._moveNotice.bind(this);
    this._setCurrentNotice = this._setCurrentNotice.bind(this);
    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._redirectToEditForm = this._redirectToEditForm.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
    this.state = {
      searchedNoticeId: null
    };
  }
  
  _moveNotice(dragId, dragPosition, hoverId, hoverPosition) {
    let allNoticesCopy = this.props.allNotices.slice();
    let dragNotice = allNoticesCopy.filter((n) => n.id === dragId)[0];
    let hoverNotice = allNoticesCopy.filter((n) => n.id === hoverId)[0];
    allNoticesCopy.forEach((n) => {
      if (n.id === dragId) {
        n.position = hoverPosition;
      } else if (n.id === hoverId) {
        n.position = dragPosition;
      }
    });
    this.props.updateTwoNotices(dragId, dragNotice, hoverId, hoverNotice, allNoticesCopy);
  }
  
  _setCurrentNotice(notice) {
    this.props.setCurrentNotice(notice);
  }
  
  _handleTitleChange(data) {
    let newNotice = this.props.allNotices.slice().filter((n) => n.id === data.noticeId)[0];
    newNotice.title = data.noticeTitle;
    this.props.updateNotice(data.noticeId, newNotice);
  }
  
  _redirectToEditForm() {
    browserHistory.push('/notice-details');
  }
  
  _handleSearch(val) {
    this.props.setFilterNoticeId(val.value);
    this.props.doSearchFiltering(true);
    this.props.setCurrentDirectory({});
  }
  
  _generateErrorMessage(text) {
    return (
      <div className="ui negative message four wide column">
        <div className="header">
          <i className="warning sign icon"></i>
          {text}
        </div>
        Refresh the page and try again
      </div>
    );
  }
  
  render() {
    let filteredNotices = this.props.allNotices.filter((n) => n.directoryId === this.props.currentDirectory.id);
    let notices = this.props.currentDirectory.id ? filteredNotices : this.props.allNotices;
    let updateError = this.props.updateError ? this._generateErrorMessage('Cannot update notice') : null;
    if (this.props.searchFilteringBoolean) {
      notices = this.props.allNotices.filter((n) => n.id === this.props.filteredNoticeId);
    }
    return (
      <section className='ui grid eleven wide column'>
        <NoticesList notices={notices}
                     moveNotice={this._moveNotice}
                     onNoticeClick={this._setCurrentNotice}
                     currentNotice={this.props.currentNotice}
                     currentDirectory={this.props.currentDirectory}
                     onTitleChange={this._handleTitleChange}
                     onIconDblClick={this._redirectToEditForm} />
        <SearchForm notices={this.props.allNotices}
                    onSearch={this._handleSearch}
                    onToggleAdvancedSearch={this.props.toggleAdvancedSearch}
                    advancedSearch={this.props.advancedSearch}/>
        {updateError}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return  {
    allNotices: state.notices.allNotices,
    currentDirectory: state.directories.currentDirectory,
    currentNotice: state.notices.currentNotice,
    searchFilteringBoolean: state.notices.searchFilteringBoolean,
    advancedSearch: state.notices.advancedSearch,
    updateError: state.notices.updateError,
    filteredNoticeId: state.notices.filteredNoticeId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTwoNotices: (firstId, firstNotice, secondId, secondNotice, newNotices) => {
      return dispatch(updateTwoNotices(firstId, firstNotice, secondId, secondNotice, newNotices));
    },
    updateNotice: (noticeId, noticeTitle) => dispatch(updateNotice(noticeId, noticeTitle)),
    setCurrentNotice: (notice) => dispatch(setCurrentNotice(notice)),
    doSearchFiltering: (filteringBoolean) => dispatch(doSearchFiltering(filteringBoolean)),
    toggleAdvancedSearch: () => dispatch(toggleAdvancedSearch()),
    setCurrentDirectory: (directory) => dispatch(setCurrentDirectory(directory)),
    setFilterNoticeId: (noticeId) => dispatch(setFilterNoticeId(noticeId))
  };
};

NoticesContainer.propTypes = {
  updateTwoNotices: PropTypes.func,
  updateNotice: PropTypes.func,
  setCurrentNotice: PropTypes.func,
  doSearchFiltering: PropTypes.func,
  searchFilteringBoolean: PropTypes.bool,
  allNotices: PropTypes.array,
  currentDirectory: PropTypes.object,
  currentNotice: PropTypes.object,
  advancedSearch: PropTypes.bool,
  toggleAdvancedSearch: PropTypes.func,
  setCurrentDirectory: PropTypes.func,
  setFilterNoticeId: PropTypes.func,
  updateError: PropTypes.bool,
  filteredNoticeId: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(NoticesContainer));
