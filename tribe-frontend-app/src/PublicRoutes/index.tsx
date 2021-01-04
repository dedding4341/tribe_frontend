import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
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
  const isLoggedIn = useSelector((st: any) => st.isLoggedIn);
  return (
    <>
      <NavBar />
      {isLoggedIn && <Alert variant="primary" className="PublicRoutes-notice">It seems like you're already signed in! Go to <span className="PublicRoute-notice-link">Tribe</span>.
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