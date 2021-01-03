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
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(function checkLoggedIn() {
    const token = getCookie("x-access-token");

    async function getUserInfo() {
      try {
        console.log("retrieving info in App component.")
        if (!user) {
          console.log("user in App component.")
          const res = await fetch(`${BASE_URL}/get-user`, {
            method: 'GET',
            headers: {
              "x-access-token": token
            },
            credentials: "include"
          });
          const resData = await res.json()
          setUser(resData.user);
        }
        if (!family) {
          console.log("family info in App component.")
          const famRes = await fetch(`${BASE_URL}/get-family-info`, {
            method: 'GET',
            headers: {
              "x-access-token": token
            },
            credentials: "include"
          });
          const famResData = await famRes.json();
          setFamily(famResData.family);
        }
        if (!famMembers) {
          console.log("family members in App component.")
          const famMembRes = await fetch(`${BASE_URL}/family`, {
            method: 'GET',
            headers: {
              "x-access-token": token
            },
            credentials: "include"
          });
          const famMembResData = await famMembRes.json();
          setFamMembers(famMembResData.users);
        }
        setLoading(false);
        loginUser();
      } catch (err) {
        alert("You have been signed out, please login again.")
      }
    }

    if (token) {
      if (!loading) setLoading(true);
      getUserInfo();
    }

    return function cleanUp() {
      setLoading(true);
    }
  }, [isLoggedIn]);

  function updateUserCntxt(data: any) {
    setUser(data);
  }

  function reset() {
    setUser(undefined);
    setFamily(undefined);
    setFamMembers(undefined);
    setLoading(true);
    logoutUser();
  }

  function loginUser() {
    setIsLoggedIn(true);
  }

  function logoutUser() {
    setIsLoggedIn(false);
  }

  const providerValue = {
    user,
    updateUserCntxt,
    family,
    famMembers,
    loading,
    reset,
    loginUser,
    logoutUser
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
