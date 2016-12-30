import React from 'react';
import axios from 'axios';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // Set the initial component state
    this.state = {
      nodeVersion: '',
      appPath: '',
      dateTime: '',
      username: ''
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
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h4>Welcome to the Dashboard</h4>
          <p>Node.js version: {this.state.nodeVersion}</p>
          <p>Path: {this.state.appPath}</p>
          <p>Date and Time: {this.state.dateTime}</p>
          <p>User: {this.state.username}</p>
        </div>
      </div>
    )
  }
};
