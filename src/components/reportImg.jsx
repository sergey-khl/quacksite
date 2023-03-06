import React from 'react';
//import '../styles/report3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import { Row, Col, Container, Image } from 'react-bootstrap';


const ReportImg = (props) => {
  return (
    <Col className="my-5">
      <Image src={props.img} rounded width={props.w} height={props.h}></Image>
      <p>{props.children}</p>
    </Col>
  );
};

export default ReportImg;