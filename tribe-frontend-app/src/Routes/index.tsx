import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../Landing';
import Login from '../Login';

/**
 * Routing logic for components
 */
function Routes() {
  return (
    <Switch>
      <Route exact path="/users/auth">
        <Login/>
      </Route>
      <Route exact path="/test-component">
        <div>Test your components in this routes</div>
      </Route>
      <Route exact path="/">
        <Landing/>
      </Route>
      <Route>
        <div>404! Seems like the page you are accessing doesn't exist yet.</div>
      </Route>
    </Switch>
  )
}

export default Routes;