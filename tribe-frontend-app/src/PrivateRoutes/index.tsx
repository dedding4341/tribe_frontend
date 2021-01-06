import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardLeft from '../DashboardLeft';
import DashCalender from '../DashCalender';
import DashOverview from '../DashOverview';
import DashStore from '../DashStore';
import DashTodo from '../DashTodo';
import { useSelector } from 'react-redux';
import './PrivateRoutes.css';
import { getCookie } from '../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrumstickBite } from '@fortawesome/free-solid-svg-icons';


/**
 * Routing logic for private components
 */
function PrivateRoutes() {
  const token = getCookie("x-access-token");
  const isLoggedIn = useSelector((st: any) => st.isLoggedIn);
  const loading = useSelector((st: any) => st.loading);

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
      { loading ? <div className="spinner-wrapper"><FontAwesomeIcon icon={faDrumstickBite} className="spinner" size="5x" /></div>:
        <Row className="">
          <Col sm={3} md={3} lg={4}>
            <DashboardLeft />
          </Col>
          <Switch>
            <Col sm={9} md={9} lg={8}>
              <Route exact path="/tribe/overview">
                <DashOverview />
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
            </Col>
          </Switch>
        </Row>
      }
    </Container>
  )
}

export default PrivateRoutes;