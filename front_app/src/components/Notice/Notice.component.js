import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { ItemTypes } from './ConstantsDnD';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import classNames from 'classnames';
import styles from './Notice.stylesheet.css';
import { RIEInput as InlineEditInput } from 'riek';

const noticeSource = {
  beginDrag(props) {
    props.onNoticeClick(props.notice);
    return {
      noticeId: props.notice.id,
      notice: props.notice,
      position: props.notice.position
    };
  },
  canDrag(props) {
    return props.currentDirectory.id;
  }
};

const noticeTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().position;
    const dragId = monitor.getItem().noticeId;
    const hoverIndex = props.notice.position;
    const hoverId = props.notice.id;
    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleX = (hoverBoundingRect.left - hoverBoundingRect.right) / 2;
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientX = clientOffset.x - hoverBoundingRect.right;
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && (hoverClientY < hoverMiddleY && hoverClientX < hoverMiddleX)) {
      return;
    }
    if (dragIndex > hoverIndex && (hoverClientY > hoverMiddleY && hoverClientX > hoverMiddleX)) {
      return;
    }
    props.moveNotice(dragId, dragIndex, hoverId, hoverIndex);
    monitor.getItem().position = hoverIndex;
  },
  drop(props) {
    props.onNoticeClick(props.notice);
  }
};

class Notice extends Component {
  constructor() {
    super();
    this._isCurrentNotice = this._isCurrentNotice.bind(this);
    this._titleChange = this._titleChange.bind(this);
  }
  _titleChange(data) {
    data.noticeId = this.props.notice.id;
    this.props.onTitleChange(data);
  }
  _isCurrentNotice() {
    return this.props.notice ? this.props.notice.id === this.props.currentNotice.id : false;
  }
  _validate(value) {
    return value.length >= 1;
  }
  render() {
    const { connectDragSource, connectDropTarget } = this.props;
    const tooltip = this.props.currentDirectory.id ? 'Click twice to see details or drag and drop to change the order' :
      'Click twice to see details';
    return connectDragSource(connectDropTarget(
      <li className={classNames(styles.NoticeWrapper, 'item')}>
        <div className={classNames(styles.Notice, {[styles.currentNotice]: this._isCurrentNotice()})}
             onClick={() => this.props.onNoticeClick(this.props.notice)}
             onDoubleClick={this.props.onIconDblClick}
             data-tooltip={tooltip}
             data-position='top center'>
          <div className={styles.Notice_icon}>
            <i className="file text huge icon"></i>
          </div>
          <div data-tooltip='Click to change the title'
               data-position='bottom center'>
            <InlineEditInput className={styles.Notice_label}
                             validate={this._validate}
                             value={this.props.notice.title}
                             propName='noticeTitle'
                             change={this._titleChange}
                             editProps={ { style: { color: '#d8d8d8', backgroundColor: 'transparent', border: 'none',
                               outline: 'none', width: '100%', lineHeight: '16px' }}}
                             defaultProps={{ style: { backgroundColor: 'none' }}} />
          </div>
        </div>
      </li>
    ));
  }
}

Notice.propTypes = {
  notice: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  moveNotice: PropTypes.func,
  onNoticeClick: PropTypes.func,
  onIconDblClick: PropTypes.func,
  onTitleChange: PropTypes.func,
  currentNotice: PropTypes.object,
  currentDirectory: PropTypes.object
};

export default flow(
  DropTarget(ItemTypes.NOTICE, noticeTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource(ItemTypes.NOTICE, noticeSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Notice);
