import React, { PropTypes } from 'react';
import Directory from '../Directory/Directory.component';
import styles from './DirectoriesList.stylesheet.css';
import classNames from 'classnames';

const DirectoriesList = ({ allDirectories, onDirDoubleClick, onDirClick, currentDir, onNameChange, onTurnOffClick }) => {
  
  const createTreeToDisplay = (rootDir, i) => {
    if (rootDir.hasOwnProperty('children') && rootDir.isOpened) {
      return (
        <div key={i}>
          <Directory key={i}
                     directory={rootDir}
                     onDirClick={onDirClick}
                     onDirDoubleClick={onDirDoubleClick}
                     currentDir={currentDir}
                     onNameChange={onNameChange} />
          <div className={styles.childrenList}>
            {rootDir.children.map((dir, index) => createTreeToDisplay(dir, index))}
          </div>
        </div>
      );
    } else {
      return <Directory key={i}
                        directory={rootDir}
                        onDirDoubleClick={onDirDoubleClick}
                        onDirClick={onDirClick}
                        currentDir={currentDir}
                        onNameChange={onNameChange} />;
    }
  };
  let treeObj = allDirectories.hasOwnProperty('children') ? allDirectories : [];
  let treeToDisplay = treeObj.children ? treeObj.children.map((rootDir, index) => createTreeToDisplay(rootDir, index)) :
    null;
  
  return (
    <div className={styles.DirectoriesList}>
      {treeToDisplay}
      <button className={classNames(styles.DirectoriesList_button)}
              type='button'
              onClick={onTurnOffClick}
              data-tooltip='Click to see all notices'
              data-position='bottom center'>
        <i className="grid layout big icon"></i>
      </button>
    </div>
  );
};

DirectoriesList.propTypes = {
  allDirectories: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onDirDoubleClick: PropTypes.func,
  onDirClick: PropTypes.func,
  onTurnOffClick: PropTypes.func,
  onNameChange: PropTypes.func,
  currentDir: PropTypes.object
};

export default DirectoriesList;
