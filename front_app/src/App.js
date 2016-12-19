import React, {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router';
import RoutesWrapper from './routeComponents/RoutesWrapper.component';
import IndexRoute from './routeComponents/IndexRoute.component';
import EditFormRoute from './routeComponents/EditFormRoute.component';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={RoutesWrapper}>
          <Route path='/' component={IndexRoute} />
          <Route path='notice-details' component={EditFormRoute} />
        </Route>
      </Router>
    );
  }
}

export default App;
