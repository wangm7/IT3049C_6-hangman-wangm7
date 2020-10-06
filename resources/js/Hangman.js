class Hangman {

  constructor(_canvas) {
    if (!_canvas) {
      throw new Error(`inva lid canvas provided`);
    }
    this.canvas = _canvas;
    this.ctx = this.canvas.getContext(`2d`);
  }

  /**
   * This function takes a difficulty string as a patameter
   * would use the Fetch API to get a random word from the Hangman
   * To get an easy word: https://hangman-micro-service.herokuapp.com//?difficulty=easy
   * To get an medium word: https://hangman-micro-service.herokuapp.com//?difficulty=medium
   * To get an hard word: https://hangman-micro-service.herokuapp.com//?difficulty=hard
   * The results is a json object that looks like this:
   *    { word: "book" }
   * */

     /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is reveived from the API.
   */
  
  getRandomWord(difficulty) {
    return fetch(`https://hangman-micro-service.herokuapp.com//?difficulty=${difficulty}`)
    .then((r) => r.json())
    .then((r) => r.word)
    //.then((r) => console.log(r))
  }
  //    call the game start() method, the callback function should do the following
  //       1. hide the startWrapper
  //       2. show the gameWrapper
  //       3. call the game getWordHolderText and set it to the wordHolderText
  //       4. call the game getGuessessText and set it to the guessesText

   start(difficulty, next) {
    // get word and set it to the class's this.word
    this.word =  this.getRandomWord(difficulty).then((r) => console.log(r));
    // clear canvas
    this.clearCanvas();
    // draw base
    this.drawBase();
    // reset this.guesses to empty array
    if(!this.guess.length){
      this.guess.splice(0, this.guess.length);
      console.log("check this guess" + this.guess)
    }
    // reset this.isOver to false
    this.isOver = false;
    // reset this.didWin to false
    this.didWin = false;
  }


  /**
   *
   * @param {string} letter the guessed letter.
   */
  guess(letter) {
    this.letter = letter;
    
    // Check if nothing was provided and throw an error if so
    try{
    // Check for invalid cases (numbers, symbols, ...) throw an error if it is
      if(!letter == /[a-zA-Z]/g){
        throw new Error(letter + " is not letter! You have to input letters!");
      }
    // Check if more than one letter was provided. throw an error if it is.
      if(letter.length >= 1 ){
       throw new Error("You input more than one letter!");
      }
    // if it's a letter, convert it to lower case for consistency.
    letter.toLocaleLowerCase();
    // check if this.guesses includes the letter. Throw an error if it has been guessed already.
    if(letter == this.guesses){
      throw new Error("You have guessed this letter!");
    }
    //add the new letter to the guesses array.
    for(let i=0; i < letter.length; i++){
        if(letter.charAt(i) === " "){
            this.guess.push(" ");
        }
        else{
            this.guess.push(new Letter(letter.charAt(i)));
        };
    };
    // check if the word includes the guessed letter:
    this.guess.forEach(function(e){
      if(e.letter !== undefined){
          e.checkGuess(guess);
      }
  });

    } catch (error) {
      console.error(error);
      alert(error + error.stack);
    }

  }

  checkWin() {
    // using the word and the guesses array, figure out how many remaining unknowns.
    // if zero, set both didWin, and isOver to true
  }

  /**
   * Based on the number of wrong guesses, this function would determine and call the appropriate drawing function
   * drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, or drawLeftLeg.
   * if the number wrong guesses is 6, then also set isOver to true and didWin to false.
   */
  onWrongGuess() {

  }

  /**
   * This function will return a string of the word placeholder
   * It will have underscores in the correct number and places of the unguessed letters.
   * i.e.: if the word is BOOK, and the letter O has been guessed, this would return _ O O _
   */
  getWordHolderText() {
    this.guessed = false;
    if(this.guessed){
      return this.letter + " ";
  }
  else{
      return "_ ";
  };
}


  /**
   * This function returns a string of all the previous guesses, seperated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    return ``;
  }

  /**
   * Clears the canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //hide the startWrapper
    //show the gameWrapper
    //let gamepanel = document.querySelectorAll('.hidden');
    //console.log(gamepanel);
    //gamepanel[0].remove('.hidden');
    if(startWrapper.style.display ==="none"){
      startWrapper.style.display = "block";
    } else {
      startWrapper.style.display = "none";
      gameWrapper.style.display = 'block';
    }

  }

  /**
   * Draws the hangman base
   */
  drawBase() {
    this.ctx.fillRect(95, 10, 150, 10); // Top
    this.ctx.fillRect(245, 10, 10, 50); // Noose
    this.ctx.fillRect(95, 10, 10, 400); // Main beam
    this.ctx.fillRect(10, 410, 175, 10); // Base
  }

  drawHead() {}

  drawBody() {}

  drawLeftArm() {}

  drawRightArm() {}

  drawLeftLeg() {}

  drawRightLeg() {}
}
