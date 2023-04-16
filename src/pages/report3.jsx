import React from 'react';
import '../styles/report3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import ReportImg from '../components/reportImg'
import ReportVid from '../components/reportVid'


const Report3 = () => {
  return (
    <div className="quackWrapper3">
      <Container fluid>
        <h1>CMPUT 412: Exercise 3 - Computer Vision for Robotics</h1>
        <h4>Justin Valentine (jvalenti), Sergey Khlynovskiy (khlynovs)</h4>
        <div className="sec3">
          <h3><b>Part One - Computer Vision</b></h3>
          <h4>1.2 Apriltag Node</h4>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">What does the april tag library return to you for determining its position?
            <div>
              <Row xs={1} md={2}>
                  <ReportImg img={process.env.PUBLIC_URL + "/lab3img/april.png"} w={"100%"} h={"90%"}>1.1 dt-apriltag detection result</ReportImg>
              </Row>
              <p>
              The most important parts for determining the position are pose_R and pose_t. pose_R is the rotation matrix;
              it just needs an extra row and column of 0's except for the corner (position [4, 4]) which is a 1. 
              pose_R can then be used to find rotation angle and axis in quaternion format.
              </p>
              <SyntaxHighlighter language="python" style={dark} showLineNumbers={true} wrapLines={true}>
                {`q = np.append(r.pose_R, [[0],[0],[0]], axis =1)\nq = np.append(q, [[0,0,0, 1]], axis =0)\nq = tr.quaternion_from_matrix(q)`}
              </SyntaxHighlighter>
              <p>
              pose_t is the direction vector and needs to be reshaped into a (3,) vector which gets converted into a translation matrix, and then we can find the translation vector.
              </p>
              <SyntaxHighlighter language="python" style={dark} showLineNumbers={true} wrapLines={true}>
                {`t = tr.translation_from_matrix(tr.translation_matrix(np.array(r.pose_t).reshape(3)))`}
              </SyntaxHighlighter>
            </div>
            </ListGroup.Item>
            <ListGroup.Item as="li">Which directions do the X, Y, Z values of your detection increase / decrease?
            <div>
              <p>
                Z increases as duckiebot moves farther away, X increases as duckiebot moves left (apriltag goes right),
                and Y increases as duckiebot move up (apriltag goes down).
              </p>
            </div>
            </ListGroup.Item>
            <ListGroup.Item as="li">What frame orientation does the april tag use?
            <div>
              The translations and rotations are with respect to the camera_optical_frame. 
              We send the estimated april tag position with respect to this frame by doing:
              <SyntaxHighlighter language="python" style={dark} showLineNumbers={true} wrapLines={true}>
                {`# send predicted april tag position
odom = Odometry()
odom.header.stamp = rospy.Time.now()  # Ideally, should be encoder time
odom.header.frame_id = f"{self.veh}/camera_optical_frame"

self._tf_broadcaster.sendTransform(
    TransformStamped(
        header=odom.header,
        child_frame_id=f"{self.veh}/at_{r.tag_id}_estimate",
        transform=Transform(
            translation=Vector3(*t), rotation=Quaternion(*q)
        ),
    )
)`}
              </SyntaxHighlighter>
            </div>
            </ListGroup.Item>
            <ListGroup.Item as="li">Why are detections from far away prone to error? 
            <div>
              <p>
              First, the camera isn't great so detections from far away can be even less clear than they normally are. 
              The april tag would be smaller and closer in size to a pixel so we get back less information. 
              </p>
            </div>
            </ListGroup.Item>
            <ListGroup.Item as="li">Why may you want to limit the rate of detections?
            <div>
              <p>
              It takes a long time for each detection to process, especially because we typically want 
              to perform extra calculations after the detection has been done. This will take up a lot of 
              resources which could be better used on other computational tasks for the robot. We also don't need to 
              localize ourselves that often so setting a limit of 1hz is good enough and won't be too resource intensive.
              </p>
              
            </div>
            </ListGroup.Item>
            
          </ListGroup>

          <Row xs={1} md={2} className="min">
            <ReportVid vid={"pRfPs1qQ-AA"} w={"100%"} h={"90%"}>DELIVERABLE 1: labeling the apriltag detector results. These images were grabbed from the rqt_image_view application.</ReportVid>
            <ReportVid vid={"TCkEGkir0zg"} w={"100%"} h={"90%"}>1.2 duckiebot led changing color depending on which apriltag is found.</ReportVid>
          </Row>

        </div>
        <div className='sec3'>
          <h3><b>Part Two - Lane Following</b></h3>
          <h4>Step 1: HSV filter</h4>
          <Row xs={1} md={2} className="min">
            <ReportImg img={process.env.PUBLIC_URL + "/lab3img/2.1.png"} w={"90%"} h={"90%"}>2.1 yellow filter on duckietown</ReportImg>
            <ReportImg img={process.env.PUBLIC_URL + "/lab3img/2.2.png"} w={"90%"} h={"90%"}>2.2 white filter on duckietown</ReportImg>
          </Row>
          <p>
          First we apply a pair of SVG filters that selects pixels that are in specified ranges. 
          On the left is the result of applying the yellow filter. On the right is the result of applying the white filter. 
          These SVG ranges vary a lot due to lighting conditions so having a controlled lighting environment like in the lab helps a lot. 
          </p>
          <h4>Step 2: Blur and Erode </h4>
          <Row xs={1} md={2} className="min">
            <ReportImg img={process.env.PUBLIC_URL + "/lab3img/2.3.png"} w={"90%"} h={"90%"}>2.3 lane image blur with yellow filter</ReportImg>
            <ReportImg img={process.env.PUBLIC_URL + "/lab3img/2.4.png"} w={"90%"} h={"90%"}>2.4 lane image blur with yellow filter</ReportImg>
          </Row>
          <p>
          We found that blurring the image helped a lot with reliably finding contours. 
          Each yellow tick should be its own contour however at some camera angles the system has 
          troubles differentiating them so eroding the outer edge helps combat this. However it does 
          add the potential of eroding the region too much and thus not being able to find the line. 
          </p>
          <h4>Step 3: Find Contours & Centroids</h4>
          <Row xs={1} md={2} className="min">
            <ReportImg img={process.env.PUBLIC_URL + "/lab3img/2.5.png"} w={"90%"} h={"90%"}>2.5 find centroid for yellow tape</ReportImg>
            <ReportImg img={process.env.PUBLIC_URL + "/lab3img/2.6.png"} w={"90%"} h={"90%"}>2.6 find centroid for white tape</ReportImg>
          </Row>
          <p>We then find the centroids for 2 yellow tick contours and one for the white line contour. </p>
          <h4>Step 4: Get midpoint</h4>
          <Row xs={1} md={2} className="min">
            <ReportImg img={process.env.PUBLIC_URL + "/lab3img/2.7.png"} w={"100%"} h={"90%"}>2.7 find midpoint of centroids</ReportImg>
          </Row>
          <p>
          We find the midpoint between the two yellow tick centroids and then draw a line 
          over to the white line centroid. This is our "road width" however it is not actually 
          equivalent to the true road width due to perspective transformations in camera. Using 
          this approach as opposed to one yellow tick centroid and a constant road width is that 
          it gives more accurate road width estimations. If the camera projections were undone, 
          it would be possible to use a single centroid and a constant offset to estimate the road width.
          </p>
          <h4>Step 5: Handling Errors in Detection: </h4>
          <p>Sometimes the tracker fails to find one of the three points, in this case we return an error of 0.</p>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">What is the error for your PID controller? 
            <p>
            The error term in our PID controller is the horizontal pixel coordinate difference between the middle of the image and the middle of the road. This is then scaled by a gain term to form P. 
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">If your proportional controller did not work well alone, what could have caused this? 
            <p>
            If your proportional controller did not work well, it could be caused by several factors. 
            One possible cause is that the system being controlled may have a nonlinear response, and 
            the P controller alone is not sufficient to handle the nonlinearities. In such cases, it 
            may be necessary to add additional control strategies such as integral or derivative control. 
            Another possible reason for the proportional controller's poor performance could be due to 
            inadequate tuning of the controller parameters. If the proportional gain is too low, 
            the system's response may be too slow, resulting in poor control. Conversely, if the gain is too high,
             the system may become unstable and oscillate. Therefore, proper tuning of the proportional gain is 
             crucial for good performance. 

            Lastly, the proportional controller's poor performance could be due to incorrect measurement 
            or sensing of the system's state variables. If the measured variables are noisy or inaccurate, 
            the controller may not be able to accurately correct the errors, leading to poor performance.
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">Does the D term help your controller logic? Why or why not? 
            <p>
            Yes, the D term can help the controller logic (in theory) by improving the system's stability 
            and response time. By measuring the rate of change of the error, the D term can predict the 
            system's behavior and dampen any oscillations or overshoot caused by the P term. However, it's 
            important to note that the derivative term can also amplify noise, so it must be used with care 
            and its gain must be appropriately tuned. 
            </p>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className='sec3'>
          <h3><b>Part Three - Localization Using Sensor Fusion</b></h3>
          <h4>3.1: Odometry Frame</h4>
          <p>
          The dead reckoning node that was provided from the template was used for this part. 
          We used the rosbag that was provided to develop april tag detections and do most of 
          3.1 and 3.2 which significantly sped up development time. 
          </p>
          <h4>3.2: Creating Static Landmark Frames</h4>
          <p>
          Static transforms were used in the launch file for all of the static april tags to avoid using quaternions. 
          It took a few tries to get the yaw pitch and roll correctly but following the example photo on eclass was very helpful. 
          </p>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">Where did odometry seem to drift the most? Why would that be?
            <div>
              <p>
              It seemed to drift the most when turning as that completely disoriented the orientation of 
              the bot which propagates onto position. Also when going in a straight line it seemed to 
              think it was going to the left slightly. This is most likely due to the fact that the encoders 
              are not great and only publish at 10hz which makes it very hard to do accurate dead reckoning. 
              There could also be other errors such as slippage on duckietown.
              </p>
            </div>
            </ListGroup.Item>
            <ListGroup.Item as="li">Did adding the landmarks make it easier to understand where and when the odometry drifted?
            <div>
              <p>
                Yes, since we can compare distances in the real world of the bot and a landmark with the static 
                landmark and the bot in rviz.
              </p>
            </div>
            </ListGroup.Item>
          </ListGroup>
          <Row xs={1} md={2} className="min">
            <ReportVid vid={"G_XJuEZjwVk"} w={"100%"} h={"90%"}>DELIVERABLE 3: moving around duckietown with static apriltags.</ReportVid>
          </Row>
          <h4>3.3: Creating a Transform Tree Graph</h4>
          <p>This is where we could no longer use the bag file for development. 
            We followed option B and downloaded the ros_tools package on portainer. 
            We could not find the package at first but after doing sudo apt-get update it could find it.
          </p>
          <Row xs={1} className="min">
            <ReportImg img={process.env.PUBLIC_URL + "/lab3img/tree1.png"} w={"100%"} h={"90%"}>DELIVERABLE 4: robot URDF transform tree graph</ReportImg>
          </Row>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">What is the root/parent frame?
            <p>
            footprint which we can see at the top of deliverable 4
            </p>
            </ListGroup.Item>
          </ListGroup>
          <h4>3.4: Visualizing the Robot Transforms</h4>
          <p>The URDF was visualized in rviz by adding a robot model. 
            Below you can see what the robot model looks like in rviz.
          </p>
          <Row xs={1} md={2} className="min">
            <ReportImg img={process.env.PUBLIC_URL + "/lab3img/roboframe.png"} w={"90%"} h={"90%"}>3.1 robot model visualization in rviz with axis</ReportImg>
            <ReportImg img={process.env.PUBLIC_URL + "/lab3img/roboframe2.png"} w={"90%"} h={"90%"}>3.2 robot model visualization in rviz no axis</ReportImg>
          </Row>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">Where is the robot parent frame physically located?
            <p>
            It is the center of wheelbase (between both wheels) and level with the ground.
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">What type of joint are the joints that move when the wheel moves?
            <p>
            This is the joint that connects the wheel axis with the wheel and it is a continuous joint.
            </p>
            </ListGroup.Item>
          </ListGroup>
          <h4>3.5: Connecting our Odometry Frame to our Robot Frame</h4>
          <p>A static transform was used to connect the odometry frame 
            from dead reckoning and the footprint frame from the URDF.
          </p>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">Why won't the robot move from the origin?
            <p>
            This is because all of the robot frames right now are with respect 
            to the footprint frame. They are not connected to our odometry frame 
            so they are unable to move.
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">What should the translation and rotation be from the odometry child to robot parent frame?
            <p>
            The translation should be 0 for all x, y and z and a rotation of 0 in radians for yaw, pitch and roll.
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">In what situation would you have to use something different? 
            <p>
            If the parent frame of the robot and the odometry frame were talking about 2 different physical positions. 
            Like if the footprint was actually the physical position of the camera we would have to convert this to odometry position.
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">What is the new root/parent frame for your environment?
            <p>
            The new root/parent frame is the world frame. which we can see at the top of deliverable 5
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">Can a frame have two parents? Why?
            <p>
            No because the frame needs to be positioned with respect to a single frame. 
            If there are 2 parent frames then the child does not know how to position itself.
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">Can an environment have more than one parent/root frame? 
            <p>
            No because everything positioned in the environment needs to be positioned with respect to one element. 
            Same reason as the previous question.
            </p>
            </ListGroup.Item>
          </ListGroup>
          <Row xs={1} className="min">
            <ReportImg img={process.env.PUBLIC_URL + "/lab3img/tree2.png"} w={"100%"} h={"90%"}>DELIVERABLE 5: world environment transform tree graph</ReportImg>
          </Row>
          <h4>3.6: Visualize Apriltag Detections in RViz</h4>
          <p>We detect the apriltags at 1hz and can use detection information 
            to find the predicted position of the april tag with respect to camera_optical_frame. 
            It took a few tries to find the right frame to use because there are multiple frames named camera.
          </p>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">How far off are your detections from the static ground truth? 
            <p>
            They are slightly off, especially when detecting from far away. This gets worse over time as the robot moves through duckietown.
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">What are two factors that could cause this error?
            <p>
            The main reason is because of bad dead reckoning as we are projecting estimated apriltag 
            position with respect to robot position. This is also because we are detecting at 1hz so the 
            robot could already be in a different position than from where it detected the apriltag.
            </p>
            </ListGroup.Item>
          </ListGroup>
          <Row xs={1} md={2} className="min">
            <ReportVid vid={"KdaK9Fd5T_E"} w={"100%"} h={"90%"}>DELIVERABLE 6: moving around duckietown and projecting estimated apriltag position with respect to the bot.</ReportVid>
          </Row>
          <h4>3.7: Calculating Transform from Apriltag to Robot Base & Applying to Static Frame</h4>
          <p>
          We used lookup_transform_full from the tf2 library to find the position of the robot wheelbase 
          with respect to the april tag in world frame. The source and target frame are strangely named 
          which caused some confusion. This was then broadcasted and another transform from this frame to 
          world frame was used to find how to teleport our bot correctly.
          </p>
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">Is this a perfect system? 
            <p>
            No. The robot is still quite off from its actual position and the orientation of the robot is very off.
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">What are the causes for some of the errors? 
            <p>
            If a frame is blurred from turning too quickly for example, then it will be unusable for detections. 
            If this is the case then we would only be using dead reckoning to position ourselves which is 
            not great as mentioned before. We don't change orientation of the robot with apriltags so this is 
            still a big problem as before.
            </p>
            </ListGroup.Item>
            <ListGroup.Item as="li">What other approaches could you use to improve localization?
            <p>
            We could use better encoders for better dead reckoning. We could use more sensors like an IMU. 
            There could also be a camera from above looking at the entire duckietown which can more accurately find the position of our bot.
            </p>
            </ListGroup.Item>
          </ListGroup>
          <Row xs={1} md={2} className="min">
            <ReportVid vid={"k4He6dnQWok"} w={"100%"} h={"90%"}>DELIVERABLE 7: moving around duckietown and teleporting if an apriltag is found</ReportVid>
          </Row>
        </div>
        <div className='sec3' style={ { maxWidth: "100%", wordBreak: 'break-all' } }>
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

export default Report3;