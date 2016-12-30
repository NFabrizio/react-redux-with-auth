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
    this.serverData = axios.get('/serverInfo')
                              .then((result) => {
                                here.setState({
                                  nodeVersion: result.data.node,
                                  appPath: result.data.path,
                                  dateTime: result.data.date
                                });
                              });
  }
  componentWillUnmount() {
    this.serverData.abort();
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
