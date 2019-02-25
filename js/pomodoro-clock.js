let minutes = 24,
  seconds = 60,
  sessionLength = 25,
  breakLength = 5,
  isBreak = false,
  timerRunning = false,
  audio = new Audio('mp3/martian-gun.mp3');

const switchToBreak = () => {
  console.log('break');
  minutes = (breakLength - 1);
  $('#minutes').text(minutes);
  seconds = 60;
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

    padNumber(minutes, '#minutes');
    padNumber(seconds, '#seconds');
    setTimeout(updateTimer, 1000);

  } else if (minutes + seconds > 1) {
    timerRunning = true;

    minutes -= 1;
    $('#minutes').text(minutes);
    seconds = 60;
    checkTimerState();
  }

  else if (minutes + seconds === 0) {
    isBreak = true;
    audio.play();
    switchToBreak();
  }
}

checkTimerState = () => {
  if (timerRunning) {
    updateTimer();
  }
}

const padNumber = (number, displayId) => {
  if (number < 10) {
    $(displayId).text('0' + number);
  } else {
    $(displayId).text(number);
  }
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
  minutes = 25;
  seconds = 0;
  breakLength = 5;
  sessionLength = 25;

  $('#minutes').text(minutes);
  $('#seconds').text('00');
  $('#break-length').text(breakLength);
  $('#session-length').text(sessionLength);
  $('#timer-label').text('Click to start again!');
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
