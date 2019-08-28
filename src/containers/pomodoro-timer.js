import React, {Component} from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

export default class PomodoroTimer extends Component {
  render() {
    return (
      <div className="content-container">
        <Header />

        <div className="pomodoro-container">
          <div id="start_stop" className="timer">
            <h3 id="time-left" className="timer-length">25:00</h3>
            <h4 id="timer-label" className="status">Click to start!</h4>
          </div>

          <div className="reset">
            <button id="reset" className="control-button">Reset</button>
          </div>

          <div className="setters">
            <div className="session-setter">
              <p id="session-label">Session length</p>
              <button id="session-increment" className="control-button">+</button>
              <p className="session-length"><span id="session-length">25</span> min</p>
              <button id="session-decrement" className="control-button">-</button>
            </div>

            <div className="break-setter">
              <p id="break-label">Break length</p>
              <button id="break-increment" className="control-button">+</button>
              <p className="break-length"><span id="break-length">5</span> min</p>
              <button id="break-decrement" className="control-button">-</button>
            </div>
          </div>

          <audio id="beep" src="../audio/martian-gun.mp3"></audio>
        </div>

        <Footer />
      </div>
    )
  }
}
