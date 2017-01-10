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

  /**
   * Component did mount method
   *
   * This method is called in the React component life cycle just after the
   * component renders. Once the component is rendered, make a call to the /serverInfo
   * endpoint to get the server information to display to the user. Upon
   * successful response from the server, dispatch the serverSuccess method to
   * update the Redux state with the server information.
   */
  componentDidMount() {
    // Reassign this to here to avoid any issues with using this
    const here = this;

    // Set up a cancel token for the axios request
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

    // Make the request to the /serverInfo endpoint and handle success and errors
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

  /**
   * Component will unmount method
   *
   * This method is called in the React component lifecycle just before the
   * component is removed from the DOM. Any server requests that are still open
   * will be canceled before the component is removed.
   */
  componentWillUnmount() {
    this.source.cancel('Operation canceled by the user action.');
  }

  /**
   * Render the Dashboard presentational component
   */
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

/**
 * Maps the Redux state to props
 *
 * This function defines and returns the pieces of the Redux state for use inside
 * this component. It accepts the existing state object and defines a new object
 * that will be accessible through the component props.
 *
 * @param {Object} $state - The current Redux state of the application.
 * @param {Object} $state.userInfo - Object containing information about the
 *                                    currently logged in user.
 *
 * @return {Object} - Object containing the desired pieces of the Redux state.
 */
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    serverInfo: state.serverInfo
  };
};

/**
 * Maps the dispatch methods to props
 *
 * Creates methods that dispatch Redux actions when called inside the component.
 * Each of the dispatched functions are imported from the action creators.
 *
 * @see dispatch()
 * @see updateServerSuccess()
 * @see updateServerFailure()
 *
 * @param {Function} $dispatch - The dispatch function made available through Redux.
 *
 * @return {Object} - Object containing methods for dispatching Redux actions.
 */
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

/**
 * Export the DashboardContainer component
 *
 * Connect the DashboardContainer component to the state and dispatch methods and make them
 * available inside the component as props and then export the DashboardContainer component.
 *
 * @see connect()
 *
 * @param {Object} $mapStateToProps - Object containing the desired pieces of
 *                                     the Redux state.
 * @param {Object} $mapDispatchToProps - Object containing methods for
 *                                        dispatching Redux actions.
 */
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
