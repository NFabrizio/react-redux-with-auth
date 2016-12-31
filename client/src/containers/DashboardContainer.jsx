import React from 'react';
import axios from 'axios';
import Dashboard from '../components/Dashboard.jsx';

export default class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    // Set the initial component state
    this.state = {
      nodeVersion: '',
      appPath: '',
      dateTime: '',
      user: {
        username: '',
        password: ''
      }
    };
  }
  componentDidMount() {
    const here = this;
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

    this.serverData = axios.get('/serverInfo', { cancelToken: this.source.token })
                              .then((result) => {
                                here.setState({
                                  nodeVersion: result.data.node,
                                  appPath: result.data.path,
                                  dateTime: result.data.date
                                });
                              })
                              .catch((error) => {
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
                                alert('An error occurred getting the server info');
                              });
  }
  componentWillUnmount() {
    this.source.cancel('Operation canceled by the user action.');
  }
  render() {
    return (
      <Dashboard
        nodeVersion={this.state.nodeVersion}
        appPath={this.state.appPath}
        dateTime={this.state.dateTime}
        user={this.state.user}
      />
    )
  }
};
