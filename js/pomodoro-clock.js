let minutes = 24,
  seconds = 60,
  sessionLength = 25,
  breakLength = 5,
  isBreak = false,
  timerOn = false;

const timerLoop = () => {
  const wav = 'mp3/martian-gun.mp3';
  const audio = new Audio(wav);

  if (timerOn) {
    if (minutes < 10) {
      $('#minutes').text('0' + minutes);
    } else {
      $('#minutes').text(minutes);
    }

    if (seconds > 0) {
      seconds -= 1;

      if (seconds < 10) {
        $('#seconds').text('0' + seconds);

      } else {
        $('#seconds').text(seconds);
      }

      setTimeout(timerLoop, 1000);

    } else if (minutes + seconds > 1) {
      minutes -= 1;
      $('#minutes').text(minutes);
      seconds = 60;
      timerLoop();

    } else {

      if (isBreak) {
        audio.play();
        minutes = sessionLength;
        $('#minutes').text(minutes);
        seconds = 60;
        timerLoop();

      } else {
        audio.play();
        timeForBreak();
        timerLoop();
      }
    }

    const timeForBreak = () => {
      isBreak = true;
      minutes = (breakLength - 1);
      $('#minutes').text(minutes);
      seconds = 60;
      isBreak = false;
    }
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
    timerLoop();
    $('#timer-label').text('Timer is running...');
  }
});
