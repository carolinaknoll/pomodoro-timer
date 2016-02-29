/*global $, jQuery, alert*/
/*global alert: false, console: false */

var minutes = 24,
    seconds = 60,
    workTime = 25,
    breakTime = 5,
    isBreak = false,
    timerOn = false;

function timerLoop() {
    var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
    var audio = new Audio(wav);

    if (timerOn) {
        $('.minutes').text(minutes);
        if ((seconds) > 0) {

            seconds -= 1;
            if (seconds < 10) {
                $('.seconds').text('0' + seconds);
            } else {
                $('.seconds').text(seconds);
            }

            setTimeout(timerLoop, 1000);
        } else if ((minutes + seconds) > 0) {
            minutes -= 1;
            $('.minutes').text(minutes);
            seconds = 60;
            timerLoop();
        } else {
            if (isBreak) {
                audio.play();
                minutes = workTime;
                $('.minutes').text(minutes);
                seconds = 60;
                timerLoop();
            } else {
                audio.play();
                timeForBreak();
                timerLoop();
            }

        }

        function timeForBreak() {
            isBreak = true;
            minutes = (breakTime - 1);
            $('.minutes').text(minutes);
            seconds = 60;
            isBreak = false;
        }
    }
}

$('.breakPlus').click(function () {
    breakTime += 1;
    minutes = (breakTime - 1);
    seconds = 60;
    $('.breakTime').text(breakTime + ' min');
});

$('.breakMinus').click(function () {
    if (breakTime > 0) {
        breakTime -= 1;
        minutes = (breakTime - 1);
        seconds = 60;
        $('.breakTime').text(breakTime + ' min');
    }
});

$('.workPlus').click(function () {
    workTime += 1;
    minutes = (workTime - 1);
    seconds = 60;
    $('.workTime').text(workTime + ' min');
});


$('.workMinus').click(function () {
    if (workTime > 0) {
        workTime -= 1;
        minutes = (workTime - 1);
        seconds = 60;
        $('.workTime').text(workTime + ' min');
    }
});

$('.circleClock').click(function () {
    if (timerOn) {
        timerOn = false;
    } else {
        timerOn = true;
        timerLoop();
    }
});