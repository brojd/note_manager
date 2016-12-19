import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './MenuItem.stylesheet.css';

const MenuItem = ({ onItemClick, text, iconClass, tooltip }) => {
  
  return (
    <li className={classNames('item', styles.MenuItem)}>
      <div className={styles.MenuItem_icon}
           onClick={onItemClick}
           data-tooltip={tooltip}
           data-position='right center'>
        <i className={iconClass}></i>
      </div>
      <div className={styles.MenuItem_label}>{text}</div>
    </li>
  );
};

MenuItem.propTypes = {
  onItemClick: PropTypes.func,
  text: PropTypes.string,
  iconClass: PropTypes.string,
  tooltip: PropTypes.string
};

export default MenuItem;
