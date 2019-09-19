import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  handleTimerStatusMessage() {
    return this.props.timerRunning
      ? 'Timer is running.'
      : 'Timer is paused. Click to run.'
  }

  handleTimerTypeMessage() {
    return this.props.onSession
      ? 'Session pomodoro.'
      : 'Break pomodoro.'
  }

  render() {
    return (
      <div id="start_stop" className="timer box-shadow" onClick={this.props.controlTimerPause}>
        <h3 id="time-left" className="timer-length">{this.props.timeLeft}</h3>
        <h4 id="timer-label" className="type">{this.handleTimerTypeMessage()}</h4>
        <h4 id="timer-label" className="status">{this.handleTimerStatusMessage()}</h4>
      </div>
    )
  }
}

Timer.propTypes = {
  controlTimerPause: PropTypes.func.isRequired,
  onSession: PropTypes.bool.isRequired,
  timeLeft: PropTypes.string.isRequired,
  timerRunning: PropTypes.bool.isRequired
}
