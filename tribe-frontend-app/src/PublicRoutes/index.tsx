import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from '../Landing';
import Login from '../Login';
import NavBar from '../NavBar';
import UserSetup from '../UserSetup';
import VerifyPage from '../VerifyPage';

/**
 * Routing logic for components
 */
interface IProps {
  handleSetUser: any;
}

function PublicRoutes({ handleSetUser }: IProps) {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/users/welcome">
          <UserSetup />
        </Route>
        <Route exact path="/users/auth">
          <Login handleSetUser={handleSetUser}/>
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