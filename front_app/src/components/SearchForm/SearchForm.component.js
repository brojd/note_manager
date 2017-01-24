import React, { PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import styles from './SearchForm.stylesheet.css';
import classNames from 'classnames';

const SearchForm = ({ advancedSearch, onToggleAdvancedSearch, notices, onSearch }) => {
  
  const advanceFilter = (option, filter) => {
    let foundInDescription = option.description.indexOf(filter) > -1;
    let foundInTags = _.findIndex(option.tags, (tag) => tag.toLowerCase().indexOf(filter.toLowerCase()) > -1) > -1;
    if (foundInDescription || foundInTags) {
      return option;
    }
  };
  const options = notices.slice().map((n) => {
    let obj = {
      value: n.id,
      label: n.title,
      description: n.description,
      tags: n.tags
    };
    return obj;
  });
  const buttonText = advancedSearch ? 'Simple' : 'Advanced';
  const filterOption = advancedSearch ? advanceFilter : null;
  const label = <div className={classNames(styles.SearchForm_pointingLabel, 'ui pointing label')}>
    Searching by description or tags
  </div>;
  const pointingLabel = advancedSearch ? label : null;
  const searchTooltip = advancedSearch ? 'Search by tags or description' : 'Search by name';
  const buttonTooltip = advancedSearch ? 'Switch to simple mode' : 'Switch to advanced mode';
  return (
    <form className={classNames('three wide column', styles.SearchForm)}>
      <div data-tooltip={searchTooltip}
           data-position='top right'>
        <Select name='search-notices'
                options={options}
                onChange={onSearch}
                matchProp='label'
                filterOption={filterOption}
                placeholder='Search for notices...'/>
      </div>
      {pointingLabel}
      <button className={styles.SearchForm_advanceButton}
              type='button'
              onClick={onToggleAdvancedSearch}
              data-tooltip={buttonTooltip}
              data-position='bottom right'>
        {buttonText}
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  notices: PropTypes.array,
  onSearch: PropTypes.func,
  onToggleAdvancedSearch: PropTypes.func,
  advancedSearch: PropTypes.bool
};

export default SearchForm;
