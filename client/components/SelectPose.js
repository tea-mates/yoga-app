import React from "react";
import { Button } from "./Buttons";
// import Camera from "./Camera";
import AllPoses from "./AllPoses";
import CountdownTimer from "./CountdownTimer";
import Camera from "./Camera";

class SelectPose extends React.Component {
  //this will be changed to class Game
  constructor(props) {
    super(props);
    this.state = {
      countdown: true,
      loadCamera: false,
      poseSequence: [],
      poseSuccess: false, //did they succeed to do the current pose
      // continueToNextRound: false,
      poseBeingHighlighted: "",
      gameOver: false //set this to true if you reach 10 poses or you fail a pose
    };
    // this.displayCamera = this.displayCamera.bind(this);
    this.disableCountdown = this.disableCountdown.bind(this);
    this.scrollToMyRef = this.scrollToMyRef.bind(this);
    this.myRef = React.createRef();
    this.showSequence = this.showSequence.bind(this);
    this.checkPose = this.checkPose.bind(this);
    this.nextRound = this.nextRound.bind(this);
  }

  componentDidMount() {
    if (this.props.countdown === false) {
      this.showSequence();
    }
    setTimeout(this.displayCamera, 8000);
  }

  displayCamera() {
    console.log("lets begin!");
    this.setState({ loadCamera: true });
    setTimeout(this.disableCountdown, 3000);
  }

  disableCountdown() {
    console.log("all done!");
    this.setState({ countdown: false });
    this.scrollToMyRef();
  }

  scrollToMyRef() {
    this.myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end"
    });
  }

  showSequence() {
    const poseSequenceArr = this.state.poseSequence;
    const l = poseSequenceArr.length;
    for (let i = 0; i < l; i++) {
      let currPose = poseSequenceArr[i];
      this.setState({ poseBeingHighlighted: currPose });
    }
    this.setState({ poseBeingHighlighted: "" });
  }

  checkPose(currentResult) {
    const poseSequenceArr = this.state.poseSequence;
    const l = poseSequenceArr.length;
    for (let i = 0; i < l; i++) {
      let currPose = poseSequenceArr[i];
      if (currPose === currentResult) {
        this.setState({ poseSuccess: true });
      }
      if (this.state.poseSuccess === false) {
        this.setState({ gameOver: true });
      }
      if (this.state.countdown === false) {
        this.setState({ gameOver: true });
      }
    }
  }

  nextRound() {
    if (this.state.poseSequence.length === 10) {
      this.setState({ gameOver: true });
    }
    let poses = ["MountainPose", "HalfMoonPose", "GarlandPose", "TreePose"];
    let aRandomPoseIdx = Math.floor(Math.random() * 4);
    this.setState({
      poseSequence: [...this.state.poseSequence, poses[aRandomPoseIdx]]
    });
  }

  render() {
    let result = this.props.result;
    let confidence = this.props.confidence;
    return (
      <div>
        {this.state.gameOver ? (
          <ResultPage />
        ) : (
          <div>
            <div className="countdownDiv">
              {this.state.countdown ? <CountdownTimer /> : <div />}
            </div>

            <div>{this.state.loadCamera ? <Camera /> : <div />}</div>
            <div className="allPosesDiv">
              <AllPoses
                poseBeingHighlighted={this.state.poseBeingHighlighted}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SelectPose;
