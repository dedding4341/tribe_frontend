import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import './ProfileHeader.css';

function ProfileHeader() {
  return (
    <div className="ProfileHeader">
      <Row>
        <Col xs={6} md={6}>
          <Image className="ProfileHeader-img" src="https://pbs.twimg.com/media/ELJ83bNWkAAGZOk.jpg" alt="dp img" roundedCircle />
        </Col>
        <Col xs={6} md={6}>
          <Row>
            Diana
            </Row>
          <Row className="ProfileHeader-fam-tag">
            @tribe_fam
            </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileHeader;