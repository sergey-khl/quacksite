import React from 'react';
//import '../styles/report3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import { Row, Col, Container, Image } from 'react-bootstrap';


const ReportVid = (props) => {
  return (
    <Col className="my-5">
      <iframe
        width={props.w}
        height={props.h}
        src={`https://www.youtube.com/embed/${props.vid}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
      <p>{props.children}</p>
    </Col>
  );
};

export default ReportVid;