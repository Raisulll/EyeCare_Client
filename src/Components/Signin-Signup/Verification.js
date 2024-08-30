import React from "react";
import { Container, Alert } from "react-bootstrap";

const VerificationPending = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Alert variant="info" className="text-center w-100">
        <Alert.Heading>Verification Pending</Alert.Heading>
        <p>
          Thank you for signing up! Your account verification is pending. You
          will be notified once your account is verified.
        </p>
      </Alert>
    </Container>
  );
};

export default VerificationPending;
