import React from 'react';
import '../styles/quack.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Row, Col, Container} from 'react-bootstrap';

const Quack = () => {
    return (
        <div className="quackWrapper">
            <Container>
                    <a href="https://sergey-khl.github.io/" rel='noopener noreferrer' className="btn btn-dark mt-5" role="button"><i class="bi bi-arrow-left"></i></a>
                    <Row>
                        
                        <h1 class="display-1 my-3">Lab 1: duck init</h1>
                    </Row>
                    <Row>
                        <h2 class="display-5 my-3">What I implemented</h2>
                        <hr/>
                        <Col>
                            <h4>Connected laptop virtual machine to duckiebot and got it to move 2 meters in a straight line.</h4>
                            <video width="750" height="60%" controls>
                                <source src="2m.mp4" type="video/mp4"/>
                            </video>
                        </Col>
                        <Col>
                            <h4>Grew a unibrow</h4>
                            <img width="750" height="60%" src="DUCK.jpg" class="img-fluid" alt="Responsive image"></img>
                        </Col>
                        <Col>
                            <h4>Follows road lines in duckietown.</h4>
                            <video width="750" height="60%" controls>
                                <source src="line_demo.mp4" type="video/mp4"/>
                            </video>
                        </Col>
                        <Col>
                            <h4>ran docker image in duck</h4>
                            <img src="duck_hello.png" class="img-fluid" alt="Responsive image"></img>
                        </Col>
                    </Row>
                    <Row>
                        <h2 class="display-5 my-3">What I learnt</h2>
                        <hr/>
                        <h4>Robots are very time consuming. Also got more familiar with docker.</h4>
                    </Row>
                    <Row>
                        <h2 class="display-5 my-3">Challenges</h2>
                        <hr/>
                        <Col>
                            <h4>Could not get the color detector to work. Many had problems with this so it was made non mandatory.</h4>
                            <img width="750" height="60%" src="color_detect.png" class="img-fluid" alt="Responsive image"></img>
                        </Col>
                        <Col>
                            <h4>
                                My dashboard had a weird bug where it would redirect me to a "website under construction" page.
                                To fix I reflashed the SD card and it started working.
                            </h4>
                        </Col>
                    </Row>
            </Container>
        </div>
    );
};

export default Quack;