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
            onClick={() => this.handleSetterClick('increment', 'sessionMinutes', this.props.sessionMinutes)}
          >
            <i className="fa fa-arrow-up"></i>
          </button>

          <p className="session-length">
            <span id="session-length">{this.props.sessionMinutes}</span> min
          </p>

          <button
            id="session-decrement"
            className="control-button"
            onClick={() => this.handleSetterClick('decrement', 'sessionMinutes', this.props.sessionMinutes)}
          >
            <i className="fa fa-arrow-down"></i>
          </button>
        </div>

        <div className="break-setter">
          <p id="break-label">Break length</p>
          <button
            id="break-increment"
            className="control-button"
            onClick={() => this.handleSetterClick('increment', 'breakMinutes', this.props.breakMinutes)}
          >
            <i className="fa fa-arrow-up"></i>
          </button>

          <p className="break-length">
            <span id="break-length">{this.props.breakMinutes}</span> min
          </p>

          <button
            id="break-decrement"
            className="control-button"
            onClick={() => this.handleSetterClick('decrement', 'breakMinutes', this.props.breakMinutes)}
          >
            <i className="fa fa-arrow-down"></i>
          </button>
        </div>
      </div>
    )
  }
}

Setters.propTypes = {
  breakMinutes: PropTypes.number,
  sessionMinutes: PropTypes.number,
  timerRunning: PropTypes.bool,
  updateSetter: PropTypes.func
}
