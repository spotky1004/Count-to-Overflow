number = 0;
npc = 0;
digitsNow = 1;
timeNow = new Date().getTime();
timeBef = new Date().getTime();
timeSpeed = 1;

function countUp(num) {
  number += num;
  if (10**digitsNow <= number) {
    digitsNow++;
    number = 0;
    npc++;
  }
  counter('#mainCounter', number, digitsNow);
}

window.onload = function() {
  counter('#mainCounter', 0, digitsNow);
  setInterval( function () {
    timeNow = new Date().getTime();
    tickGain = (timeNow-timeBef)/1000*timeSpeed;
    countUp(npc*tickGain);
    timeBef = new Date().getTime();
  }, 33);
}
