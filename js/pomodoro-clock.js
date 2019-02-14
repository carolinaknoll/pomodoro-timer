let minutes = 24,
  seconds = 60,
  sessionLength = 25,
  breakLength = 5,
  isBreak = false,
  timerOn = false;

const audio = new Audio('mp3/martian-gun.mp3');

const switchToBreak = () => {
  minutes = (breakLength - 1);
  $('#minutes').text(minutes);
  seconds = 60;
  isBreak = false;
  checkTimerState();
}

const updateTimer = () => {
  if (seconds > 0) {
    seconds -= 1;

    padNumber(minutes, '#minutes');
    padNumber(seconds, '#seconds');
    setTimeout(updateTimer, 1000);

  } else if (minutes + seconds > 1) {
    minutes -= 1;
    $('#minutes').text(minutes);
    seconds = 60;
    checkTimerState();
  }
  else {
    isBreak = true;
    audio.play();
    switchToBreak();
  }
}

checkTimerState = () => {
  if (timerOn) {
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

$('#break-increment').click(function () {
  if (breakLength < 60) {
    breakLength += 1;
    minutes = (breakLength - 1);
    seconds = 60;
    $('#break-length').text(breakLength);
  }
});

$('#break-decrement').click(function () {
  if (breakLength > 1) {
    breakLength -= 1;
    minutes = (breakLength - 1);
    seconds = 60;
    $('#break-length').text(breakLength);
  }
});

$('#session-increment').click(function () {
  if (sessionLength < 60) {
    sessionLength += 1;
    minutes = (sessionLength - 1);
    seconds = 60;
    $('#session-length').text(sessionLength);
  }
});

$('#session-decrement').click(function () {
  if (sessionLength > 1) {
    sessionLength -= 1;
    minutes = (sessionLength - 1);
    seconds = 60;
    $('#session-length').text(sessionLength);
  }
});

$('#start_stop').click(function () {
  if (timerOn) {
    timerOn = false;
    $('#timer-label').text('Click to start again!');
  } else {
    timerOn = true;
    updateTimer();
    $('#timer-label').text('Timer is running...');
  }
});

$('#reset').click(function () {
  timerOn = false;
  minutes = 25;
  seconds = 00;
  breakLength = 5;
  sessionLength = 25;

  $('#minutes').text(minutes);
  $('#seconds').text(seconds);
  $('#break-length').text(breakLength);
  $('#session-length').text(sessionLength);
  $('#timer-label').text('Click to start again!');
});
