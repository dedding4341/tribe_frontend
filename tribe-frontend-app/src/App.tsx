import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

function App() {
  const [user, setUser] = useState<any>();
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/tribe/*">
            <PrivateRoutes />
          </Route>
          <PublicRoutes handleSetUser={setUser}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
