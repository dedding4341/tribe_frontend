import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { getFamilyFromAPI, getFamilyMembersFromAPI, getFamilyTasksFromAPI, getUserFromAPI } from '../actionCreators';
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

  return (
    <>
      <NavBar />
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