import React, {Component} from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Pomodoro from '../components/pomodoro';

export default class PomodoroContainer extends Component {
  render() {
    return (
      <div className="content-container">
        <Header />

        <Pomodoro />

        <Footer />
      </div>
    )
  }
}
