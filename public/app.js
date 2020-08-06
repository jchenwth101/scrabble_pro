let scrabbleWords;
getScrabbleWords();
// Get buttons and inputs into JS
const findButton = document.getElementById("find-button");
const jumbledWordInput = document.getElementById('jumbled-word');
const answerText = document.getElementById("answer-text");

//Add the event listeners to those buttons
findButton.addEventListener('click', findWord);

//Gets the scrabble words
async function getScrabbleWords() {
  const response = await fetch('https://raw.githubusercontent.com/benjamincrom/scrabble/master/scrabble/dictionary.json');

  const scrabbleArray = await response.json();
  scrabbleWords = arrayToHashMap(scrabbleArray);
  console.log(scrabbleWords);
}

/*
  bag
  trash
  help

  scrabbleArray[abg] = bag
  scrabbleArray[ahrst] = trash
  scrabbleArray[ehlp] = help
*/
//Creates a hash map, takes all words from dictionary and alphabetizes their characters. We store this in a hash map because its faster
function arrayToHashMap(array) {
  return array.reduce((obj, item) => {
    obj[item.split('').sort().join('')] = item;
    return obj
  }, {});
}

//Actually finds the word in the hash map
function findWord() {
  const alphabetizedJumbledWord = jumbledWordInput.value.split('').sort().join(''); //Alphabetize the jumbled word from the text input

  const answer = scrabbleWords[alphabetizedJumbledWord]; //Find the word in the hash map

  if (answer) {
    answerText.innerText = answer; //Inject the answer from the hash map into the <p> tags
    jumbledWordInput.value = answer;

  }
  else {
    answerText.innerText = 'No word found for input.'
  }
}