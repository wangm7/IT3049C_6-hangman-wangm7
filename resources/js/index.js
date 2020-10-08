// START + DIFFICULTY SELECTION
const startWrapper = document.getElementById(`startWrapper`);
const difficultySelectForm = document.getElementById(`difficultySelect`);
const difficultySelect = document.getElementById(`difficulty`);

// GAME
const gameWrapper = document.getElementById(`gameWrapper`);
const guessesText = document.getElementById(`guesses`);
const wordHolderText = document.getElementById(`wordHolder`);

// GUESSING FORM
const guessForm = document.getElementById(`guessForm`);
const guessInput = document.getElementById(`guessInput`);

// GAME START BUTTON 
const startGame = document.getElementById('startBtn');
// GAME GUESS BUTTON
const guessButton = document.getElementById('guessSubmitButton');
// GAME RESET BUTTON
const resetGame = document.getElementById(`resetGame`);

// CANVAS
let canvas = document.getElementById(`hangmanCanvas`);

// The following Try-Catch Block will catch the errors thrown
try {
  // Instantiate a game Object using the Hangman class.
let game = new Hangman(canvas);
  // add a submit Event Listener for the to the difficultySelectionForm
  difficultySelectForm.addEventListener('submit', function (event) { 
    //get the difficulty input
    const difficulty = difficultySelect.value;
    event.preventDefault();
    // call the game start() method, the callback function should do the following
    game.start(difficulty, function(){ 
    //       1. hide the startWrapper
    startWrapper.classList.add('hidden');
    //       2. show the gameWrapper
    gameWrapper.classList.remove('hidden');
    //       3. call the game getWordHolderText and set it to the wordHolderText
    wordHolderText.innerText = game.getWordHolderText();
    //       4. call the game getGuessessText and set it to the guessesText
     guessesText.innerText = game.getGuessesText();
    });

        /*
        if(startWrapper.style.display ==="none"){
          startWrapper.style.display = "block";
        } else {
          startWrapper.style.display = "none";
          gameWrapper.style.display = 'block';
        }
        */

  });

  // add a submit Event Listener to the guessForm
  guessForm.addEventListener(`submit`, function (e) {
    e.preventDefault();
    //    get the guess input
    const letter = guessInput.value;
    //    call the game guess() method
    game.guess(letter);
    //    set the wordHolderText to the game.getHolderText
    wordHolderText.innerText = game.getWordHolderText();
    //    set the guessesText to the game.getGuessesText
    guessesText.innerText = game.getGuessesText();
    //    clear the guess input field
    guessInput.value = '';

  // Given the Guess Function calls either the checkWin or the onWrongGuess methods
  //game.guess(letter);
  // the value of the isOver and didWin would change after calling the guess() function.

  // Check if the game isOver:
  if(game.isOver){
    // 1. disable the guessInput 
    guessInput.setAttribute('disabled', 'disabled');
    //2. disable the guessButton
    guessButton.setAttribute('disabled', 'disabled');
    //3. show the resetGame button
    resetGame.classList.remove(`hidden`);
    console.log("game is over");
    // if the game is won or lost, show an alert.
    if(game.didWin){
      alert('congratulations You won')
    }else{
      alert('you lose')
    }
  }
});

  // add a click Event Listener to the resetGame button

  resetGame.addEventListener(`click`, function (e) {
  //    show the startWrapper
  startWrapper.classList.remove(`hidden`);
  //    hide the gameWrapper
  gameWrapper.classList.add(`hidden`);

  guessInput.removeAttribute('disabled');
  guessButton.removeAttribute('disabled');

  });
} catch (error) {
  console.error(error);
  alert(error + error.stack);
}
