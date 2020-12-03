import React from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/tribe/:famId/*">
            <PrivateRoutes />
          </Route>
          <PublicRoutes />
          <Route path='/not-found'>
            <div>Not found page</div>
            </Route>
          <Redirect from='*' to='/not=found'/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
