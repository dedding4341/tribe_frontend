import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import DashboardLeft from '../DashboardLeft';
import DashCalender from '../DashCalender';
import DashOverview from '../DashOverview';
import DashStore from '../DashStore';
import DashTodo from '../DashTodo';
import './PrivateRoutes.css';

/**
 * Routing logic for private components
 */
function PrivateRoutes() {
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
            <Route exact path="/tribe/:famId/overview">
              <DashOverview />
            </Route>
            <Route exact path="/tribe/:famId/calender">
              <DashCalender />
            </Route>
            <Route exact path="/tribe/:famId/todo">
              <DashTodo />
            </Route>
            <Route exact path="/tribe/:famId/store">
              <DashStore />
            </Route>
          </Col>
        </Switch>
      </Row>
    </Container>
  )
}

export default PrivateRoutes;