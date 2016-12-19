import React from 'react';
import DirectoriesContainer from '../containers/DirectoriesContainer';
import NoticesContainer from '../containers/NoticesContainer';
import MenuContainer from '../containers/MenuContainer';
import styles from './Main.stylesheet.css';

const IndexRoute = () => {
  return (
    <div className={styles.mainWrapper}>
      <main className='ui grid'>
        <MenuContainer />
        <DirectoriesContainer />
        <NoticesContainer />
      </main>
    </div>
  );
};

export default IndexRoute;
