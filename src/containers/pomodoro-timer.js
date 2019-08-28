import React, {Component} from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import audioFile from '../audio/martian-gun.mp3';

export default class PomodoroTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      minutes: 25,
      onSession: true,
      seconds: 0,
      sessionLength: 25,
      timeLeft: '25:00',
      timerLabel: 'Click to start!',
      timerRunning: false
    }
  }

  componentDidMount() {
    document.getElementById('session-increment').addEventListener('click', () => this.incrementSession());
    document.getElementById('session-decrement').addEventListener('click', () => this.decrementSession());
    document.getElementById('break-increment').addEventListener('click', () => this.incrementBreak());
    document.getElementById('break-decrement').addEventListener('click', () => this.decrementBreak());
    document.getElementById('start_stop').addEventListener('click', () => this.controlTimerPause());
    document.getElementById('reset').addEventListener('click', () => this.resetTimer());
  }

  switchToBreak = () => {
    this.setState({
      onSession: false,
      minutes: this.state.breakLength - 1,
      seconds: 60
    })

    this.updateTimerInformation(this.state.minutes, this.state.seconds);
    this.checkTimerState();
  }

  updateTimer = () => {
    let { timerRunning, minutes, onSession, seconds } = this.state;

    if (timerRunning) {
      return;
    }

    if (seconds > 0) {
      this.state({
        timerRunning: true,
        seconds: seconds -= 1
      })

      this.updateTimerInformation(minutes, seconds);
      setTimeout(this.updateTimer, 1000);

    } else if (minutes + seconds > 1) {
      this.setState({
        timerRunning: true
      })

      this.updateTimerInformation(minutes, seconds);

      if (timerRunning) {
        this.setState({
          minutes: minutes -= 1,
          seconds: 60
        })

        setTimeout(this.updateTimer, 1000);
      }

    } else if (minutes === 1 && seconds === 0) {
      this.setState({
        minutes: 0,
        seconds: 60
      })
    }

    else {
      if (minutes + seconds === 0) {
        let audio = document.getElementById('beep');

        audio.play();

        if (onSession) {
          this.switchToBreak();

          this.setState({
            timerLabel: 'A break has begun!'
          })

        } else {
          this.setState({
            onSession: false,
            timerLabel: 'A session has begun!'
          })

          setTimeout(this.updateTimer, 1000);
        }
      }
    }
  }

  checkTimerState = () => {
    if (this.state.timerRunning) {
      this.updateTimer();
    }
  }

  padTime = (minutes, seconds) => {
    const mins = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secs = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${mins}:${secs}`;
  }

  updateTimerInformation = (minutes, seconds) => {
    let paddedTime = this.padTime(minutes, seconds);
    console.log('paddedTime', paddedTime);

    this.setState({
      timeLeft: paddedTime
    })
  }

  incrementSession = () => {
    let { timerRunning, sessionLength} = this.state;

    if (timerRunning) {
      return;
    }

    if (sessionLength < 60) {

      this.setState({
        sessionLength: sessionLength += 1,
        minutes: sessionLength,
        seconds: 0
      })
    }
  }

  decrementSession = () => {
    let { timerRunning, sessionLength} = this.state;


    if (timerRunning) {
      return;
    }

    if (sessionLength > 1) {
      this.setState({
        sessionLength: sessionLength -= 1,
        minutes: sessionLength,
        seconds: 0
      })
    }
  }

  incrementBreak = () => {
    let { timerRunning, breakLength} = this.state;

    if (timerRunning) {
      return;
    }

    if (breakLength < 60) {
      this.setState({
        breakLength: breakLength += 1,
        minutes: breakLength,
        seconds: 0
      })
    }
  }

  decrementBreak = () => {
    let { timerRunning, breakLength} = this.state;

    if (timerRunning) {
      return;
    }

    if (breakLength > 1) {
      this.setState({
        breakLength: breakLength -= 1,
        minutes: breakLength,
        seconds: 0
      })
    }
  }

  controlTimerPause = () => {
    let { timerRunning } = this.state;

    if (timerRunning) {
      this.setState({
        timerRunning: false,
        timerLabel: 'Timer is paused.'
      })
    } else {
      this.setState({
        timerRunning: true,
      })

      this.updateTimer();
    }
  }

  resetTimer = () => {
    let { minutes, seconds } = this.state;

    let audio = document.getElementById('beep');

    audio.pause();
    audio.currentTime = 0;

    this.setState({
      timerRunning: false,
      minutes: 25,
      seconds: 0,
      breakLength: 5,
      sessionLength: 25,
      onSession: true,
      timerLabel: 'Click to start!'
    })

    this.updateTimerInformation(minutes, seconds);
  }

  render() {
    return (
      <div className="content-container">
        <Header />

        <div className="pomodoro-container">
          <div id="start_stop" className="timer">
            <h3 id="time-left" className="timer-length">{this.state.timeLeft}</h3>
            <h4 id="timer-label" className="status">{this.state.timerLabel}</h4>
          </div>

          <div className="reset">
            <button id="reset" className="control-button">Reset</button>
          </div>

          <div className="setters">
            <div className="session-setter">
              <p id="session-label">Session length</p>
              <button id="session-increment" className="control-button">+</button>
              <p className="session-length"><span id="session-length">{this.state.sessionLength}</span> min</p>
              <button id="session-decrement" className="control-button">-</button>
            </div>

            <div className="break-setter">
              <p id="break-label">Break length</p>
              <button id="break-increment" className="control-button">+</button>
              <p className="break-length"><span id="break-length">{this.state.breakLength}</span> min</p>
              <button id="break-decrement" className="control-button">-</button>
            </div>
          </div>

          <audio id="beep" src={audioFile}></audio>
        </div>

        <Footer />
      </div>
    )
  }
}
