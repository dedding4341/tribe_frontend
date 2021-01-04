import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardLeft from '../DashboardLeft';
import DashCalender from '../DashCalender';
import DashOverview from '../DashOverview';
import DashStore from '../DashStore';
import DashTodo from '../DashTodo';
import { useSelector} from 'react-redux';
import './PrivateRoutes.css';

/**
 * Routing logic for private components
 */
function PrivateRoutes() {
  const user = useSelector((st: any) => st.user);
  const isLoggedIn = useSelector((st: any) => st.isLoggedIn);

  // protect these privateroutes by adding a redirect to the login path.
  if (!isLoggedIn && !user.user_id) {
    return <Redirect to="/users/auth"/>
  } 

  return (
    <Container fluid className="PrivateRoutes">
      <Row>
        <Col className="text-center mt-5 mb-5">
          <h1>tribe</h1>
        </Col>
      </Row>
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
    </Container>
  )
}

export default PrivateRoutes;