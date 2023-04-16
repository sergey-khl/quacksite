import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/quack.css"
import { Row, Col, Container, Card , Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Quack = () => {
  return (
    <div>
      <Container>
        <div className='d-flex justify-content-center pt-5'>
            <a href={"https://github.com/sergey-khl/412ducks"} target='_blank' rel='noopener noreferrer' className="btn btn-outline-primary btn-lg" role="button">
                Github&nbsp;
                <i class="bi bi-github"></i>
            </a>
        </div>  
        <Row className='pt-5'>
          <Col md={{ span: 2, offset: 0 }}>
            <Card>  
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/DUCK.jpg'} />  
              <Card.Body>  
                <Card.Title>Report 1</Card.Title>  
                <Card.Text>  
                Connected robot to laptop through ssh. Saw what the robot saw and ran demos to test setup.
                </Card.Text>  
                <Button variant="primary"><Link to="/1">To report!</Link></Button>  
              </Card.Body>  
            </Card>  
          </Col>
          <Col md={{ span: 2, offset: 0 }}>
          <Card>  
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/lab2img/duck2.jpg'} />  
              <Card.Body>  
                <Card.Title>Report 2</Card.Title>  
                <Card.Text>  
                Started programming the duckiebot with ros!
                </Card.Text>  
                <div>
                        <a href={process.env.PUBLIC_URL + '/report2.pdf'} target='_blank' rel='noopener noreferrer' className="btn btn-outline-primary btn-lg" role="button">
                            To Report!&nbsp;
                            <i className="bi bi-filetype-pdf"></i>
                        </a>
                    </div>   
              </Card.Body>  
            </Card>  
          </Col>
          <Col md={{ span: 2, offset: 0 }}>
          <Card>  
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/lab3img/duck.jpg'} />  
              <Card.Body>  
                <Card.Title>Report 3</Card.Title>  
                <Card.Text>  
                Localization with apriltags, visualization in rviz and lane following
                </Card.Text>  
                <Button variant="primary"><Link to="/3">To report!</Link></Button>  
              </Card.Body>  
            </Card>  
          </Col>
          <Col md={{ span: 2, offset: 0 }}>
          <Card>  
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/lab4img/duck.jpg'} />  
              <Card.Body>  
                <Card.Title>Report 4</Card.Title>  
                <Card.Text>  
                  Following other duckiebots and autonomous driving!
                </Card.Text>  
                <Button variant="primary"><Link to="/4">To report!</Link></Button>  
              </Card.Body>  
            </Card>  
          </Col>
          <Col md={{ span: 2, offset: 0 }}>
          <Card>  
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/lab5img/duck.jpg'} />  
              <Card.Body>  
                <Card.Title>Report 5</Card.Title>  
                <Card.Text>  
                  Machine learning for duckiebots
                </Card.Text>  
                <Button variant="primary"><Link to="/5">To report!</Link></Button>  
              </Card.Body>  
            </Card>  
          </Col>
          <Col md={{ span: 2, offset: 0 }}>
          <Card>  
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/labfinalimg/duck.jpg'} />  
              <Card.Body>  
                <Card.Title>Report Finale</Card.Title>  
                <Card.Text>  
                  Don't hit the ducks!
                </Card.Text>  
                <Button variant="primary"><Link to="/final">To report!</Link></Button>  
              </Card.Body>  
            </Card>  
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Quack;