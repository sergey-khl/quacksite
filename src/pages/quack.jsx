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
        <Row className='mt-5'>
          <Col xs={{ span: 2, offset: 1 }}>
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
          <Col xs={{ span: 2, offset: 1 }}>
          <Card>  
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/DUCK.jpg'} />  
              <Card.Body>  
                <Card.Title>Report 2</Card.Title>  
                <Card.Text>  
                Started programming the duckiebot with ros!
                </Card.Text>  
                <Button variant="primary"><Link to="/2">To report!</Link></Button>  
              </Card.Body>  
            </Card>  
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Quack;