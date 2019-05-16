import React from "react";
import { connect } from "react-redux";
import { poseToDo } from "../store/game";

class RoundPoseDisplay extends React.Component {
  // componentDidUpdate() {
  //   const { poseToDo } = this.props;
  //   poseToDo();
  // }

  // onChange(evt) {
  //   evt.preventDefault();
  //   const { poseToDo } = this.props;
  //   console.log("the evt.target.keyname is: ", evt.target.keyname);
  //   poseToDo(evt.target.keyname);
  // }

  render() {
    const { poseSequence, currentPoseSequenceIdx, poseSuccess } = this.props;
    return (
      <div>
        <h1 className="h2">You're on pose:</h1>

        {poseSequence.map((singlePose, idx) => {
          // console.log("singlePose: ", singlePose);
          // console.log("poseName: ", poseName);
          return (
            <div key={idx} keyname={singlePose}>
              {idx < currentPoseSequenceIdx || poseSuccess ? (
                <button className="button-primary button-round button-small">
                  {idx}
                  {singlePose}
                </button>
              ) : (
                <button className="button-primary-outlined button-round button-small">
                  {idx}
                  {singlePose}
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = state => ({
  poseSequence: state.gameReducer.poseSequence,
  poseName: state.gameReducer.poseName,
  poseSuccess: state.gameReducer.poseSuccess,
  currentPoseSequenceIdx: state.gameReducer.currentPoseSequenceIdx
});

const mapDispatch = dispatch => ({
  poseToDo: pose => dispatch(poseToDo(pose))
});

export default connect(
  mapState,
  mapDispatch
)(RoundPoseDisplay);
