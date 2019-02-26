let minutes = 24,
  seconds = 60,
  sessionLength = 25,
  breakLength = 5,
  isBreak = false,
  timerRunning = false,
  audio = $('#beep')[0];

const switchToBreak = () => {
  console.log('break');
  isBreak = true;
  audio.play();

  minutes = (breakLength - 1);
  seconds = 60;

  updateTimerInformation(minutes, seconds);

  $('#timer-label').text('A break has begun!');
  isBreak = false;
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

    minutes -= 1;
    seconds = 60;

    updateTimerInformation(minutes, seconds);
    checkTimerState();
  }

  else if (minutes + seconds === 0) {
    switchToBreak();
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
  $('#time-left').text(paddedTime);
  $('#timer-label').text('A session has begun!');
}

const incrementSession = () => {
  if (timerRunning) {
    return;
  }

  if (sessionLength < 60) {
    sessionLength += 1;
    minutes = (sessionLength - 1);
    seconds = 60;
    $('#session-length').text(sessionLength);
  }
}

const decrementSession = () => {
  if (timerRunning) {
    return;
  }

  if (sessionLength > 1) {
    sessionLength -= 1;
    minutes = (sessionLength - 1);
    seconds = 60;
    $('#session-length').text(sessionLength);
  }
}

const incrementBreak = () => {
  if (timerRunning) {
    return;
  }

  if (breakLength < 60) {
    breakLength += 1;
    minutes = (breakLength - 1);
    seconds = 60;
    $('#break-length').text(breakLength);
  }
}

const decrementBreak = () => {
  if (timerRunning) {
    return;
  }

  if (breakLength > 1) {
    breakLength -= 1;
    minutes = (breakLength - 1);
    seconds = 60;
    $('#break-length').text(breakLength);
  }
}

const controlTimerPause = () => {
  if (timerRunning) {
    timerRunning = false;
    $('#timer-label').text('Click to start again!');
  } else {
    timerRunning = true;
    updateTimer();
    $('#timer-label').text('Timer is running...');
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

  $('#break-length').text(breakLength);
  $('#session-length').text(sessionLength);
  $('#timer-label').text('Click to start!');
}

$('#session-increment').on('click', function() {
  incrementSession();
});

$('#session-decrement').on('click', function() {
  decrementSession();
});

$('#break-increment').on('click', function() {
  incrementBreak();
});

$('#break-decrement').on('click', function() {
  decrementBreak();
});

$('#start_stop').on('click', function() {
  controlTimerPause();
});

$('#reset').on('click', function() {
  resetTimer();
});
