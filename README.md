# react-redux-with-auth  
This is a simple application that uses Node, React and Redux and includes unit
tests. Upon starting the app, a login screen will appear. Entering incorrect
login credentials will result in an error message being displayed. Entering the
correct login credentials (username "demo" and password "password1") will redirect
the user to a simple dashboard that displays information about the server. Once
logged in, a "Log out" link will appear in the upper right corner of the screen.
Clicking on the log out link will log the user out of the app and redirect them
back to the login page.  

## Installation and Set Up  
Below are the instructions for installing the react-redux-with-auth repo. Go to the applicable
section by clicking the link below. *These instruction are valid as of 2017.01.06.*
* [Environment Set Up](#environment)
* [Repo Set Up](#repo)
* [Starting the Application](#app-start)
* [Testing the Application](#app-test)

### <a name="environment"></a>Environment Set Up
1. On your local machine, install the nodejs and npm.

### <a name="repo"></a>Repo Set Up
1. Fork the react-redux-with-auth Github repo
  1. In a web browser, visit https://github.com/NFabrizio/react-redux-with-auth
  2. Click the Fork button in the upper right corner of the screen
  3. In the "Where should we fork this repository?" pop up, select your username
    Github should create a fork of the repo in your account
2. Clone your fork of the app
  1. In the terminal on your local environment, navigate to the directory where you want to clone the app  
    `cd ~/path/to/your/directory`
  2. In the terminal, run:  
    `git clone [clone-url-for-your-fork]`  
    The URL should be in the format git@github.com:YourUsername/react-redux-with-auth.git

### <a name="app-start"></a>Starting the Application
1. Install the required NPM packages
  1. In the terminal on your local environment, navigate to the root directory where you cloned the app  
    `cd ~/path/to/your/directory`  
  2. In the terminal on your local environment, run:  
    `npm install`  
    This should install all of the required packages to run the application
2. Start the application and bundler
  1. In the terminal on your local environment, navigate to the root directory where you cloned the app  
    `cd ~/path/to/your/directory`  
  2. In the terminal on your local environment, run:  
    `npm start`  
    This should start the application at http://localhost:3000
  3. In the terminal on your local environment, open a new tab, make sure you are still in the root directory of the app and run:  
    `npm run bundle`  
    This will start the app bundler

### <a name="app-test"></a>Testing the Application
1. After you have installed the app and have it running according the instructions above, open a new tab in your terminal and start the test suite by running:  
  `npm test`  
  This will start the test suite for the actions and reducers
2. Open a new tab in your terminal and start the React test suite by running:  
  `npm run test-react`  
  This will start the test suite for the React components
