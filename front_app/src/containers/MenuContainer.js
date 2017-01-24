import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MenuList from '../components/MenuList/MenuList.component';
import filterNoticesAfterDirDelete from '../helpers/filterNoticesAfterDirDelete';
import { updateAllDirectories, setCurrentDirectory } from '../actions/directories';
import { updateAllNoticesSuccess } from '../actions/notices';
import { addDirectoryToRoot, addDirectoryToChild, addNotice, deleteNotice, deleteDirectory } from '../actions/async';
import findDirById from '../helpers/findDirById';
import { getAllDirectories, getCurrentDirectory, getAddDirError, getDeleteDirError } from '../selectors/directories';
import { getAllNotices, getCurrentNotice, getAddNoticeError, getDeleteNoticeError } from '../selectors/notices';

class MenuContainer extends Component {
  
  constructor() {
    super();
    this._addDir = this._addDir.bind(this);
    this._addNotice = this._addNotice.bind(this);
    this._removeItem = this._removeItem.bind(this);
  }
  
  _addDir() {
    let currentDirs = this.props.allDirectories.children ? this.props.allDirectories.children.slice() : [];
    let newDir = {
      parentId: 1,
      name: 'New folder',
    };
    if (!this.props.currentDir.id) {
      this.props.addDirectoryToRoot(newDir, currentDirs);
    } else {
      const parentId = this.props.currentDir.id;
      const addToCurrentDir = (dirs) => {
        dirs.forEach((dir) => {
          if (dir.id === parentId) {
            dir.children = dir.children ? dir.children : [];
            newDir.isVisible = dir.isOpened;
            newDir.isOpened = false;
            newDir.parentId = dir.id;
            this.props.addDirectoryToChild(newDir, currentDirs);
          } else if (dir.id !== parentId && dir.hasOwnProperty('children')) {
            addToCurrentDir(dir.children);
          }
        });
      };
      addToCurrentDir(currentDirs);
    }
  }
  _addNotice() {
    if (!this.props.currentDir.id) {
      alert('Choose the folder first');
    }
    let currentDirCopy = Object.assign({ ...this.props.currentDir });
    let dirNames = [];
    function findAllParentDirNames(currentDir, allDirs) {
      if (currentDir.parentId) {
        dirNames.push(currentDir.name);
        let parentDir = findDirById(currentDir.parentId, allDirs);
        if (parentDir) {
          findAllParentDirNames(parentDir, allDirs);
        }
      }
    }
    findAllParentDirNames(currentDirCopy, this.props.allDirectories.children);
    let newNotice = {
      directoryId: this.props.currentDir.id,
      title: 'new notice',
      description: '',
      tags: dirNames
    };
    this.props.addNotice(newNotice);
  }
  _removeItem() {
    if (!this.props.currentNotice.id && !this.props.currentDir.id) {
      alert('You should choose folder or notice to delete');
      return false;
    }
    if (this.props.currentNotice.id) {
      let toDelete = confirm('Do you want to remove notice?');
      if (toDelete) {
        this.props.deleteNotice(this.props.currentNotice.id);
      }
    } else {
      let toDelete = confirm('Do you want to remove folder?');
      if (toDelete) {
        let newNotices = filterNoticesAfterDirDelete(this.props.allNotices, this.props.currentDir);
        this.props.updateAllNoticesSuccess(newNotices);
        this.props.deleteDirectory(this.props.currentDir.id);
      }
    }
  }
  _generateErrorMessage(text) {
    return (
      <div className="ui negative message">
        <div className="header">
          <i className="warning sign icon"></i>
          {text}
        </div>
        Refresh the page and try again
      </div>
    );
  }
  
  render() {
    let addDirError = this.props.addDirectoryError ? this._generateErrorMessage('Cannot add folder') : null;
    let addNoticeError = this.props.addNoticeError ? this._generateErrorMessage('Cannot add notice') : null;
    let deleteNoticeError = this.props.deleteNoticeError ? this._generateErrorMessage('Cannot delete notice') : null;
    let deleteDirectoryError = this.props.deleteDirectoryError ? this._generateErrorMessage('Cannot delete directory') :
      null;
    return (
      <section className='two wide column center aligned'>
        <MenuList onAddDirClick={this._addDir}
                  onAddNoticeClick={this._addNotice}
                  onRemoveClick={this._removeItem}
                  allDirectories={this.props.allDirectories} />
        {addDirError}
        {addNoticeError}
        {deleteNoticeError}
        {deleteDirectoryError}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return  {
    currentDir: getCurrentDirectory(state),
    currentNotice: getCurrentNotice(state),
    allDirectories: getAllDirectories(state),
    allNotices: getAllNotices(state),
    addDirectoryError: getAddDirError(state),
    addNoticeError: getAddNoticeError(state),
    deleteNoticeError: getDeleteNoticeError(state),
    deleteDirectoryError: getDeleteDirError(state)
  };
};

const mapDispatchToProps = {
  updateAllDirectories,
  updateAllNoticesSuccess,
  addDirectoryToRoot,
  addDirectoryToChild,
  setCurrentDirectory,
  addNotice,
  deleteNotice,
  deleteDirectory
};

MenuContainer.propTypes = {
  currentDir: PropTypes.object,
  currentNotice: PropTypes.object,
  updateAllDirectories: PropTypes.func,
  updateAllNoticesSuccess: PropTypes.func,
  addDirectoryToRoot: PropTypes.func,
  addDirectoryToChild: PropTypes.func,
  setCurrentDirectory: PropTypes.func,
  addNotice: PropTypes.func,
  deleteNotice: PropTypes.func,
  deleteDirectory: PropTypes.func,
  allDirectories: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  allNotices: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  addDirectoryError: PropTypes.bool,
  addNoticeError: PropTypes.bool,
  deleteNoticeError: PropTypes.bool,
  deleteDirectoryError: PropTypes.bool
};


export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
