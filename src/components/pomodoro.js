import React, {Component} from 'react';
import audioFile from '../audio/martian-gun.mp3';
import Setters from '../components/setters';
import Timer from '../components/timer';
import Reset from '../components/reset';
import padTime from '../helpers';

export default class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  get initialState() {
    return {
      breakMinutes: 5,
      minutes: 25,
      onFirstPomodoro: true,
      onSession: true,
      seconds: 0,
      sessionMinutes: 25,
      timeLeft: '25:00',
      timerRunning: false
    }
  }

  updateTimer = () => {
    let { timerRunning, minutes, onSession, seconds, sessionMinutes, onFirstPomodoro } = this.state;

    if (!timerRunning) {
      return;
    }

    if (seconds > 0) {
      this.setState({ seconds: seconds -= 1 })
    }

    else if (minutes + seconds > 1) {
      let onFirstPomodoroSession = onSession && onFirstPomodoro;
      let pomodoroSessionMinutes = onFirstPomodoroSession ? sessionMinutes : minutes;

      this.setState({
        minutes: pomodoroSessionMinutes - 1,
        seconds: 60,
        onFirstPomodoro: false,
      }, () => this.updateTimerInformation(pomodoroSessionMinutes, seconds));
    }

    else if (minutes === 1 && seconds === 0) {
      this.setState({
        minutes: 0,
        seconds: 60
      })
    }

    else if (minutes + seconds === 0) {
      this.handleSessionOrBreak();
    }

    setTimeout(this.updateTimer, 1000);
    this.updateTimerInformation(minutes, seconds);
    console.log('this.state', this.state);
  }

  handleSessionOrBreak = () => {
    let { onSession, breakMinutes, sessionMinutes } = this.state;

    let audio = document.getElementById('beep');
    audio.play();

    if (onSession) {
      this.setState({
        onSession: false,
        minutes: breakMinutes,
        seconds: 0
      })

      console.log('switching to break');
    } else if (!onSession) {
      this.setState({
        onSession: true,
        minutes: sessionMinutes,
        seconds: 0
      })

      console.log('switching to session');
    }
  }

  updateTimerInformation = (minutes, seconds) => {
    let paddedTime = padTime(minutes, seconds);

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
        [type]: typeLength + 1
      })
    }

    if (action === 'decrement') {
      this.setState({
        [type]: typeLength - 1
      })
    }
  }

  controlTimerPause = () => {
    let { timerRunning } = this.state;

    if (timerRunning) {
      this.setState({ timerRunning: false })
    } else {
      this.setState({ timerRunning: true }, () => this.updateTimer());
    }
  }

  resetTimer = () => {
    let audio = document.getElementById('beep');

    audio.pause();
    audio.currentTime = 0;

    this.setState(this.initialState);
  }

  render() {
    return (
      <div className="pomodoro-container">
        <Timer
          controlTimerPause={this.controlTimerPause}
          onSession={this.state.onSession}
          timeLeft={this.state.timeLeft}
          timerRunning={this.state.timerRunning}
        />

        <Reset
          resetTimer={this.resetTimer}
        />

        <Setters
          breakMinutes={this.state.breakMinutes}
          sessionMinutes={this.state.sessionMinutes}
          timerRunning={this.state.timerRunning}
          updateSetter={this.updateSetter}
        />

        <audio id="beep" src={audioFile}></audio>
      </div>
    )
  }
}
