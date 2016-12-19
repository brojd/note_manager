import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Directory.stylesheet.css';
import { RIEInput } from 'riek';


const Directory = ({ directory, onDirDoubleClick, onDirClick, currentDir, onNameChange }) => {
  
  const folderIcon = directory.isOpened ?
    <span className={styles.iconWrapper}><i className='folder open outline large icon'></i></span> :
    <span className={styles.iconWrapper}><i className={classNames('folder outline large icon', styles.folderIcon)}></i></span>;
  const _isCurrentDir = (dirToCheck) => currentDir ? currentDir.id === dirToCheck.id : false;
  const nameChange = (data) => {
    data.directoryId = directory.id;
    onNameChange(data);
  };
  const validate = (value) => value.length >= 1;
  
  let elemToDisplay = (
    <div className={classNames(styles.Directory, {[styles.currentDir]: _isCurrentDir(directory)})}
         value=''
         onDoubleClick={() => onDirDoubleClick(directory)}
         onClick={() => onDirClick(directory)}
         data-tooltip='Click once to see notices or click twice to open the folder'
         data-position='top center'>
      {folderIcon}
      <span data-tooltip='Click to change the title'
           data-position='bottom center'>
        <RIEInput value={directory.name}
                  validate={validate}
                  propName='dirName'
                  change={nameChange}
                  editProps={ { style: { color: '#d8d8d8', backgroundColor: 'transparent', border: 'none', outline: 'none' }}}
                  defaultProps={{ style: { backgroundColor: 'none' }}}
                  className={styles.Directory_textInput} />
      </span>
      {_isCurrentDir(directory) ?
        <span className={styles.currentDir__icon}><i className='angle double right icon'></i></span> :
        null}
    </div>
  );
  return (
    directory.isVisible ? elemToDisplay : null
  );
};

Directory.propTypes = {
  directory: PropTypes.object,
  onDirClick: PropTypes.func,
  onNameChange: PropTypes.func,
  onDirDoubleClick: PropTypes.func,
  currentDir: PropTypes.object
};

export default Directory;
