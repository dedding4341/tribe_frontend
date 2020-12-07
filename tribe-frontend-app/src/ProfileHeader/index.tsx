import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import './ProfileHeader.css';

const currentUser = { first_name: "Diana", last_name: "Liang", uid: 231, user_avatar: 'https://pbs.twimg.com/media/Emvpv3DW8AEVEpm.jpg', family_manager: true };

function ProfileHeader() {
  return (
    <div className="ProfileHeader container">
      <Row className="d-flex align-items-center">
        <Col sm={10} md={6} lg={4}>
          <div className="ProfileHeader-img-wrapper">
            <Image className="ProfileHeader-img" src={currentUser.user_avatar} alt="dp img"/>
          </div>
        </Col>
        <Col sm={3} md={6} lg={6} className="ProfileHeader-details text-left">
          <Row>
            <Col sm={12} md={7} className="ProfileHeader-name">
              {`${currentUser.first_name} ${currentUser.last_name}`}
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={5} className="ProfileHeader-fam-tag">
              @tribe_fam
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileHeader;