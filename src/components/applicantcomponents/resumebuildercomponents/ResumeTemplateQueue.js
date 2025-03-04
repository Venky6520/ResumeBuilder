import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./ResumeTemplateQueue.css"; // Add a CSS file for styling

const ResumeTemplateQueue = () => {
  const templates = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnyBdKsAh9GP8-bLeswC54ANlvsyim8keXvQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-9KF8M_zb5dRpSxyGVWTHZjK-qZrxsi64gA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnyBdKsAh9GP8-bLeswC54ANlvsyim8keXvQ&s"
  ];

  return (
    <Container className="mt-4 text-center">
      <Row className="justify-content-center">
        {templates.map((image, index) => (
          <Col key={index} md={4} className="d-flex justify-content-center">
            <div className="template-card">
              <img src={image} alt={`Resume Template ${index}`} className="template-img" />
              <div className="overlay">
                <Button className="use-template-btn">Use this template</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ResumeTemplateQueue;
