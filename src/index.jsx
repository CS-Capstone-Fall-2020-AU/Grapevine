import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './store/reducers/rootReducer';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Navigation from '../src/components/navigation';





const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

ReactDOM.render(

    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Navigation />
        <App />
      </PersistGate>
    </Provider>,
 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
