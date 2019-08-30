import React from 'react';

export default function Header() {
  return (
    <div className="header-container">
      <h1 className="title">P<span>o</span>m<span>o</span>d<span>o</span>r<span>o</span> Timer</h1>

      <h2>Online timer based on the
        <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noopener noreferrer">
          Pomodoro Technique.
        </a>
      </h2>

      <h2>Increase or decrease the session and break lengths below as needed, and click the timer to start.</h2>
      <h2>The timer will let you know when either a session or a break has ended by playing a sound.</h2>
    </div>
  )
}
