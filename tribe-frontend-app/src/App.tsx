import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
