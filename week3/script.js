//DOM ELEMENTS
var sourceA, sourceB, button, clearButton, resultText;

//SLIDER FOR CONTROLLING JUMBLE RATIO
var slider;

//VARIABLES TO STORE PERCENTAGE RATIOS FOR HYBRIDISING / JUMBLING TEXT
var percentOfA = 50;
var percentOfB = 50;

//OBJECTS TO STORE PARTS OF SPEECH OF BOTH OBJECTS
var partsOfSpeechA, partsOfSpeechB;

//DEFINE DELIMITERS FOR SPLITTING TEXT INTO SENTENCES/WORDS.
var delimitersForWords = " .,:;!@#$%&*()\n";
var delimitersForElements = " .,:;!@#$%&*()\n";

//STRING FOR STORING THE FINAL RESULT OF THE JUMBLED TEXT
var result = "";

function setup() {

  noCanvas();

  //ESSENTIALLY GETTING THE ELEMENTS BY THEIR ID
  sourceA = select('#sourceA');
  sourceB = select('#sourceB');
  button = select('#submit');
  slider = select('#percentslider');
  resultText = select('#result');

  //CALL handleInput METHOD WHEN THE BUTTON IS CLICKED
  button.mousePressed(function() {
    console.log("Jumble Ratio: " + percentOfA + ":" + percentOfB);
    jumbleSources();
  });

  //ADD EVENTLISTENER FOR THE SLIDER
  slider.elt.addEventListener('input', changePercent);
}

//FUNCTION FOR MAKING USE OF SLIDER VALUES
function changePercent() {
  var spanA = select('#percentA');
  var spanB = select('#percentB');

  percentOfA = slider.value();
  percentOfB = 100 - percentOfA;

  spanA.html(percentOfA);
  spanB.html(percentOfB);
}

function createPOSlist(wordsList){

var partsOfSpeech = {};

  for (var i = 0; i < wordsList.length; i++) {
    var tag = RiTa.getPosTags(wordsList[i])[0];
    if (!partsOfSpeech[tag]) {
      partsOfSpeech[tag] = [];
    }
    partsOfSpeech[tag].push(wordsList[i]);
   // console.log(wordsList[i]);
  }
  return partsOfSpeech;
}

//
function replaceWord(tagToReplace, pos){

  var s = "";
  
  for (thisKey in pos) {
    if (pos.hasOwnProperty(thisKey)) {
      if (tagToReplace == thisKey){
        var valueArrayLength = pos[thisKey].length;
        var r = floor(Math.random()*valueArrayLength);
        
        var newWord = pos[thisKey][r];
        //s = newWord + "(" + thisKey + ")";
        s = newWord;
      }
    }
  }
//console.log(s);
return s;
}

function jumbleSources() {
  //RETRIEVE THE SOURCE TEXTS FROM THE SEPARATE INPUT FIELDS
  sourceTextA = sourceA.value();
  sourceTextB = sourceB.value();

  //CREATE AN ALERT IF EITHER SOURCE IS LEFT BLANK
  if (sourceTextA == '' || sourceTextB == '') {
    alert("please enter text for both sources!")
  } else {

    var formattedSourceTextA, formattedSourceTextB;

    //FORMAT THE STRINGS TO ACCOUNT FOR UNWANTED SPACING / NEW LINES ETC
    formattedSourceTextA = sourceTextA.replace(/\n/g, ' ');
    formattedSourceTextA = formattedSourceTextA.replace(/\s{2,20}/, ' ');
    formattedSourceTextB = sourceTextB.replace(/\n/g, ' ');
    formattedSourceTextB = formattedSourceTextB.replace(/\s{2,20}/, ' '); 


    var destinationText, words, replacementPOS, threshold;

    if (percentOfA >= 50){
        destinationText = splitToElements(formattedSourceTextA, delimitersForElements);
        var words = formattedSourceTextB.split(/[ .,:;!@#$%&*()\n]/);
        threshold = percentOfA;
      } else{
        destinationText = splitToElements(formattedSourceTextB, delimitersForElements);
        var words = formattedSourceTextA.split(/[ .,:;!@#$%&*()\n]+/);
        threshold = percentOfB;
    }

    console.log(threshold);

    //CREATE AN OBJECT THAT CONTAINS A LIST OF PARTS OF SPEECH AS KEYS, WITH EACH VALUE BEING AN
    //ARRAY THAT CONTAINS ALL THE RELATIVE WORDS FROM THE SOURCE TEXT
    replacementPOS = createPOSlist(words);

    var res = [];

    var r = /[ .,:;!@#$%&*()\n]/;

    //console.log(destinationText);
   for (var i = 0; i < destinationText.length; i++){
      // for (elt in destinationText){
        
      var currentElement = destinationText[i];

      var randVal = Math.random()*100;

       if (randVal < threshold){
          if (r.test(currentElement) == false){
            //CODE TO SWAP PART OF S

            var currentPOStag = RiTa.getPosTags(currentElement);
            //----------
            var replacement = replaceWord(currentPOStag, replacementPOS);
            //----------
            console.log("replacing \"" + currentElement + "(" + currentPOStag + ")" + "\" with \"" + replacement + "\"");
            
            res.push(replacement);

          } else {
            res.push(currentElement);
          }
       } else {
        res.push(currentElement);
       }
     }

      var resString = res.join("");

    //  console.log(resString);

      // resultText.html("Result contains a jumble ratio (A:B) of " + percentOfA + ":" + percentOfB + "\n" + resString);
resultText.html(resString);
    }
} // END OF jumbleSources()



//OVERWRITE P5 FUNCTION WITH DAN'S SPLIT_TOKENS
function splitToWords() {
  var d = (arguments.length > 1) ? new RegExp('[' + arguments[1] + ']', 'g') : /\s/g;
  return arguments[0].split(d).filter(function(n) {
    return n;
  });
}

function splitToElements() {
  var d = (arguments.length > 1) ? new RegExp('([' + arguments[1] + ']+)', 'g') : '/\s/g';
  return arguments[0].split(d).filter(function(n) {
    return n;
  });
}

//SPLIT TEXT INTO SENTENCES, RETAINING SPACES AND PUNCTUATION MARKS AS ELEMENTS IN THE ARRAY
function splitToSentences() {
  var d = (arguments.length > 1) ? new RegExp('([' + arguments[1] + '])', 'g') : /\s/g;
  return arguments[0].split(d).filter(function(n) {
    return n;
  });
}

