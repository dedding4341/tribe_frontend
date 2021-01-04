import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Landing from '../Landing';
import Login from '../Login';
import NavBar from '../NavBar';
import UserSetup from '../UserSetup';
import VerifyPage from '../VerifyPage';
import "./PublicRoutes.css";

/**
 * Routing logic for components
 */
function PublicRoutes() {
  const [show, setShow ] = useState(false);
  const isLoggedIn = useSelector((st: any) => st.isLoggedIn);
  const loading = useSelector((st: any) => st.loading);
  const history = useHistory();

  useEffect(function () {
    console.log("mounting the public routes...")
    if (isLoggedIn) {
      setShow(true);
    }
  }, [loading]);

  function handleGoToOverview() {
    history.push('/tribe/overview')
  }

  return (
    <>
      <NavBar />
      {show && 
      <Alert variant="primary" className="PublicRoutes-notice" onClose={() => setShow(false)} dismissible>
        It seems like you're already signed in! Go to <span onClick={handleGoToOverview} className="PublicRoute-notice-link">Tribe</span>.
      </Alert>
      }
      <Switch>
        <Route exact path="/users/welcome">
          <UserSetup />
        </Route>
        <Route exact path="/users/auth">
          <Login />
        </Route>
        <Route exact path="/verify-user/:verifyCode">
          <VerifyPage />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path='/not-found'>
          <div>Not found page</div>
        </Route>
        <Redirect from='*' to='/not-found' />
      </Switch>
    </>
  )
}

export default PublicRoutes;