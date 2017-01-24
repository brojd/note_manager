import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrentDirectory, updateAllDirectories } from '../actions/directories';
import { setCurrentNotice, doSearchFiltering } from '../actions/notices';
import { updateDirectory, updateNotice } from '../actions/async';
import DirectoriesList from '../components/DirectoriesList/DirectoriesList.component';
import findDirById from '../helpers/findDirById';

class DirectoriesContainer extends Component {
  
  constructor() {
    super();
    this._toggleDir = this._toggleDir.bind(this);
    this._setCurrentDir = this._setCurrentDir.bind(this);
    this._handleNameChange = this._handleNameChange.bind(this);
    this._turnOffCurrentDir = this._turnOffCurrentDir.bind(this);
  }
  
  _toggleDir(dir) {
    let newChildren = this.props.allDirectories.children.slice();
    function closeChildren(parent) {
      if (parent.hasOwnProperty('children')) {
        parent.children.forEach((n) => {
          n.isVisible = parent.isOpened ? n.isVisible : false;
          n.isOpened = parent.isOpened ? n.isOpened : false;
          closeChildren(n);
        });
      }
    }
    const changeDirProps = (elems) => {
      elems.forEach((n) => {
        if (n.id === dir.id) {
          n.isOpened = !n.isOpened;
          if (n.hasOwnProperty('children')) {
            n.children.map((child) => {
              return child.isVisible = !child.isVisible;
            });
          }
          this.props.updateDirectory(n.id, n);
        }
        if (n.hasOwnProperty('children')) {
          changeDirProps(n.children);
        }
      });
    };
    changeDirProps(newChildren);
    newChildren.forEach((n) => {
      closeChildren(n);
    });
    this.props.updateAllDirectories(newChildren);
  }
  
  _setCurrentDir(dir) {
    this.props.setCurrentDirectory(dir);
    this.props.setCurrentNotice({});
    this.props.doSearchFiltering(false);
  }
  
  _handleNameChange(data) {
    let dirId = data.directoryId;
    let newDir = findDirById(dirId, this.props.allDirectories.children);
    const changeNoticesTags = (dir, dirId) => {
      let dirNotices = this.props.allNotices.slice().filter((n) => n.directoryId === dirId);
      dirNotices.forEach((n) => {
        let newTags = n.tags.slice();
        n.tags.forEach((tag, i) => {
          if (tag === newDir.name) {
            newTags[i] = data.dirName;
          }
        });
        n.tags = newTags;
        this.props.updateNotice(n.id, n);
      });
      if (dir.hasOwnProperty('children') && dir.children.length > 0) {
        dir.children.forEach((n) => changeNoticesTags(n, n.id));
      }
    };
    changeNoticesTags(newDir, dirId);
    newDir.name = data.dirName;
    this.props.updateDirectory(dirId, newDir);
  }
  
  _turnOffCurrentDir() {
    this.props.setCurrentDirectory({});
    this.props.doSearchFiltering(false);
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
    let updateError = this.props.updateError ? this._generateErrorMessage('Cannot update directory') : null;
    return (
      <section className='three wide column'>
        <DirectoriesList allDirectories={this.props.allDirectories}
                         onDirDoubleClick={this._toggleDir}
                         onDirClick={this._setCurrentDir}
                         currentDir={this.props.currentDirectory}
                         onNameChange={this._handleNameChange}
                         onTurnOffClick={this._turnOffCurrentDir} />
        {updateError}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return  {
    allDirectories: state.directories.allDirectories,
    currentDirectory: state.directories.currentDirectory,
    updateError: state.directories.updateError,
    allNotices: state.notices.allNotices
  };
};

const mapDispatchToProps = {
  updateAllDirectories,
  updateDirectory,
  updateNotice,
  setCurrentDirectory,
  setCurrentNotice,
  doSearchFiltering
};

DirectoriesContainer.propTypes = {
  allDirectories: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  allNotices: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  updateAllDirectories: PropTypes.func,
  updateDirectory: PropTypes.func,
  updateNotice: PropTypes.func,
  doSearchFiltering: PropTypes.func,
  setCurrentDirectory: PropTypes.func,
  setCurrentNotice: PropTypes.func,
  currentDirectory: PropTypes.object,
  updateError: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectoriesContainer);
