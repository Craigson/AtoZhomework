/*
Future features:
> save button, for saving text
> clear button, for clearing text
> adjusting the slider dynamically changes the text
*/

//DOM ELEMENTS
var sourceA, sourceB, button, clearButton, resultText;

//SLIDER FOR CONTROLLING JUMBLE RATIO
var slider;

//VARIABLES TO STORE PERCENTAGE RATIOS FOR HYBRIDISING / JUMBLING TEXT
var percentOfA = 50;
var percentOfB = 50;

//DROPDOWN MENUS
var dropDownA;
var dropDownB;

//OBJECTS TO STORE PARTS OF SPEECH OF BOTH OBJECTS
var partsOfSpeechA, partsOfSpeechB;

//DEFINE DELIMITERS FOR SPLITTING TEXT INTO SENTENCES/WORDS.
var delimitersForWords = " .,:;!@#$%&*()\n";
var delimitersForElements = " .,:;!@#$%&*()\n";

//STRING FOR STORING THE FINAL RESULT OF THE JUMBLED TEXT
var result = "";

//VARIABLES FOR STORING PRE-LOADED TEXT
/*
var jedi,bible_creation, bible_jacob_dream, bible_sg, children_pigs, erotic_neighbours, erotic_swingers, scifi_clones, scifi_space; 
var jedi_lines,creation_lines, jacob_lines, sg_lines, pigs_lines, neighbour_lines, swingers_lines, clone_lines, space_lines;
*/

var filenames = [ "creation", 
                  "dream", 
                  "sodom", 
                  "threePigs", 
                  "neighbour",
                  "swingers",
                  "clones",
                  "space",
                  "jedi"
                  ]

var files = [ "texts/bible_creation.txt", 
              "texts/bible_jacob_dream.txt",
              "texts/bible_sg.txt", 
              "texts/children_pigs.txt", 
              "texts/erotic_neighbour.txt",
              "texts/erotic_swingers.txt",
              "texts/scifi_clones.txt",
              "texts/scifi_space.txt",
              "texts/fantasy_jedi.txt"
              ]

var rawData = [];

var fileCount = 0;

function loadTexts(filename, index)
{



  loadStrings(filename, loaded);

  function loaded(data)
  {
    rawData[index] = data.join(" ");
    fileCount++;

    if (fileCount == files.length)
    {
      console.log("files loaded");
    }
  }



 // erotic_neighbour = loadStrings("texts/erotic_neighbour.txt ");
  //erotic_swingers = loadStrings("texts/erotic_swingers.txt ");
  //scifi_clones = loadStrings("texts/scifi_clones.txt ");
  // scifi_space = loadStrings("texts/scifi_space.txt");
  // jedi = loadStrings("texts/fantasy_jedi.txt");
/*
  //CREATE STRINGS FROM THE SOURCE TEXTS
  bible_creation.join(" ");
  bible_jacob_dream.join(" ");
  bible_sg.join(" ");
  children_pigs.join(" ");
  erotic_swingers.join(" ");
  erotic_neighbour.join(" ");
  scifi_space.join(" ");
  scifi_clones.join(" ");
  jedi.join(" ");
  */


}

// function animate()
// {
//   var count = 0;

//   function increment(){
//     count = (count + 1) % 100;
//   }

//   return setInterval(increment, 25);
// }

function setup() 
{



  noCanvas();

  //ESSENTIALLY GETTING THE ELEMENTS BY THEIR IDs
  sourceA = select('#sourceA');
  sourceB = select('#sourceB');
  button = select('#submit');
  slider = select('#percentslider');
  resultText = select('#result');
  dropDownA = select('#listA');
  dropDownB = select('#ddB');



  //CALL handleInput METHOD WHEN THE BUTTON IS CLICKED
  button.mousePressed(function() {
    console.log("Jumble Ratio: " + percentOfA + ":" + percentOfB);
    jumbleSources();
  });

  //ADD EVENTLISTENER FOR THE SLIDER
  slider.elt.addEventListener('input', changePercent);

  for (var i = 0; i < files.length; i++)
  {
    loadTexts(files[i], i);
    console.log("should be loading texts");
  }


}

//DEFINE METHODS FOR POPULATING THE TEXT BOXES IF THE USER CHOOSES
//TO SELECT A SOURCE/SOURCES FROM THE DROPDOWN MENU
function loadA()
{
  var list = document.getElementById("listA");
  var listValue = list.options[list.selectedIndex].value;
  console.log("selected: " +listValue);
  var source = " ";
  for (var i = 0; i < filenames.length; i++)
  {
    if (listValue == filenames[i])
    {
      source = rawData[i];
      console.log(source);
    }
  }
  sourceA.html(source); 
}

function loadB()
{
  var list = document.getElementById("listB");
  var listValue = list.options[list.selectedIndex].value;
  var source = " ";

   for (var i = 0; i < filenames.length; i++)
  {
    if (listValue == filenames[i])
    {
      source = rawData[i];
      console.log(source);
    }
  }
  sourceB.html(source);
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

//CREATE A FUNCTION FOR CREATING A DICTIONARY WITH THE PARTS OF SPEECH
//AS THE KEY AND THE WORDS AS THE VALUE
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

//FUNCTION FOR REPLACING A GIVEN WORD
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

//MAIN FUNCTION TO BE EXECTUED WHEN THE 'JUMBLE' BUTTON IS PRESSED,
//REPLACES WORDS IN BASE TEXT, WHICH IS DETERMINED BY THE SLIDER VALUE,
//WITH WORDS MATCHING THE P.O.S FROM THE OTHER TEXT, THEN DISPLAYS THE
//RESULT IN A <div> ON THE HTML PAGE

function jumbleSources() {
  //RETRIEVE THE SOURCE TEXTS FROM THE SEPARATE INPUT FIELDS
  sourceTextA = sourceA.value();
  sourceTextB = sourceB.value();

  var sentenceArray = RiTa.splitSentences(sourceTextA);
  console.log(sentenceArray);

//   var wordsA = splitToWords(sourceTextA);
//   var wordsB = splitToWords(sourceTextB);



// rm = new RiMarkov(2);

// for (var i = 0; i < wordsA.length; i++){
//  rm.loadTokens(wordsA[i]);
// }

// console.log(rm);


// var sentences = rm.generateSentences(10);

// for (var i = 0; i < sentences.length; i++) {
//   println(sentences[i]);
// }
  

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

    if (percentOfA <= 50){
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

