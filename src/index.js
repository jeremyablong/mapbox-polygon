import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './containers/App/App';
import reducers from './reducers';

import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);