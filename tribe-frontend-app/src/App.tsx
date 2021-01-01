import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { getCookie } from './helpers';
import { UserContext } from './appContext';
import { BASE_URL } from './config';

function App() {
  const [user, setUser] = useState<any>();
  const [family, setFamily] = useState<any>();

  useEffect(function checkLoggedIn() {
    const token = getCookie("x-access-token");

    async function getUser() {
      const res = await fetch(`${BASE_URL}/get-user`, {
        method: 'GET',
        headers: {
          "x-access-token": token
        },
        credentials: "include"
      });
      const resData = await res.json()
      setUser(resData.user.attribute_values);
      console.log("Obtained users!", resData.user.attribute_values);
    }

    async function getFamily() {
      const res = await fetch(`${BASE_URL}/family`, {
        method: 'GET',
        headers: {
          "x-access-token": token
        },
        credentials: "include"
      });
      const resData = await res.json();
      setFamily(resData.users);
    }

    if (token && !user) {
      getUser();
      getFamily();
    }
  }, []);

  function updateUserCntxt(data: any) {
    setUser(data);
  }

  const providerValue = {
    user,
    updateUserCntxt,
    family
  };

  return (
    <UserContext.Provider value={providerValue}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/tribe/*">
              <PrivateRoutes />
            </Route>
            <PublicRoutes />
          </Switch>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
