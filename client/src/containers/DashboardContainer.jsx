/**
 * Dashboard container component
 *
 * Renders the Dashboard component and passes it the necessary props and methods.
 * Sets up the HTTP request to the /serverInfo endpoint to get server information
 * and dispatches the Redux actions to update the state appropriately. Uses the
 * connect function to map the state and actions to props for use inside the component.
 *
 * @parent /client/src/app.jsx
 *
 * @export DashboardContainer
 */

// Import dependencies
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  updateServerSuccess,
  updateServerFailure
} from '../actions/index.js';
import Dashboard from '../components/Dashboard.jsx';

/**
 * Dashboard container class
 *
 * Pulls in the props from the parent component, sets up the handlers for requesting
 * the server information. Handles canceled server requests. Renders the Dashboard
 * component.
 *
 * @return - HTML elements.
 */
class DashboardContainer extends React.Component {
  /**
   * Class constructor
   *
   * Sets up the props to be passed in from the parent component.
   *
   * @see super()
   *
   * @return null
   */
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Reassign this to here to avoid any issues with using this
    const here = this;

    // Set up a cancel token for the axios request
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

    //
    this.serverData = axios.get('/serverInfo', { cancelToken: this.source.token })
                              .then((result) => {
                                this.props.serverSuccess(result.data);
                              })
                              .catch((error) => {
                                this.props.serverFailure(error);
                                if (axios.isCancel(error)) {
                                  console.log('Request canceled', error.message);
                                } else if (error.response) {
                                  // The server responded with a status code outside 2xx
                                  console.log('An error occurred getting the server info:');
                                  console.log(error.response.data);
                                  console.log(error.response.status);
                                  console.log(error.response.headers);
                                } else {
                                  // Error occurred setting up the request
                                  console.log(`An error occurred getting the server info: ${error.message}`);
                                }
                                // alert('An error occurred getting the server info');
                              });
  }
  componentWillUnmount() {
    this.source.cancel('Operation canceled by the user action.');
  }
  render() {
    return (
      <Dashboard
        nodeVersion={this.props.serverInfo.nodeVersion}
        appPath={this.props.serverInfo.appPath}
        dateTime={this.props.serverInfo.dateTime}
        user={this.props.userInfo.user}
      />
    )
  }
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    serverInfo: state.serverInfo
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    serverSuccess: (info) => {
      dispatch(updateServerSuccess(info));
    },
    serverFailure: (user, errors) => {
      dispatch(updateServerFailure(user, errors));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
