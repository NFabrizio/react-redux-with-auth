/**
 * Logout component
 */
// Import dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Auth from '../modules/Auth';
import {
  logoutUserSuccess,
  logoutUserFailure,
  resetServerInfo
} from '../actions/index.js';

class Logout extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    console.log("clicked!");
    Auth.deauthenticateUser();

    this.props.logoutSuccess();
    this.props.serverReset();

    browserHistory.push('/login');
  }
  render() {
    return (
      <div className="top-bar-right">
        <a onClick={this.logoutHandler}>Log out</a>
      </div>
    );
  }
};

Logout.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    serverInfo: state.serverInfo
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutSuccess: () => {
      dispatch(logoutUserSuccess());
    },
    logoutFailure: (user, errors) => {
      dispatch(logoutUserFailure(user, errors));
    },
    serverReset: () => {
      dispatch(resetServerInfo());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
