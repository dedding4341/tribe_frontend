import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import "./VerifyPage.css";

function VerifyPage() {
  const { verifyCode } = useParams();
  const [valid, setValid] = useState(false);

  useEffect(function handleVerify() {
    async function verify() {
      try {
        const res = await fetch(`${BASE_URL}/verify-user/${verifyCode}`)
        if (res.status === 200) {
          setValid(true);
        }
      } catch (err) {
        setValid(false);
      }
    }
    verify();
  }, [])

  return (
    <Container className="VerifyPage">
      <Row>
        {
          valid ?
            <Col md={8} className="VerifyPage-header">
              <h1>Your account has been verified!</h1>
              <h2>Now you're ready to Tribe ٩(˘◡˘)۶</h2>
              <p>verification code: {verifyCode}</p>
            </Col> :
            <Col md={12} className="VerifyPage-header">
              <h1>Uh-oh!<br />
                  This verification code does not seem to be valid.</h1>
              <h2>Please request another verification code and try again.</h2>
              <p>verification code: {verifyCode}</p>
            </Col>
        }
      </Row>
    </Container>
  );
}

export default VerifyPage;