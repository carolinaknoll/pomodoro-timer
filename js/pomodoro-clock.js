let minutes = 25,
  seconds = 0,
  sessionLength = 25,
  breakLength = 5,
  isBreak = false,
  timerRunning = false,
  audio = document.getElementById('beep');

const switchToBreak = () => {
  console.log('break');
  isBreak = true;

  minutes = breakLength - 1;
  seconds = 60;

  updateTimerInformation(minutes, seconds);
  checkTimerState();
}

const updateTimer = () => {
  if (!timerRunning) {
    return;
  }

  if (seconds > 0) {
    timerRunning = true;
    seconds -= 1;

    updateTimerInformation(minutes, seconds);
    setTimeout(updateTimer, 1000);

  } else if (minutes + seconds > 1) {
    timerRunning = true;

    updateTimerInformation(minutes, seconds);

    if (timerRunning) {
      minutes -= 1;
      seconds = 60;
      setTimeout(updateTimer, 1000);
    }

  } else if (minutes === 1 && seconds === 0) {
    minutes = 0;
    seconds = 60;
  }

  else {
    if (minutes + seconds === 0) {
      audio.play();

      if (!isBreak) {
        switchToBreak();
        document.getElementById('timer-label').textContent = 'A break has begun!';
      } else {
        isBreak = false;
        setTimeout(updateTimer, 1000);
        document.getElementById('timer-label').textContent = 'A session has begun!';
      }
    }
  }
}

checkTimerState = () => {
  if (timerRunning) {
    updateTimer();
  }
}

const padTime = (minutes, seconds) => {
  const mins = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secs = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${mins}:${secs}`;
}

const updateTimerInformation = (minutes, seconds) => {
  let paddedTime = padTime(minutes, seconds);
  document.getElementById('time-left').textContent = paddedTime;
}

const incrementSession = () => {
  if (timerRunning) {
    return;
  }

  if (sessionLength < 60) {
    sessionLength += 1;
    minutes = sessionLength;
    seconds = 0;
    document.getElementById('session-length').textContent = sessionLength;
  }
}

const decrementSession = () => {
  if (timerRunning) {
    return;
  }

  if (sessionLength > 1) {
    sessionLength -= 1;
    minutes = sessionLength;
    seconds = 0;
    document.getElementById('session-length').textContent = sessionLength;
  }
}

const incrementBreak = () => {
  if (timerRunning) {
    return;
  }

  if (breakLength < 60) {
    breakLength += 1;
    minutes = breakLength;
    seconds = 0;
    document.getElementById('break-length').textContent = breakLength;
  }
}

const decrementBreak = () => {
  if (timerRunning) {
    return;
  }

  if (breakLength > 1) {
    breakLength -= 1;
    minutes = breakLength;
    seconds = 0;
    document.getElementById('break-length').textContent = breakLength;
  }
}

const controlTimerPause = () => {
  if (timerRunning) {
    timerRunning = false;
    document.getElementById('timer-label').textContent = 'Timer is paused.';
  } else {
    timerRunning = true;
    updateTimer();
  }
}

const resetTimer = () => {
  timerRunning = false;
  audio.pause();
  audio.currentTime = 0;
  minutes = 25;
  seconds = 0;
  breakLength = 5;
  sessionLength = 25;

  updateTimerInformation(minutes, seconds);

  document.getElementById('break-length').textContent = breakLength;
  document.getElementById('session-length').textContent = sessionLength;
  document.getElementById('timer-label').textContent = 'Click to start!';
}

document.getElementById('session-increment').addEventListener('click', () => incrementSession());

document.getElementById('session-decrement').addEventListener('click', () => decrementSession());

document.getElementById('break-increment').addEventListener('click', () => incrementBreak());

document.getElementById('break-decrement').addEventListener('click', () => decrementBreak());

document.getElementById('start_stop').addEventListener('click', () => controlTimerPause());

document.getElementById('reset').addEventListener('click', () => resetTimer());
