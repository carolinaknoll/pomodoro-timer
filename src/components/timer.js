import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  handleTimerStatusMessage() {
    return this.props.timerRunning
      ? 'Timer is running.'
      : 'Timer is paused.'
  }

  render() {
    return (
      <div id="start_stop" className="timer" onClick={this.props.controlTimerPause}>
        <h3 id="time-left" className="timer-length">{this.props.timeLeft}</h3>
        <h4 id="timer-label" className="status">{this.props.timerLabel}</h4>
        <h4 id="timer-label" className="status">{this.handleTimerStatusMessage()}</h4>
      </div>
    )
  }
}

Timer.propTypes = {
  controlTimerPause: PropTypes.func.isRequired,
  timeLeft: PropTypes.string.isRequired,
  timerLabel: PropTypes.string.isRequired,
  timerRunning: PropTypes.bool.isRequired
}
