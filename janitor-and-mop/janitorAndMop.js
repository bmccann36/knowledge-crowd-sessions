module.exports = { theJanitor, createMapOfCharacterOccurances, calculateDistanceBtwnIdxs, outputBrushWidthAtCorrespondingAlphabetLocation, createEmptyCharMap };

function theJanitor(word) {
  // make the word into an array
  const inputAsArray = word.split("");
  // create an object where each key is a character in the array
  // for now the value of each key can just be an empty array
  const charMapSkeleton = createEmptyCharMap(inputAsArray)
  // figure out first and last index of each char in the input array and store those values in the charMap
  const charMap = createMapOfCharacterOccurances(charMapSkeleton, inputAsArray);
  // calculate each brush width (distance btwn first and last char + 1)
  const mapOfDistances = calculateDistanceBtwnIdxs(charMap);
  // express the answer in the output that the problem asks for
  const answerArray = outputBrushWidthAtCorrespondingAlphabetLocation(mapOfDistances);

  return answerArray;
}

/**
 * 
 * @param {string[]} arrayOfCharacters array where each value is a single character of type string
 * 
 * @returns {object} an object with a key for each unique character in the input array, value at each key is an empty array
 */
function createEmptyCharMap(arrayOfCharacters) {
  const idxMap = {};
  // your code here
  return idxMap;
}

/**
 * 
 * @param {object} emptyCharMap 
 * @param {array} arrayOfCharacters 
 * 
 * @returns {object} a hashMap storing character indecies 
 * 
 * Populates the array values of emptyCharMap. The first and last occurance of each character will be expressed as an array of lenth 1 or 2
 * The first value in the array represents the first occurance of a character, the 2nd value represents the last occurance
 */
function createMapOfCharacterOccurances(emptyCharMap, arrayOfCharacters) {
  // your code here
}

/**
 * 
 * @param {object} mapOfCharOccurances a hashMap where each key is a single character and each value is an array of integers. The arrays will have either a length of 1 or 2
 * @returns {object} a hashMap where each key is a single character and the value of each is a positive integer representing a brush width
 */
function calculateDistanceBtwnIdxs(mapOfCharOccurances) {
  const brushWidthPerChar = {};
  // your code here
  return brushWidthPerChar;
}
/**
 * 
 * @param {object} brushWidthPerChar a hashMap where each key is a single character and the value at each key is a postive integer
 * 
 * @returns {array} an array of integers whose length is 26. Each index represents a corresponding letter in the alphabet
 */
function outputBrushWidthAtCorrespondingAlphabetLocation(brushWidthPerChar) {
  const alphaChars = 'abcdefghijklmnopqrstuvwxyz';
  const answerArray = [];
  // your code here
  return answerArray;
}