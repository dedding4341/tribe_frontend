import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from './helpers';
import { getFamilyFromAPI, getFamilyMembersFromAPI, getFamilyTasksFromAPI, getUserFromAPI, loginByToken, stopLoading } from './actionCreators';

function App() {
  const isLoggedIn = useSelector((st: any) => st.isLoggedIn);
  const family = useSelector((st: any) => st.family);
  const user = useSelector((st: any) => st.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = getCookie("x-access-token");
    if (token && !isLoggedIn) {
      try {
        if (!user.user_id) {
          dispatch(getUserFromAPI());
        }
        if (!family.family_id) {
          dispatch(getFamilyFromAPI());
          dispatch(getFamilyMembersFromAPI());
          dispatch(getFamilyTasksFromAPI(user.family_id));
        }
        dispatch(loginByToken());
      } catch (err) {
        alert("Session token has expired, please login again");
        history.push("/users/auth");
      }
    } else if (token && isLoggedIn && user.user_id) {
      dispatch(stopLoading());
    }
  }, [isLoggedIn]);

  return (
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
  );
}

export default App;
