import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import Layout from './components/Layout';
import Results from './pages/Results';
import ItemDetails from './pages/ItemDetails';
import NotFound from './pages/NotFound';
import registerServiceWorker from './registerServiceWorker';
import 'whatwg-fetch';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
          <Layout exact path="/" />
          <Layout exact path="/items" component={Results} />
          <Layout exact path="/items/:id" component={ItemDetails} />
          <Layout path='/404' component={NotFound} />
          <Redirect from='*' to='/404' />
        </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
