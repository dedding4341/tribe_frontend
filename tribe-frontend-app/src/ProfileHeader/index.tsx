import React, { useContext } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { UserContext } from '../appContext';
import {DEFAULT_PFP} from '../config';
import './ProfileHeader.css';

function ProfileHeader() {
  const { user, family } = useContext(UserContext)

  return (
    <div className="ProfileHeader container">
      { family && user &&
      <Row className="d-flex align-items-center">
        <Col sm={10} md={6} lg={4}>
          <div className="ProfileHeader-img-wrapper">
            <Image className="ProfileHeader-img" src={user.user_avatar ? user.user_avatar : DEFAULT_PFP} alt="dp img" />
          </div>
        </Col>
        <Col sm={3} md={6} lg={6} className="ProfileHeader-details text-center">
          <Row>
            <Col sm={12} md={12} className="ProfileHeader-name">
              {`${user.first_name} ${user.last_name}`}
            </Col>
            <Col>
              @ {family.family_name}
            </Col>
          </Row>
        </Col>
      </Row>
      }
    </div>
  );
}

export default ProfileHeader;