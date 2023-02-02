import React from 'react';
import '../styles/report1.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Row, Col, Container } from 'react-bootstrap';

const Report2 = () => {
  const quackURL = process.env === 'production' ? "https://sergey-khl.github.io/quacksite" : "http://localhost:3000/";
  return (
    <div className="quackWrapper">
      <Container>
        <a href={quackURL} rel='noopener noreferrer' className="btn btn-dark mt-5" role="button"><i class="bi bi-arrow-left"></i></a>
        <Row>

          <h1 class="display-1 my-3">Lab 2: duck hits the gritty</h1>
        </Row>
        <Row>
          <h2 class="display-5 my-3">What I implemented</h2>
          <hr />
          <Col>
            <h4>subscribed to img information and sent a compressed img to custom topic</h4>
            <img width="750" height="60%" src={process.env.PUBLIC_URL + '/lab2img/custom_image.png'} className="img-fluid" alt="Responsive image"></img>
            <img width="1000" height="60%" src={process.env.PUBLIC_URL + '/lab2img/custom_image_code.png'} className="img-fluid" alt="Responsive image"></img>
          </Col>
        </Row>
        <Row>
          <h2 class="display-5 my-3">What I learnt</h2>
          <hr />
        </Row>
        <Row>
          <h2 class="display-5 my-3">Challenges</h2>
          <hr />
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Report2;