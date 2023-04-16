import React from 'react';
import '../styles/report4.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import ReportImg from '../components/reportImg'
import ReportVid from '../components/reportVid'


const Report4 = () => {
  return (
    <div className="quackWrapper4">
      <Container fluid>
        <h1>CMPUT 412: Exercise 4 - Don’t Crash! Tailing Behaviour</h1>
        <h4>Justin Valentine (jvalenti), Sergey Khlynovskiy (khlynovs)</h4>
        <div className='sec4'>
          <h3><b>Introduction</b></h3>
          <p>The goal of this lab exercise is to implement an autonomous tailing behavior on a Duckiebot. The task requires the implementation of a strategy to follow another Duckiebot at a safe driving distance, while still adhering to the rules of the road. This report will describe the implemented strategy for maintaining a safe driving distance and avoiding collisions, as well as discuss the results of the implementation. Finally, a video demonstration will be provided to showcase the successful execution of the implemented strategy.</p>
        </div>
        <div className='sec4'>
          <h3><b>Implementation</b></h3>
          <h4>Strategy</h4>
          <p>Our strategy for this lab involves implementing four key features: Lane following, Stop line detection, Duckiebot marker detection, and PID controllers. These features work together to enable our system to complete the task at hand. The system works as follows:</p>
          <p>1. The Duckiebot drives on the road following the lanes until it either detects a stop line or a Duckiebot marker is detected within some critical distance, in which case the Duckiebot will remain stopped until the marker is outside of that critical zone.</p>
          <p>2. When the Duckiebot is stopped at a stop line, it monitors the Duckiebot marker located in front of it. If the marker takes a turn, the stopped Duckiebot will detect a change in the x displacement of the marker. Once this displacement is detected, the stopped Duckiebot will trigger a hard-coded turning routine in the correct direction in order to follow the other Duckiebot.</p>
          <h4>Strategy in Action</h4>
          <p>To maintain a safe distance between two Duckiebot’s, we initially experimented with a PID controller to adjust the linear velocity of the Duckiebot based on the distance from the car in front, measured from the z-value of the marker detector. However, since it was assumed that the car in front was following the laws of the road, relying solely on the PID controller for this purpose was deemed less reliable than just using lane following. We implemented a z-value threshold to determine when the Duckiebot in front is within a certain stopping range, at which point the following Duckiebot comes to a stop. However, this method has its limitations, such as assuming that the leader Duckiebot’s speed is constant and matches that of the following Duckiebot. </p>
          <p>The lane following system uses a PID controller to control the angular velocities of the Duckiebot. For this we used Justin Francis' controller from the previous lab. Further explanation is beyond the scope of this lab.  </p>
          <p>To detect turns, we use the x-value position of the Duckiebot's marker. If it exceeds a certain threshold, a hard-coded turning routine is initiated. However, this approach is not always reliable, as the scale of the x-value can vary depending on the distance between the Duckiebot’s at the time of measurement. </p>
          <p>To find the red line we check for HSV values between (0, 120, 120) and (15, 255, 255). This larger range for saturation and value increases robustness in case some leds are turned on and distort the camera view. The red line is found similarly to how the yellow line is in the template.</p>
        </div>
        <div className='sec4'>
          <h3><b>Results</b></h3>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">How well did your implemented strategy work? 
            <p>It worked quite well, especially when the leading bot is sufficiently slow. It is quite good at finding the red line and stopping but finding the dots on the back of the leading bot is a much harder task so it does not perform as well.</p>
            </ListGroup.Item>
            <ListGroup.Item as="li">Was it reliable? 
              <p>
              Reliability is a key concern when implementing self driving. In our solution while some elements are dependable, others are not. Firstly, the Duckiebot’s themselves are not very reliable, which necessitates switching between many different Duckiebot’s. This comes at the expense of reliability, as there are several bot-specific parameters implemented in our solution, such as the hard-coded turning routine and the HSV values used for detecting road lines. Consequently, some of our final values reflect an average across many bots, rather than more preferable bot-specific values.
             </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">In what situations did it perform poorly?
            <p>
            Despite its overall success, our solution encountered some challenges that resulted in poor performance in certain situations. One such challenge was that the LED lights on the Duckiebot sometimes obstructed the camera view, making it harder to detect road lines accurately. Additionally, the camera had a limited range when trailing the Duckiebot, so if the leader was too far away and turned, our solution might not detect the turn in time to follow. Another issue we encountered was the camera's publishing rate, which could cause problems when the Duckiebot stopped behind the leader at an intersection. Depending on how close it was to the bot in front of it, the x-displacement of the detector could vary substantially. These factors combined sometimes led to erratic behavior and made the system less reliable than desired.            </p>
            </ListGroup.Item>
          </ListGroup>
          <Row xs={1} md={2} className="min">
            <ReportVid vid={"hy1kpFwfHWY"} w={"100%"} h={"90%"}>DELIVERABLE: trailing other duckiebots and following english driver rules if no bots are seen.</ReportVid>
          </Row>
        </div>
        <div className='sec4' style={ { maxWidth: "100%", wordBreak: 'break-all' } }>
          <h3><b>References</b></h3>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">
              <a href={"https://github.com/duckietown/dt-core/blob/6d8e99a5849737f86cab72b04fd2b449528226be/packages/led_emitter/src/led_emitter_node.py#L254"}>https://github.com/duckietown/dt-core/blob/6d8e99a5849737f86cab72b04fd2b449528226be/packages/led_emitter/src/led_emitter_node.py#L254</a> used duckietown led emitter demo
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://github.com/anna-ssi/mobile-robotics/blob/50d0b24eab13eb32d92fa83273a05564ca4dd8ef/assignment2/src/led_node.py"}>https://github.com/anna-ssi/mobile-robotics/blob/50d0b24eab13eb32d92fa83273a05564ca4dd8ef/assignment2/src/led_node.py</a> used our last labs led emitter code and we used this as a reference for that
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://eclass.srv.ualberta.ca/course/view.php?id=85053"}>https://eclass.srv.ualberta.ca/course/view.php?id=85053</a> Used Justin's lane following code from eclass
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://github.com/XZPshaw/CMPUT412503_exercise4"}>https://github.com/XZPshaw/CMPUT412503_exercise4</a> used template from here and used distance and detection code
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Container>
    </div>
  );
};

export default Report4;