//DOM ELEMENTS
var sourceA, sourceB, button, clearButton;

//SLIDER FOR CONTROLLING JUMBLE RATIO
var slider;

//VARIABLES TO STORE PERCENTAGE RATIONS FOR HYBRIDISING TEXT
var percentOfA = 50;
var percentOfB = 50;

//STRINGS TO STORE THE TEXT FROM BOTH SOURCES
var sourceTextA;
var sourceTextB;

//OBJECTS TO STORE PARTS OF SPEECH OF BOTH OBJECTS
var partsOfSpeechA, partsOfSpeechB;

var sentencesA, wordsA;
var sentencesB, wordsB;

//DEFINE DELIMITERS FOR SPLITTING TEXT INTO SENTENCES/WORDS.
var delimitersForSentences = ".!?";
var delimitersForWords = " .,:;!@#$%&*()\n";

//STRING FOR STORING THE FINAL RESULT OF THE JUMBLED TEXT
var result = "";


function setup() {

  noCanvas();

  //ESSENTIALLY GETTING THE ELEMENTS BY THEIR ID
  sourceA = select('#sourceA');
  sourceB = select('#sourceB');
  button = select('#submit');
  slider = select('#percentslider');

  //CALL handleInput METHOD WHEN THE BUTTON IS CLICKED
  button.mousePressed(function() {
    console.log("jumbling sources")
    jumbleSources();
  });

  //BUTTON TO CLEAR ELEMENTS
  clearButton = select('#clear');
  clearButton.mousePressed(clearText);

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

// Clear all the divs with remove()
function clearText() {
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
}


function jumbleSources() {
  sourceTextA = sourceA.value();
  sourceTextB = sourceB.value();

  if (sourceTextA == '' || sourceTextB == '') {
    alert("please enter text for both sources!")
  } else {

    var formattedSourceTextA, formattedSourceTextB;

    //FORMAT THE STRINGS TO ACCOUNT FOR UNWANTED SPACING / NEW LINES ETC
    formattedSourceTextA = sourceTextA.replace(/\n/g, ' ');
    formattedSourceTextA = formattedSourceTextA.replace(/\s{2,20}/, ' ');
    formattedSourceTextB = sourceTextB.replace(/\n/g, ' ');
    formattedSourceTextB = formattedSourceTextB.replace(/\s{2,20}/, ' ');

    //SPLIT EACH SOURCE TEXT INTO A SEPARATE ARRAY OF WORDS
    wordsA = splitToWords(sourceTextA, delimitersForWords);
    wordsB = splitToWords(sourceTextB, delimitersForWords);

    //CREATE OBJECTS TO STORE/GROUP THE WORDS BY THEIR PARTS OF SPEECH
    partsOfSpeechA = createDict(wordsA);
    partsOfSpeechB = createDict(wordsB);

    //console.log(partsOfSpeechA);

    var destinationText, sourcePOS;

    if (percentOfA == 50 || percentOfA > 50) {
      //destinationText = createBaseText(formattedSourceTextA);
      destinationText = formattedSourceTextA;
      sourcePOS = partsOfSpeechB;
    } else {
      destinationText = formattedSourceTextB;
      // destinationText = createBaseText(formattedSourceTextB);
      sourcePOS = partsOfSpeechA;
    }

    replaceWords(destinationText, sourcePOS);
    //LOOP THROUGH PARTS OF SPEECH AND REMOVE DUPLICATES

  }
}

function replaceWords(dest, src) {
  //BASE REPRESENTS THE BASE TEXT TO BE USED, SOURCE IS THE OTHER SOURCE THAT IS NOT THE BASE

  //LOOP THROUGH ALL WORDS IN BASE TEXT
  console.log(typeof(dest));
  // console.log(dest.length);
  // console.log(dest[0]);

  var destArray = splitToWords(dest, delimitersForWords);

  //console.log(destArray.length);

  for (var i = 0; i < dest.length; i++) {
    if (dest[i] != "." || dest[i] != "!" || dest[i] != "?" || dest[i] != ' ') {
      var rndm = Math.floor(Math.random()*100);

      if (rndm < percentOfA) {
        var keyToChange = RiTa.getPosTags(dest[i])[0]

        for (thisKey in src) {
          if (src.hasOwnProperty(thisKey)) {
            if (thisKey == keyToChange) {
              var lengthOfValues = src[thisKey].length;
              var randomValue = Math.floor(Math.random(lengthOfValues));
       //       console.log(randomValue);
              
              // var valueToSwap = src.thisKey[Math.round(randomValue)];
              // console.log(valueToSwap);
              // replaceWord(dest[i], valueToSwap);
              // console.log("swapping " + dest[i] + "with " + valueToSwap);
              // var wordOptions = src[thisKey];

              //NEED TO LOOP THROUGH EACH KEY TO ACCESS EACH VALUE
              // console.log("key: " + thisKey);
              //console.log("options: " + wordOptions);

              //NOW CHECK AGAINST PARTS OF SPEECH IN OTHER SOURCE
            }
          }
        }
      }
    }
  }

  // for (var i = 0; i < dest.length; i++){


  //TO DO: REMOVE REPEAT CHARACTERS FROM TAGS VALUES

  /*
    //CREATE A BASE TEXT WITH WHICH TO WORK (IE THE REPLACING OF WORDS HAPPENS HERE)
    var result = createBaseText(formattedSourceText); // <---- NEEDS CHANGING
  
    //console.log(result);
    
    //THIS COMES AFTER THE REPLACEMENT HAS HAPPENED
    result = result.join(' '); //joing the separate sentences with a space
    result = result.replace(/\s\./g, '.'); //remove the space between the period and last word of each senetence
  
    console.log("new result:");
    console.log(result);
  */

  return result;
}
//OVERWRITE P5 FUNCTION WITH DAN'S SPLIT_TOKENS
function splitToWords() {
  var d = (arguments.length > 1) ? new RegExp('([' + arguments[1] + '])', 'g') : /\s/g;
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

function createDict(wordsList) {
  var partsOfSpeech = {};

  for (var i = 0; i < wordsList.length; i++) {
    var tag = RiTa.getPosTags(wordsList[i])[0];
    if (!partsOfSpeech[tag]) {
      partsOfSpeech[tag] = [];
    }
    partsOfSpeech[tag].push(wordsList[i]);
  }
  // console.log(partsOfSpeech);
  return partsOfSpeech;
}




function createBaseText(_baseText) {
  //var sentenceArray = [];
  var base = splitToSentences(_baseText, delimitersForSentences);
  //  console.log(typeof(base));
  // console.log(base);
  return base;
}