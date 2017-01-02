import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  updateServerSuccess,
  updateServerFailure
} from '../actions/index.js';
import Dashboard from '../components/Dashboard.jsx';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const here = this;
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

    this.serverData = axios.get('/serverInfo', { cancelToken: this.source.token })
                              .then((result) => {
                                // here.setState({
                                //   nodeVersion: result.data.node,
                                //   appPath: result.data.path,
                                //   dateTime: result.data.date
                                // });
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
