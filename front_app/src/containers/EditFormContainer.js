import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TitleInput from '../components/TitleInput/TitleInput.component';
import DescriptionInput from '../components/DescriptionInput/DescriptionInput.component';
import TagsInput from '../components/TagsInput/TagsInput.component';
import { updateNotice } from '../actions/async';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import styles from './EditFormContainer.stylesheet.css';
import classNames from 'classnames';

class EditFormContainer extends Component {
  
  constructor() {
    super();
    this._handleChange = this._handleChange.bind(this);
  }
  _handleChange(type, value, tagIndex) {
    let newNotice = this.props.allNotices.slice().filter((n) => n.id === this.props.currentNotice.id)[0];
    switch(type) {
      case 'title':
        newNotice.title = value;
        break;
      case 'description':
        newNotice.description = value;
        break;
      case 'addTag':
        newNotice.tags.push('new tag');
        break;
      case 'removeTag':
        newNotice.tags.splice(tagIndex, 1);
        break;
      case 'changeTagName':
        newNotice.tags[tagIndex] = value;
        break;
    }
    this.props.updateNotice(this.props.currentNotice.id, newNotice);
  }
  _generateErrorMessage(text) {
    return (
      <div className='ui grid center aligned'>
        <div className="ui negative message six wide column">
          <div className="header">
            <i className="warning sign icon"></i>
            {text}
          </div>
          Refresh the page and try again
        </div>
      </div>
    );
  }
  componentDidMount() {
    if (!this.props.currentNotice.id) {
      browserHistory.push('/');
    }
  }
  
  render() {
    let updateError = this.props.updateNoticeError ? this._generateErrorMessage('Cannot update notice') : null;
    return (
      <section className={classNames('eight wide column center aligned', styles.EditFormContainer)}>
        <form className={classNames('ui grid center aligned', styles.editForm)}>
          <TitleInput onChange={this._handleChange}
                      currentNotice={this.props.currentNotice} />
          <DescriptionInput onChange={this._handleChange}
                            currentNotice={this.props.currentNotice} />
          <TagsInput onChange={this._handleChange}
                     currentNotice={this.props.currentNotice} />
        </form>
        {updateError}
        <Link to='/'
              className={classNames('left aligned', styles.backIconWrapper)}>
          <span data-tooltip='Click to go back'
                data-position='bottom left'>
            <i className={classNames(styles.backIcon, 'arrow circle outline left icon')}></i>
          </span>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return  {
    currentNotice: state.notices.currentNotice,
    allNotices: state.notices.allNotices,
    updateNoticeError: state.notices.updateError
  };
};

const mapDispatchToProps = {
  updateNotice
};

EditFormContainer.propTypes = {
  updateNotice: PropTypes.func,
  currentNotice: PropTypes.object,
  allNotices: PropTypes.array,
  updateNoticeError: PropTypes.bool
};


export default connect(mapStateToProps, mapDispatchToProps)(EditFormContainer);
