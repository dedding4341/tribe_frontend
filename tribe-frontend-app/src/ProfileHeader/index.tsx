import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import './ProfileHeader.css';
import * as mock from '../mock';

function ProfileHeader() {
  return (
    <div className="ProfileHeader container">
      <Row className="d-flex align-items-center">
        <Col sm={10} md={6} lg={4}>
          <div className="ProfileHeader-img-wrapper">
            <Image className="ProfileHeader-img" src={mock.currentUser.user_avatar} alt="dp img" />
          </div>
        </Col>
        <Col sm={3} md={6} lg={6} className="ProfileHeader-details text-center">
          <Row>
            <Col sm={12} md={12} className="ProfileHeader-name">
              {`${mock.currentUser.first_name} ${mock.currentUser.last_name}`}
            </Col>
            <Col>
              @ {mock.currentFam.family_name}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileHeader;