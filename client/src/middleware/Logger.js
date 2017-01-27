'use strict';

/**
 * User action logger middleware
 *
 * Logs all actions and Redux states to the server console after they are dispatched
 * using an HTTP POST request. Formats the action and state information into a
 * data object, stringifies it, sends it to the base URL in an HTTP POST request
 * and listens for a response from the server.
 *
 * @parent /client/src/app.jsx
 *
 * @export logger
 */
const logger = store => next => action => {
  // Set up the required variables
  const baseUrl = 'http://localhost:3000';
  let result = next(action);
  const data = {};
  let formattedData = '';

  // Create the elements of the data object
  data.actionType = action.type;
  data.dispatching = action;
  data.nextState = store.getState();

  // Prepare the data for sending to the server endpoint
  formattedData = `jsonData=${JSON.stringify(data)}`;

  // create an AJAX request
  const request = new XMLHttpRequest();
  request.open('post', baseUrl);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.responseType = 'json';

  // Set up a listener for a response from the server
  request.addEventListener('load', () => {
    if (request.status === 200) {
      // success
      console.log('Success 200!');
    } else {
      // failure
      console.log('Failure!');
      console.log(request);
    }
  });

  // Send the request
  request.send(formattedData);

  return result;
};

// Set the default export for the module
export default logger;
