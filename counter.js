var digitTried = 0;

function setDigitPos(counterElement, num, digit) {
  if (num > 10**digit) {
    num = (Number(num).toExponential(digit-6)).toString().replace('+', '');
    if (num < 1e100) {
      num = num.replace('e', 'e0');
    } else if (num < 1e10) {
      num = num.replace('e', 'e00');
    }
  }
  for (var i = 0; i < digit; i++) {
    digitThis = document.querySelector(counterElement + ' > .counterNumArea > .counterNumFrame:nth-child(' + (i+1) + ') > div');
    digitTried++;
    if (num[i] == 'e') {
      digitThis.style.top = '-60.4vh';
    } else if (num[i] == '.') {
      digitThis.style.top = '-66.4vh';
    } else {
      digitThis.style.top = '-' + (num[i]*6+0.4) + 'vh';
    }
  }
}

function counter(counterElement, num, digit) {
  digitTried = 0;
  elementThis = document.querySelector(counterElement);
  num = Math.floor(num).toString();
  if (digit >= 16) {
    digit = 16;
  }
  if (num.length != digit) {
    loopCount = digit-num.length;
    for (var i = 0; i < loopCount; i++) {
      num = '0' + num;
    }
  }
  elementThis.style.width = (3.3*digit+0.3) + 'vh';
  try {
    setDigitPos(counterElement, num, digit);
    if (digit < document.querySelectorAll(counterElement  + ' > .counterNumArea > .counterNumFrame').length) {
      toDelete = document.querySelectorAll(counterElement  + ' > .counterNumArea > .counterNumFrame').length-digit;
      for (var i = 0; i < toDelete; i++) {
        toDeleteElement = document.querySelector(counterElement + ' > .counterNumArea > .counterNumFrame:nth-child(1)');
        toDeleteElement.remove();
      }
    }
  } catch {
    numArea = document.createElement('span');
    numArea.className += "counterNumArea";
    elementThis.appendChild(numArea);
    numAreaElement = document.querySelector(counterElement + ' > .counterNumArea');
    for (var i = digitTried-1; i < digit; i++) {
      frameThis = document.createElement('span');
      frameThis.className += "counterNumFrame";
      numAreaElement.appendChild(frameThis);
      frameThis = document.querySelector(counterElement + ' > .counterNumArea > .counterNumFrame:nth-child(' + (i+1) + ')');
      digitThis = document.createElement('div');
      digitTxt = document.createTextNode('0\ \ 1\ \ 2\ \ 3\ \ 4\ \ 5\ \ 6\ \ 7\ \ 8\ \ 9\ \ E\ \ .');
      digitThis.appendChild(digitTxt);
      digitThis.className += "counterNum";
      frameThis.appendChild(digitThis);
    }
    setDigitPos(counterElement, num, digit);
  }
}
