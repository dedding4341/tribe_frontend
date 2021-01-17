import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import DashboardLeft from '../DashboardLeft';
import DashCalender from '../DashCalender';
import DashOverview from '../DashOverview';
import DashStore from '../DashStore';
import DashTodo from '../DashTodo';
import TradesTab from '../TradesTab';
import { useDispatch, useSelector } from 'react-redux';
import './PrivateRoutes.css';
import { getCookie } from '../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrumstickBite } from '@fortawesome/free-solid-svg-icons';
import Preloader from '../Preloader';
import NotFound from '../NotFound';
import { getFamilyFromAPI, getFamilyMembersFromAPI, getFamilyTasksFromAPI, getUserFromAPI, loginByToken } from '../actionCreators';


/**
 * Routing logic for private components
 */
function PrivateRoutes() {
  const token = getCookie("x-access-token");
  
  const isLoggedIn = useSelector((st: any) => st.isLoggedIn);
  const loading = useSelector((st: any) => st.loading);
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
          dispatch(getFamilyTasksFromAPI());
        }
        dispatch(loginByToken());
      } catch (err) {
        alert("Session token has expired, please login again");
        history.push("/users/auth");
      }
    } 
    // else if (token && isLoggedIn && user.user_id) {
    //   dispatch(stopLoading());
    // }
  }, [isLoggedIn]);

  // protect these privateroutes by adding a redirect to the login path.
  if (!isLoggedIn && !token) {
    return <Redirect to="/users/auth" />
  }

  return (
    <Container fluid className="PrivateRoutes">
      <Row>
        <Col className="text-center mt-5 mb-5">
          <h1>tribe</h1>
        </Col>
      </Row>
      { loading ? <Preloader /> :
        <Row>
          <Col sm={3} md={3} lg={4}>
            <DashboardLeft />
          </Col>
          <Col sm={9} md={9} lg={8}>
            <Switch>
              <Route exact path="/tribe/overview">
                <DashOverview showHistory={false} />
              </Route>
              <Route exact path="/tribe/calender">
                <DashCalender />
              </Route>
              <Route exact path="/tribe/todo">
                <DashTodo />
              </Route>
              <Route exact path="/tribe/store">
                <DashStore />
              </Route>
              <Route exact path="/tribe/trades">
                <TradesTab/>
              </Route>
              <Route exact path="/tribe/completed">
                <DashOverview showHistory={true} />
              </Route>
              <Redirect to="/not-found"/>
            </Switch>
          </Col>
        </Row>
      }
    </Container>
  )
}

export default PrivateRoutes;