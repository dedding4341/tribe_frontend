import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import './ProfileHeader.css';

function ProfileHeader() {
  return (
    <div className="ProfileHeader container">
      <Row className="d-flex align-items-center">
        <Col sm={6} md={6} lg={4}>
          <div className="ProfileHeader-img-wrapper">
            <Image className="ProfileHeader-img" src="https://pbs.twimg.com/media/ELJ83bNWkAAGZOk.jpg" alt="dp img"/>
          </div>
        </Col>
        <Col sm={6} md={6} lg={6} className="ProfileHeader-details text-left">
          <Row>
            <Col md={7} className="ProfileHeader-name">
              Diana Liang
            </Col>
          </Row>
          <Row>
            <Col md={5} className="ProfileHeader-fam-tag">
              @tribe_fam
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileHeader;