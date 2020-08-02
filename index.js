number = 0;
npc = 0;
tabNow = 0;
digitsNow = 1;
timeNow = new Date().getTime();
timeBef = new Date().getTime();
timeSpeed = 1;
machinesCh = [0, 0, 0, 0, 0, 0, 0, 0];
machines = [0, 0, 0, 0, 0, 0, 0, 0];

function notation(num, dim) {
  if (!isFinite(num)) {
    return 'error!';
  } else if (num < 1e15) {
    if (num <= 1) {
      return num.toFixed(dim);
    } else {
      notationLevel = Math.floor(Math.log10(num)/3);
      notationSpace = Math.floor(Math.log10(num)%3);
      if (num < 1e3) {
        notationFixed = (num / 1000 ** notationLevel).toFixed(Math.max(dim-notationSpace, 0)) ;
      } else {
        notationFixed = (num / 1000 ** notationLevel).toFixed(3-notationSpace) ;
      }
      if (notationLevel < 11) {
        return notationFixed + standardNotation[notationLevel];
      } else {
        return notationFixed + standardNotation2[(notationLevel-11) % 10] + standardNotation3[Math.floor((notationLevel-11) / 10)];
      }
    }
  } else {
    if (num >= 1e5) {
      return (num/(10**(Math.floor(Math.log10(num))))).toFixed(3) + 'e' + Math.floor(Math.log10(num));
    } else {
      return num.toFixed(2);
    }
  }
}
function countUp(num) {
  number += num;
  if (10**digitsNow <= number) {
    digitsNow++;
    number = 0;
    rollMachines();
  }
  counter('#mainCounter', number, digitsNow);
}

function rollMachines() {
  for (var i = 0; i < 3; i++) {
    if (Math.random() < machinesCh[i]) {
      machines[i]++;
    }
  }
}

function setCounters() {
  counter('#mainCounter', number, digitsNow);
}

function gameLoop() {
  setAll();
  displayTabs();
}

function displayTabs() {
  switch (tabNow) {
    case 0:
      displayTab1();
      break;
    default:

  }
}
function displayTab1() {
  $('#cps').html(function (index,html) {
    return notation(npc);
  });
  for (var i = 0; i < 3; i++) {
    $('.machineHave:eq(' + i + ')').html(function (index,html) {
      return machines[i];
    });
    $('.machincChance:eq(' + i + ')').html(function (index,html) {
      return Math.round(Math.max(Math.min((machinesCh[i]*100), 100), 0), 2).toFixed(2) + '%';
    });
  }
}

function setAll() {
  setCounter();
  setMachinesCh();
}
function setCounter() {
  npc = machines[0]+machines[1]*5+machines[2]*25;
  countUp(npc*tickGain);
}
function setMachinesCh() {
  machinesCh[0] = 1/(machines[0]**1.5+1)*(digitsNow**1.5+1);
  machinesCh[1] = 0.5/(machines[1]**1.5+1)*(digitsNow**1.6+1)-3;
  machinesCh[2] = 0.4/(machines[2]**1.6+1)*(digitsNow**1.7+1)-6;
}

window.onload = function() {
  setCounters();
  setInterval( function () {
    timeNow = new Date().getTime();
    tickGain = (timeNow-timeBef)/1000*timeSpeed;
    gameLoop();
    timeBef = new Date().getTime();
  }, 33);
}
