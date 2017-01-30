'use strict'

// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This servo module demo turns the servo around
1/10 of its full rotation  every 500ms, then
resets it after 10 turns, reading out position
to the console at each movement.
*********************************************/

var tessel = require('tessel');
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['A']);

var servo1 = 1; // We have a servo plugged in at position 1

const codeToAlpha = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9"
};


servo.on('ready', function () {
  // var position=[0,.33,.66, 1]  //  Target position of the servo between 0 (min) and 1 (max).

  // //  Set the minimum and maximum duty cycle for servo 1.
  // //  If the servo doesn't move to its full extent or stalls out
  // //  and gets hot, try tuning these values (0.05 and 0.12).
  // //  Moving them towards each other = less movement range
  // //  Moving them apart = more range, more likely to stall and burn out
  // var i=0;

        const createAlphaToCode = function(object) {
          let alphaObj = {};
          for (let code in object) {
            let letter = object[code];
            alphaObj[letter] = code;
          }
          return alphaObj;
        };

        const alphaToCode = createAlphaToCode(codeToAlpha);

        function translateFromAlpha(alphaString) {
          let codedString = [];
          let alphaArray = alphaString.toUpperCase().split(' ');

          alphaArray.forEach((word) => {
            let codedWord = '';
            for (let i = 0; i < word.length; i++) {
              codedWord += (alphaToCode[word[i]] + ' ');
            }
            codedString.push(codedWord);
          });

          return codedString.join('/');
        };

        var input = translateFromAlpha('This');
        console.log(input);

// function translateFromCode(codeString) {
//   let alphaString = [];
//   let codeArray = codeString.slice(0,-1).split(' /');

//   codeArray.forEach((word) => {
//     let alphaWord = '';
//     let codeLetters = word.split(' ');
//     console.log(codeLetters);
//     codeLetters.forEach((letterPattern) => {
//       alphaWord += codeToAlpha[letterPattern];
//     });
//     alphaString.push(alphaWord);
//   });

//   return alphaString.join(' ').toLowerCase();
// }

//translateFromCode('- .... .. ... /.. ... /-- -.-- /-- . ... ... .- --. . ');

///NOT WORKING

  //   servo.configure(servo1, 0.05, 0.12, function () {

  //       setInterval(function () {

  //       for (var i = 0; i < input.length; ++i) {
  //           if (input[i] === '.') {
  //               //setInterval(function () {
  //               servo.move(servo1, 0.1);

  //               //}, 1000);
  //           }
  //           else if (input[i] === '-') {
  //               //setInterval(function () {
  //               servo.move(servo1, 0.6);
  //              // }, 1000);
  //           }
  //           else if (input[i] === ' ') {
  //               servo.move(servo1, 0.5);
  //               //setInterval(function () {
  //               //}, 1000);
  //           }
  //           else if (input[i] === '/') {
  //               servo.move(servo1, 0.5);
  //               servo.move(servo1, 0.5);

  //               //setInterval(function () {
  //               //}, 2500);
  //           }

  //       } // loop closed

  //   }, 1000);

  // });

//ORIGINAL

        servo.configure(servo1, 0.05, 0.12, function () {

        for (var i = 0; i < input.length; ++i) {
            if (input[i] === '.') {
                setTimeout(function () {
                servo.move(servo1, 0.1);
                }, 500);
            }
            else if (input[i] === '-') {
                setTimeout(function () {
                servo.move(servo1, 0.6);
                }, 500);
            }
            else if (input[i] === ' ') {
                setTimeout(function () {
                }, 500);
            }
            else if (input[i] === '/') {
                setTimeout(function () {
                }, 1000);
            }

        }

        });


});

