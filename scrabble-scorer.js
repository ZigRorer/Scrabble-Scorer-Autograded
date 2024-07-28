// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
		 }
	  }
	}
	return letterPoints;
 };

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let promptWord = input.question("Let's play some scrabble! \nEnter a word to score: ");
   return promptWord;
};

let simpleScorer = function(word){
   return word.length;
};

function vowelBonusScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   let vowels = ["a","e","i","o","u"];

   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterPoints += 3;
      } else {
         letterPoints += 1;
      };
   }
   return letterPoints;
};

function scrabbleScorer(word) {
   let score = 0;
   for (const letter of word.toLowerCase()) {
      if (newPointStructure[letter] !== undefined) {
         score += newPointStructure[letter];
      }
   }
   return score;
}; 

let newPointStructure = transform(oldPointStructure);

const scoringAlgorithms = [ {
   name: "Simple: ",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer}, {
   name: "Vowel Bonus: ",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer}, {
   name: "Scrabble: ", 
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
   } ];

function scorerPrompt() {
   console.log(`Which scoring algorithm would you like to use? 
       0 - ${scoringAlgorithms[0].name} ${scoringAlgorithms[0].description}
       1 - ${scoringAlgorithms[1].name} ${scoringAlgorithms[1].description}
       2 - ${scoringAlgorithms[2].name} ${scoringAlgorithms[2].description}`);

   let choice = input.question("Enter 0, 1, or 2: ");
   return scoringAlgorithms[choice];
};

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (const items in oldPointStructure) {
      let pointValue = Number(items);
      let letters = oldPointStructure[items];
      for (const letter of letters) {
         newPointStructure[letter.toLowerCase()] = pointValue;
      }
   }
   return newPointStructure;
};

function runProgram() {
  let word = initialPrompt();
  let selectAlgorithm = scorerPrompt().scorerFunction;
  let score = selectAlgorithm(word);
  console.log(`Score for '${word}': ${score}`);
};

runProgram();

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
