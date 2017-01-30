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
var fs = require('fs');
var path = require('path');
var txt = path.join(__dirname, 'feedertext.txt');




// Node requires
var twitter = require('twitter');
var twitterHandle = '@tesselproject';
// These OAuth credentials are for the dummy @TesselTweet account
// Paste in your own OAuth details if you want to tweet from your own account
var twit = new twitter({
  consumer_key: 'O7oc0pvsZn4xjgcuHuYdX4FaC',
  consumer_secret: 'iJYuHFz2sD46Nvk3mcwzX8uih14aEAMgVWdWoR59nx8v6Zl7ZX',
  access_token_key: '2529232909-luARGU89K4CKFMvfzBjCgG6ubefzDkdDWkSB85i',
  access_token_secret: 'GXQfuzvGdjLEs3t1HEYfhQ9x9bdBcSBVXjBkbRgwYlOE0'
});


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


var tweets=fs.readFileSync(txt, 'utf8');

console.log(tweets);

//servo.on('ready', function () {
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
          let alphaArray = alphaString.slice(0, -1).toUpperCase().split(' ');

          alphaArray.forEach((word) => {
            let codedWord = '';
            for (let i = 0; i < word.length; i++) {
              codedWord += (alphaToCode[word[i]] + ' ');
            }
            codedString.push(codedWord);
          });

          return codedString.join('/');
        };

        var input = translateFromAlpha(tweets);
        console.log(input);


        // The status to tweet
    var status = 'Morse Translations: ' + tweets + ' = ' + input;
    status = status.slice(0,130)+', etc.';

    // Make a tweet!
    twit.post('statuses/update', {status: status}, function(error, tweet, response){
      if (error) {
        console.log('error sending tweet:', error);
      } else {
        console.log('Successfully tweeted! Tweet text:', tweet.text);
      }
    });

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

servo.on('ready', function () {
 var position = 0;
 var index = 0;
 var count = 0;

 servo.configure(servo1, 0.05, 0.12, function () {


   setInterval(function () {
     console.log('Position (in range 0-1):', input[index], position);

     if (input[index] === '.') {
         if (position + 0.1 > 1) {
              position = position - 0.1;
              servo.move(servo1, position);
         }
         else {
             position = position + 0.1;
             servo.move(servo1, position);
         }

     }
     else if (input[index] === '-') {
               if (position + 0.3 > 1) {
              position = position - 0.3;
              servo.move(servo1, position);
         }
         else {
             position = position + 0.3;
             servo.move(servo1, position);
         }
     } else if (input[index] === '/') {
            //if (position > .5) {
              // position = position - 0.5;
              console.log('?pause?');
              servo.move(servo1, position+.003);
              servo.move(servo1, position-.003);
              servo.move(servo1, position+.003);
              servo.move(servo1, position-.003);
              servo.move(servo1, position+.003);
              servo.move(servo1, position-.003);

     }



     ++index;

   }, 250);

 });
});

