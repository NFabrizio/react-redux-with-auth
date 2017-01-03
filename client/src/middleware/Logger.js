/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  const baseUrl = 'http://localhost:3000';
  let result = next(action);
  const data = {};
  let formattedData = '';

  // console.group(action.type)
  // console.info('dispatching', action)
  // console.log('next state', store.getState())
  // console.groupEnd(action.type)

  data.actionType = action.type;
  data.dispatching = action;
  data.nextState = store.getState();
  formattedData = `jsonData=${JSON.stringify(data)}`;
  // create an AJAX request
  const request = new XMLHttpRequest();
  request.open('post', baseUrl);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.responseType = 'json';
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
  request.send(formattedData);


  return result;
};

export default logger;
