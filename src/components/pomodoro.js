import React, {Component} from 'react';
import audioFile from '../audio/martian-gun.mp3';
import Setters from '../components/setters';
import Timer from '../components/timer';
import Reset from '../components/reset';

export default class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  get initialState() {
    return {
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

    this.setState(this.initialState);
  }

  render() {
    console.log('this.state.timeLeft', this.state.timeLeft);
    console.log('this.state.timerLabel', this.state.timerLabel);


    return (
      <div className="pomodoro-container">
        <Timer
          controlTimerPause={this.controlTimerPause}
          timeLeft={this.state.timeLeft}
          timerLabel={this.state.timerLabel}
        />

        <Reset
          resetTimer={this.resetTimer}
        />

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
