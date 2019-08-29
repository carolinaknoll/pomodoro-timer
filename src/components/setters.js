import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class Setters extends Component {
  handleSetterClick = (action, type, typeLength) => {
    let { timerRunning } = this.props;

    if (timerRunning) {
      return;
    }

    if (action === 'increment' && typeLength < 60) {
      this.props.updateSetter(type, 'increment', typeLength);
    }

    if (action === 'decrement' && typeLength > 1) {
      this.props.updateSetter(type, 'decrement', typeLength);
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
            onClick={() => this.handleSetterClick('increment', 'session', this.props.sessionLength)}
          >
            +
          </button>

          <p className="session-length">
            <span id="session-length">{this.props.sessionLength}</span> min
          </p>

          <button
            id="session-decrement"
            className="control-button"
            onClick={() => this.handleSetterClick('decrement', 'session', this.props.sessionLength)}
          >
            -
          </button>
        </div>

        <div className="break-setter">
          <p id="break-label">Break length</p>
          <button
            id="break-increment"
            className="control-button"
            onClick={() => this.handleSetterClick('increment', 'break', this.props.breakLength)}
          >
            +
          </button>

          <p className="break-length">
            <span id="break-length">{this.props.breakLength}</span> min
          </p>

          <button
            id="break-decrement"
            className="control-button"
            onClick={() => this.handleSetterClick('decrement', 'break', this.props.breakLength)}
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
