import React, { PropTypes } from 'react';
import Notice from '../Notice/Notice.component';

const NoticesList = ({ notices, moveNotice, onNoticeClick, currentNotice,
  onTitleChange, onIconDblClick, currentDirectory }) => {
  
  let sortedNotices = notices.slice().sort((a, b) => a.position - b.position);
  
  return (
    <div className='twelve wide column'>
      <div className='ui horizontal list'>
        {sortedNotices.map((notice, index) => <Notice key={index}
                                                      notice={notice}
                                                      moveNotice={moveNotice}
                                                      onNoticeClick={onNoticeClick}
                                                      currentNotice={currentNotice}
                                                      onTitleChange={onTitleChange}
                                                      onIconDblClick={onIconDblClick}
                                                      currentDirectory={currentDirectory} />)}
      </div>
    </div>
  );
};

NoticesList.propTypes = {
  notices: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  moveNotice: PropTypes.func,
  onNoticeClick: PropTypes.func,
  onIconDblClick: PropTypes.func,
  onTitleChange: PropTypes.func,
  currentNotice: PropTypes.object,
  currentDirectory: PropTypes.object
};

export default NoticesList;
