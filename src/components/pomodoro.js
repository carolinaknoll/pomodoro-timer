import React, {Component} from 'react';
import audioFile from '../audio/martian-gun.mp3';
import Setters from '../components/setters';

export default class Pomodoro extends Component {
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

    if (!timerRunning) {
      return;
    }

    if (seconds > 0) {
      this.setState({
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

      setTimeout(this.updateTimer, 1000);
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

    this.setState({
      timeLeft: paddedTime
    })
  }

  updateSetter = (type, action, typeLength) => {
    this.setState({
      seconds: 0
    })

    if (action === 'increment') {
      this.setState({
        minutes: typeLength + 1,
        [type]: typeLength + 1
      })
    }

    if (action === 'decrement') {
      this.setState({
        minutes: typeLength - 1,
        [type]: typeLength - 1
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
        timerLabel: 'Timer has resumed.'
      }, () => this.updateTimer());
    }
  }

  resetTimer = () => {
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
      timerLabel: 'Click to start!',
      timeLeft: '25:00'
    });
  }

  render() {
    return (
      <div className="pomodoro-container">
        <div id="start_stop" className="timer" onClick={this.controlTimerPause}>
          <h3 id="time-left" className="timer-length">{this.state.timeLeft}</h3>
          <h4 id="timer-label" className="status">{this.state.timerLabel}</h4>
        </div>

        <div className="reset">
          <button
            id="reset"
            className="control-button"
            onClick={this.resetTimer}
          >
            Reset
          </button>
        </div>

        <Setters
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          timerRunning={this.state.timerRunning}
          updateSetter={this.updateSetter}
        />

        <audio id="beep" src={audioFile}></audio>
      </div>
    )
  }
}
