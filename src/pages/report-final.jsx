import React from 'react';
import '../styles/report-final.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import ReportImg from '../components/reportImg'
import ReportVid from '../components/reportVid'


const ReportFinal = () => {
  return (
    <div className="quackWrapperFinal">
      <Container fluid>
        <h1>CMPUT 412: Exercise 4 - Duck Finale</h1>
        <h4>Justin Valentine (jvalenti), Sergey Khlynovskiy (khlynovs)</h4>
        <div className='secFinal'>
          <h3><b>Traversal with apriltags</b></h3>
          <p>A map was created for each april tag ID to the desired turn. The detection for the april tags was done the same way as in previous exercises and the detection was done at 1hz. 2 main nodes were running the bot, one for movement of the bot and the other for april tag detection. These were done in parallel so that computation for detection would not interfere with lane following. A topic was used between these 2 nodes to communicate the latest turn (or current stage for the next 2 stages). </p>
          <SyntaxHighlighter language="python" style={dark} showLineNumbers={true} wrapLines={true}>
            {`self.tags = {
  "56": "S",
  "48": "R",
  "50": "L",
  "163": "D",
  "38": "P",
}`}
          </SyntaxHighlighter>
          <p>This is the map we used where S, R, L, D, P refers to straight, right, left, duck crossing and parking respectively.</p>
          <p>The turn radius was hardcoded and odometry was used to know when to stop the turn. The battery percentage and the bot we used greatly affected the way the bot performed, so it was difficult to tune these parameters. The images were cropped for detecting a stop line as well as for detecting april tags. This was done as sometimes apriltags way outside of the bots vision would be detected and used for turning. This was also useful because the apriltags in the second stage contained a red stop sign which would sometimes be unintentionally detected as a stop line and the bot would stop. With more time we could have tuned the linear/angular velocities so that the Duckiebot would have stayed in its lane throughout the turn. </p>

        </div>
        <div className='secFinal'>
          <h3><b>Avoid the ducks</b></h3>
            <p>An HSV filter was applied to the blue line to indicate when the bot should stop before the duck crossing intersection. The code for stopping was the same as when stopping in front of a red line, the only difference being that we continue to wait at the stop line if ducks are detected. We initially believed that detecting the blue line would be difficult due to shine, but it seemed to perform quite well. It is interesting to note that the HSV values for the red stop line and detecting the ducks were the same, and these values would not detect the yellow road lines. The big duck and the yellow road lines have very similar color so the bot could sometimes start lane following using the big duck. We avoided this problem by physically placing the big duck outside of the vision of the bot.</p>
            
            <SyntaxHighlighter language="python" style={dark} showLineNumbers={true} wrapLines={true}>
{`STOP_MASK = [(0, 55, 140), (20, 255, 255)] 
# for detecting the red stop line and ducks

CROSS_MASK = [(95, 120, 110), (135, 255, 210)]
# for detecting the blue stop line

ROAD_MASK = [(20, 60, 0), (50, 255, 255)]
# for detecting the yellow road lines
}`}
          </SyntaxHighlighter>
          <p>To avoid the broken bot we used the dot pattern on the back of the bot to stop. After stopping we start lane following on the opposite side of the road for 3 seconds then go back to english drive lane following. This caused major issues for us as the bot would sometimes turn too aggressively into the other lane and lose sight of the yellow road line, so it would stop the lane following. We tried tweaking the p value in the pid, but this did not prove effective and the bot would drive, inconsistently, in a triangular pattern. We also tried changing the speed of the bot and using displacement to know when to change lanes. These all proved fruitless. We initially had an offset for english driving of 200 and would multiply this by -1 to get the bot to go into the other lane, however, we found that setting the offset to -150 worked much more consistently. Though not foolproof as when the bot is low on battery it can still turn sporadically and stop lane following.</p>

        </div>
        <div className='secFinal'>
          <h3><b>Parking</b></h3>
            <p>During this phase, we implemented two distinct methodologies. The first approach relied on odometry data to facilitate a predefined turn into the designated stall. Unfortunately, the dependability of this technique was hindered by suboptimal feedback from the encoders. In contrast, the second approach employed a proportional controller to accurately position the Duckiebot relative to the Apriltags. While the z-distance proportional controller, responsible for regulating linear velocity, proved to be effective, the x-distance proportional controller, designed to control angular velocity, was not optimized due to time limitations. Taking this into account, both strategies exhibited comparable levels of reliability; however, the potential performance ceiling for the second approach is significantly higher. In the demo our bot (running low on battery) struggled to correct itself after completing the first stage. </p>
        </div>
        <div className='secFinal'>
          <h3><b>Contributions</b></h3>
          <h4>Sergey Main Contributions:</h4>
          <p>April tag detection and mapping, blue line detection and duck detection, going around the broken bot and stopping program.</p>
          <h4>Justin Main Contributions:</h4>
          <p>Turning, Parking, Red line detection </p>
        </div>
        <div className='secFinal'>
          <h3><b>Delivarable</b></h3>
          <Row xs={1} md={2} className="min">
            <ReportVid vid={"JCPzFNmXjpE"} w={"100%"} h={"90%"}>Here you can see the bot detect april tag and do turns. The turns aren't perfect though and the bot goes on the yellow line sometimes. The second stage was completed without hiccups, however, the final stage was not completed. I tried nugging the bot as it seemed it was stuck during turning but this did not help.</ReportVid>
          </Row>
        </div>
        <div className='secFinal' style={ { maxWidth: "100%", wordBreak: 'break-all' } }>
          <h3><b>References</b></h3>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">
              <a href={"https://eclass.srv.ualberta.ca/course/view.php?id=85053"}>https://eclass.srv.ualberta.ca/course/view.php?id=85053</a> Lane Following
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://github.com/duckietown/lib-dt-apriltags/blob/master/test/test.py"}>https://github.com/duckietown/lib-dt-apriltags/blob/master/test/test.py</a> April Tag Detection
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={"https://docs.duckietown.org/daffy/duckietown-classical-robotics/out/cra_perception.html"}>https://docs.duckietown.org/daffy/duckietown-classical-robotics/out/cra_perception.html</a> Yaml Load
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href={" https://github.com/wagonhelm/cmput412_exercise3"}> https://github.com/wagonhelm/cmput412_exercise3</a> used template from here and used distance and detection code
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Container>
    </div>
  );
};

export default ReportFinal;