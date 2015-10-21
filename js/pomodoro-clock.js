$(document).ready(function() {
  
  var breakTime = 5,
      workTime = 25,
      
      $(".bplus").click(function bPlus() {
        var b = document.getElementById(".btime").innerHTML;
        b = Number(b) + 1;
      }
                
      $(".bminus").click(function bMinus() {
        var b = document.getElementById(".btime").innerHTML;
        b = Number(b) - 1;
      }
                         
      $(".wplus").click(function wPlus() {
        var w = document.getElementById(".wtime").innerHTML;
        w = Number(w) + 1; 
      }
  
      $(".wminus").click(function wMinus() {
        var w = document.getElementById(".wtime").innerHTML;
        w = Number(w) - 1;
      }

  var hours = Math.floor(num / 3600);
  var minutes = Math.floor(num % 3600 / 60);
  var seconds = Math.floor(num % 3600 % 60);

  hours = (hrs > 0) ? formatNumber(hours) + ":" : "";
  minutes = (minutes > 0) ? formatNumber(minutes) + ":" : "00:";
  seconds = formatNumber(seconds);
  
  return hours + minutes + seconds;
}