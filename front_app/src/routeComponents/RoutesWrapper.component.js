import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { fetchDirsAndNotices } from '../actions/async';

class RoutesWrapper extends Component {
  
  componentDidMount() {
    this.props.fetchDirsAndNotices();
  }
  
  render() {
    let errorMessage = this.props.fetchError ? <div>Cannot load data</div> : null;
    return (
      <div>
        {this.props.children}
        {errorMessage}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchError: state.directories.fetchError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDirsAndNotices: () => dispatch(fetchDirsAndNotices())
  };
};

RoutesWrapper.propTypes = {
  children: PropTypes.element,
  fetchDirsAndNotices: PropTypes.func,
  fetchError: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ])
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesWrapper);
