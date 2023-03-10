import React from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../app/features/auth/authSlice";
import { PrimaryButton } from "../../components";
import { Container, Form, Row, Col } from "react-bootstrap"; 
import { images } from "../../data"
import "./Login.scss"

export default function Login() {
  const dispatch = useDispatch();
  const doLogin = () => {
    let token = true;
    dispatch(setAuthToken(token));
    localStorage.setItem("user", token);
  };
  return (
    <div className="d-lg-flex half">
      <div className="bg order-1 order-md-2" style={{backgroundImage:`url(${images.loginImage})`}}></div>
      <div className="contents order-2 order-md-1">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md="7">
              <h3>Payment Integrity Solution</h3>
              <p className="text-muted py-2">Leaders in Healthcare Payment Integrity, Detection & Provider Communication</p>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <div className="d-grid gap-2">
                <PrimaryButton onClick={doLogin} title="Sign In" varient="primary" />
                </div>
                
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
