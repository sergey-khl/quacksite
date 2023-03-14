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
    <div className="quackWrapper">
      <Container fluid>
        <h1>CMPUT 412: Exercise 4 - Don’t Crash! Tailing Behaviour</h1>
        <h4>Justin Valentine (jvalenti), Sergey Khlynovskiy (khlynovs)</h4>
        <div className='sec'>
          <h3><b>Introduction</b></h3>
          <p>The goal of this lab exercise is to implement an autonomous tailing behavior on a Duckiebot. 
            The task requires the implementation of a strategy to follow another Duckiebot at a 
            safe driving distance, while still adhering to the rules of the road. 
            This report will describe the implemented strategy for maintaining a safe driving distance 
            and avoiding collisions, as well as discuss the results of the implementation. Finally, a video 
            demonstration will be provided to showcase the successful execution of the implemented strategy.</p>
        </div>
        <div className='sec'>
          <h3><b>Implementation</b></h3>
          <p>To maintain a safe distance between two duckiebots, a PID controller is used. 
            This controller adjusts the linear velocity of the vehicle based on the distance from the 
            car in front (measured as z-value), which helps the vehicle to avoid collisions. </p>
        </div>
        <div className='sec'>
          <h3><b>Results</b></h3>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">How well did your implemented strategy work? 
            <p>
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">Was it reliable? 
              <p>
             </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">In what situations did it perform poorly?
            <p>

            </p>
            </ListGroup.Item>
          </ListGroup>
          <Row xs={1} md={2} className="min">
            <ReportVid vid={"KdaK9Fd5T_E"} w={"100%"} h={"90%"}>DELIVERABLE: trailing other duckiebots and following english driver rules if no bots are seen.</ReportVid>
          </Row>
        </div>
        <div className='sec' style={ { maxWidth: "100%", wordBreak: 'break-all' } }>
          <h3><b>References</b></h3>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">
              <a href={"https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html"}>https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html</a> undistorting fish eye image
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://github.com/duckietown/lib-dt-apriltags/blob/master/test/test.py"}>https://github.com/duckietown/lib-dt-apriltags/blob/master/test/test.py</a> duckietown apriltags which were used for detections
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://pyimagesearch.com/2020/11/02/apriltag-with-python/"}>https://pyimagesearch.com/2020/11/02/apriltag-with-python/</a> used apriltag labeling code
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://github.com/ros/geometry2/blob/noetic-devel/tf2_ros/src/tf2_ros/buffer.py"}>https://github.com/ros/geometry2/blob/noetic-devel/tf2_ros/src/tf2_ros/buffer.py</a> used to do a bunch of frame to frame transformations
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://docs.duckietown.org/daffy/duckietown-classical-robotics/out/cra_perception.html"}>https://docs.duckietown.org/daffy/duckietown-classical-robotics/out/cra_perception.html</a> got yaml load code
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://github.com/wagonhelm/cmput412_exercise3"}>https://github.com/wagonhelm/cmput412_exercise3</a> Used this starting template and used dead reckoning code.
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://github.com/duckietown/dt-core/blob/6d8e99a5849737f86cab72b04fd2b449528226be/packages/led_emitter/src/led_emitter_node.py#L254"}>https://github.com/duckietown/dt-core/blob/6d8e99a5849737f86cab72b04fd2b449528226be/packages/led_emitter/src/led_emitter_node.py#L254</a> used duckietown led emitter demo
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://github.com/anna-ssi/mobile-robotics/blob/50d0b24eab13eb32d92fa83273a05564ca4dd8ef/assignment2/src/led_node.py"}>https://github.com/anna-ssi/mobile-robotics/blob/50d0b24eab13eb32d92fa83273a05564ca4dd8ef/assignment2/src/led_node.py</a> used our last labs led emitter code and we used this as a reference for that
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://docs.ros.org/en/jade/api/tf/html/python/transformations.html"}>https://docs.ros.org/en/jade/api/tf/html/python/transformations.html</a> Used for transformations
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://github.com/ros/geometry2/tree/noetic-devel/tf2_ros/src/tf2_ros"}>https://github.com/ros/geometry2/tree/noetic-devel/tf2_ros/src/tf2_ros</a> used to broadcast transforms
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://medium.com/@mrhwick/simple-lane-detection-with-opencv-bfeb6ae54ec"}>https://medium.com/@mrhwick/simple-lane-detection-with-opencv-bfeb6ae54ec</a> Used for my first attempt at lane following
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://youtu.be/rVBVqVmHtfc"}>https://youtu.be/rVBVqVmHtfc</a> Used for my first attempt at lane following
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Container>
    </div>
  );
};

export default Report4;