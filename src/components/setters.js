import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class Setters extends Component {
  incrementSession = () => {
    let { timerRunning, sessionLength } = this.props;

    if (timerRunning) {
      return;
    }

    if (sessionLength < 60) {

      this.props.updateSetter('session', 'increment', sessionLength);
    }
  }

  decrementSession = () => {
    let { timerRunning, sessionLength } = this.props;

    if (timerRunning) {
      return;
    }

    if (sessionLength > 1) {
      this.props.updateSetter('session', 'decrement', sessionLength);
    }
  }

  incrementBreak = () => {
    let { timerRunning, breakLength } = this.props;

    if (timerRunning) {
      return;
    }

    if (breakLength < 60) {
      this.props.updateSetter('break', 'increment', breakLength);
    }
  }

  decrementBreak = () => {
    let { timerRunning, breakLength } = this.props;

    if (timerRunning) {
      return;
    }

    if (breakLength > 1) {
      this.props.updateSetter('break', 'decrement', breakLength);
    }
  }

  render() {
    return (
      <div className="setters">
        <div className="session-setter">
          <p id="session-label">Session length</p>

          <button
            id="session-increment"
            className="control-button"
            onClick={this.incrementSession}
          >
            +
          </button>

          <p className="session-length">
            <span id="session-length">{this.props.sessionLength}</span> min
          </p>

          <button
            id="session-decrement"
            className="control-button"
            onClick={this.decrementSession}
          >
            -
          </button>
        </div>

        <div className="break-setter">
          <p id="break-label">Break length</p>
          <button
            id="break-increment"
            className="control-button"
            onClick={this.incrementBreak}
          >
            +
          </button>

          <p className="break-length">
            <span id="break-length">{this.props.breakLength}</span> min
          </p>

          <button
            id="break-decrement"
            className="control-button"
            onClick={this.decrementBreak}
          >
            -
          </button>
        </div>
      </div>
    )
  }
}

Setters.propTypes = {
  breakLength: PropTypes.number,
  sessionLength: PropTypes.number,
  timerRunning: PropTypes.bool,
  updateSetter: PropTypes.func
}
