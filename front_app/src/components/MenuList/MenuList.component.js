import React, { PropTypes } from 'react';
import MenuItem from '../MenuItem/MenuItem.component';
import styles from './MenuList.stylesheet.css';
import classNames from 'classnames';

const MenuList = ({ onAddDirClick, onAddNoticeClick, onRemoveClick, allDirectories }) => {
  const hint = <span className={classNames(styles.MenuList_addFolderHint, 'hintSliding ui left pointing label')}>
                 You should add new folder at first
               </span>;
  const addFolderHint = allDirectories.hasOwnProperty('children') && allDirectories.children.length > 0 ? null: hint;
  return (
    <div className={classNames(styles.MenuList)}>
      <MenuItem text='Add folder'
                iconClass='plus icon'
                onItemClick={onAddDirClick}
                tooltip='Click to add new folder'/>
      {addFolderHint}
      <MenuItem text='Add notice'
                iconClass='write icon'
                onItemClick={onAddNoticeClick}
                tooltip='Click to add new notice'/>
      <MenuItem text='Remove'
                iconClass='trash outline icon'
                onItemClick={onRemoveClick}
                tooltip='Click to remove current folder or notice'/>
    </div>
  );
};

MenuList.propTypes = {
  onAddDirClick: PropTypes.func,
  onAddNoticeClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  allDirectories: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default MenuList;
