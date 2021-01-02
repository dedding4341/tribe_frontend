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
  const [famMembers, setFamMembers] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(function checkLoggedIn() {
    const token = getCookie("x-access-token");

    async function getUserInfo() {
      try {
        const res = await fetch(`${BASE_URL}/get-user`, {
          method: 'GET',
          headers: {
            "x-access-token": token
          },
          credentials: "include"
        });
        const resData = await res.json()
        setUser(resData.user);

        const famRes = await fetch(`${BASE_URL}/get-family-info`, {
          method: 'GET',
          headers: {
            "x-access-token": token
          },
          credentials: "include"
        });
        const famResData = await famRes.json();
        setFamily(famResData.family);

        const famMembRes = await fetch(`${BASE_URL}/family`, {
          method: 'GET',
          headers: {
            "x-access-token": token
          },
          credentials: "include"
        });
        const famMembResData = await famMembRes.json();
        setFamMembers(famMembResData.users);
        setLoading(false);
      } catch (err) {
        alert("You have been signed out, please login again.")
      }
    }

    if (token && !user) {
      getUserInfo();
    }

    return function cleanUp() {
      setLoading(true);
    }
  }, []);

  function updateUserCntxt(data: any) {
    setUser(data);
  }

  const providerValue = {
    user,
    updateUserCntxt,
    family,
    famMembers,
    loading
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
