import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './TitleInput.stylesheet.css';

class TitleInput extends Component {
  constructor() {
    super();
    this._changeValue = this._changeValue.bind(this);
    this.state = {
      value: ''
    };
  }
  _changeValue(e) {
    this.setState({ value: e.target.value });
    this.props.onChange('title', e.target.value);
  }
  componentDidMount() {
    this.setState({ value: this.props.currentNotice.title });
  }
  render() {
    return (
      <div className={classNames(styles.TitleInput, 'twelve wide column ui grid left aligned')}>
        <label className={classNames(styles.TitleInput_label, 'four wide column')}>Title:</label>
        <span data-tooltip='Enter the title'
              data-position='top left'
              className={classNames(styles.TitleInput_inputWrapper, 'twelve wide column')}>
          <input type='text'
                 value={this.state.value}
                 onChange={this._changeValue}
                 className={classNames(styles.TitleInput_input)} />
        </span>
      </div>
    );
  }
}

TitleInput.propTypes = {
  onChange: PropTypes.func,
  currentNotice: PropTypes.object
};

export default TitleInput;
