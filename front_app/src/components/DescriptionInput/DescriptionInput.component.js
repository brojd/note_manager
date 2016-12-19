import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './DescriptionInput.stylesheet.css';

class DescriptionInput extends Component {
  constructor() {
    super();
    this._changeValue = this._changeValue.bind(this);
    this.state = {
      value: ''
    };
  }
  _changeValue(e) {
    this.setState({ value: e.target.value });
    this.props.onChange('description', e.target.value);
  }
  componentDidMount() {
    this.setState({ value: this.props.currentNotice.description });
  }
  render() {
    return (
      <div className={classNames(styles.DescriptionInput, 'twelve wide column ui grid left aligned')}>
        <label className={classNames(styles.DescriptionInput_label, 'four wide column')}>Description:</label>
        <span data-tooltip='Enter the description'
              data-position='top left'
              className={classNames(styles.DescriptionInput_inputWrapper, 'twelve wide column')}>
          <textarea value={this.state.value}
                    onChange={this._changeValue}
                    className={classNames(styles.DescriptionInput_input)} />
        </span>
      </div>
    );
  }
}

DescriptionInput.propTypes = {
  onChange: PropTypes.func,
  currentNotice: PropTypes.object
};

export default DescriptionInput;
