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
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }; //SCRABBLE

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let promptWord = input.question("Let's play some scrabble! Enter a word: ");
   return promptWord;
   
   //console.log(oldScrabbleScorer(word)); 
   //i can get it to print what i need by calling the functions here but i don't think that's right
}; 

//has one job, score the word elsewhere


let newPointStructure; //move to scrabbleScorer

let simpleScorer = function(word){
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      letterPoints += 1;
   }
console.log(`Score for '${word}': ${letterPoints}`)
   return letterPoints;
}; //makes all letters 1pt!! SIMPLE

let vowelBonusScorer = function(word){
   word = word.toUpperCase();
   let letterPoints = 0;
   const vowels = ["A","E","I","O","U"];

   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterPoints += 3;
      } else {
         letterPoints += 1;
      };
   }
   console.log(`Score for '${word}': ${letterPoints}`)
   
   return letterPoints;
}; //makes vowels 3pts and consonants 1pt BONUS

let scrabbleScorer;

const scoringAlgorithms = [ {
   name: "Simple: ",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer}, {
   name: "Vowel Bonus: ",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer}, {
   name: "Scrabble: ", 
   description: "The traditional scoring algorithm.",
   scorerFunction: oldScrabbleScorer
   } ]; //task 2 should hold three objects

function scorerPrompt() {
   let chooseScorer = input.question(`Which scoring algorithm would you like to use? 
      0 - ${scoringAlgorithms[0].name} ${scoringAlgorithms[0].description}
      1 - ${scoringAlgorithms[1].name} ${scoringAlgorithms[1].description}
      2 - ${scoringAlgorithms[2].name} ${scoringAlgorithms[2].description}
      \n Enter 0, 1, or 2: `);
      //for (item in scoringAlgorithms) ??
      if (chooseScorer === 0) {
         return scoringAlgorithms[0].scorerFunction;
      } else if (chooseScorer === 1) {
         console.log(`${scoringAlgorithms[1].scorerFunction}`);
      } else if (chooseScorer === 2) {
         console.log(`${scoringAlgorithms[2].scorerFunction}`);
      } else {
      console.log("Please try again."); 
      }
      return;
};

function transform() {}; //dont add space property here

function runProgram() {
  let promptWord = initialPrompt();
   scorerPrompt(promptWord);
   
}

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
