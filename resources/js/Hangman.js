
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
  }
  //    call the game start() method, the callback function should do the following
  //       1. hide the startWrapper
  //       2. show the gameWrapper
  //       3. call the game getWordHolderText and set it to the wordHolderText
  //       4. call the game getGuessessText and set it to the guessesText
  //wordHolderText.textContent

      /*
    this.getRandomWord(difficulty)
    .then(function(res){
      const word = res;
      console.log(word)
    })
    */

 async start(difficulty, next) {
    // get word and set it to the class's this.word
    this.word = await this.getRandomWord(difficulty);
    console.log(this.word);
    // clear canvas
    this.clearCanvas();
    // draw base
    this.drawBase();
    // reset this.guesses to empty array
    this.guesses = [];
    this.getWordHolderText();
    // reset this.isOver to false
    this.isOver = false;
    // reset this.didWin to false
    this.didWin = false;
    next();
  }


  /**
   *
   * @param {string} letter the guessed letter.
   */
  guess(letter) {
    //let guesses = [];
    //let letterWordArr =[]
    this.letter = letter;
    //console.log("you have input " + letter);
    try{
      // Check if nothing was provided and throw an error if so
    if(letter.length < 1){
      throw new Error("You have to input at least one letter!");
    }
    
    // Check for invalid cases (numbers, symbols, ...) throw an error if it is
      if(!letter.match(/[a-zA-Z]/)){
        throw new Error(letter + " is not letter! You have to input letters!");
      } 

    // Check if more than one letter was provided. throw an error if it is.
      if(letter.length > 1 ){
        //console.log("You input more than one letter!");
        throw new Error("You can not input more than one letter!");
        }

      // if it's a letter, convert it to lower case for consistency.
      if(letter == letter.toUpperCase()){
        letter = letter.toLowerCase();
        //console.log(letter);
      }
      // check if this.guesses includes the letter. Throw an error if it has been guessed already.

      if(!this.guesses.includes(letter)){
        //add the new letter to the guesses array.
        this.guesses.push(letter);
        //console.log("the arr " + this.guesses + " now includes " + letter )
    }else{
        throw new Error("You have guessed this letter!");
    }
      
    // check if the word includes the guessed letter:
    if(this.word.includes(letter)){
      this.checkWin()
      console.log("you guess right")
    }else{
      this.onWrongGuess()
      console.log("you guess worng")
    }
    } catch (error) {
      alert(error + error.stack);
    }

  }

  checkWin() {
    // using the word and the guesses array, figure out how many remaining unknowns.
    let wordUnknowns = 
    this.word
    .split('')
    .filter(words => !this.guesses.includes(words)).length;
    console.log(wordUnknowns)
      
    // if zero, set both didWin, and isOver to true
    if(wordUnknowns == 0){
      this.isOver = true;
      this.didWin = true;
    }
  }

  /**
   * Based on the number of wrong guesses, this function would determine and call the appropriate drawing function
   * drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, or drawLeftLeg.
   * if the number wrong guesses is 6, then also set isOver to true and didWin to false.
   */
  onWrongGuess() {
    let wordArrlength = this.word.length;
    let wordArr = this.word.split('');

    let word_onWrongGuess = this.word;
    let guessArr = this.guesses;
    guessArr.filter(function(word){
      word_onWrongGuess.includes(word);
    })
/*
    for(let i=0; i< wordArrlength; i++){
      if(guessArr.length == i){
        this.drawHead();
        this.drawBody();
        this.drawRightArm();
        this.drawLeftArm();
        this.drawRightLeg();
        this.drawLeftLeg();
      }
    }

  */
    if(guessArr.length == 1 ){
      this.drawHead();
    }
    if(guessArr.length == 2 ){
      this.drawBody();
    }
    if(guessArr.length == 3 ){
      this.drawRightArm();
    }
    if(guessArr.length == 4 ){
      this.drawLeftArm();
    }
    if(guessArr.length == 5 ){
      this.drawRightLeg();
    }
    if(guessArr.length == 6 ){
      this.drawLeftLeg();

      this.isOver = true;
      this.didWin = false;
    }
    
    
  }

  /**
   * This function will return a string of the word placeholder
   * It will have underscores in the correct number and places of the unguessed letters.
   * i.e.: if the word is BOOK, and the letter O has been guessed, this would return _ O O _
   */
  getWordHolderText() {
    //this.guessed = false;
    let wordArrlength = this.word.length;
    let wordArr = this.word.split('');
    let guessesArr = this.guesses;
    let wordHolderArr = " ";
    
    for(let i=0; i< wordArrlength; i++){
    if(guessesArr.includes(wordArr[i])){
      wordHolderArr = wordHolderArr + wordArr[i];
        //return wordHolderArr.push(wordArr[i]);
    }else{
      wordHolderArr = wordHolderArr + " _ ";
      //return wordHolderArr.push("_ ");
    };
  }
  console.log(wordHolderArr);
  return wordHolderArr;
}


  /**
   * This function returns a string of all the previous guesses, seperated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    return `Guessed: ` + this.guesses.join(', ');
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

  drawHead() {
    console.log("head")
    //ctx.arc(x, y, radius, srart angle, end angle, false/true);
    //this.ctx.beginPath();
    this.ctx.beginPath();
    this.ctx.arc(250, 85, 25, 0, Math.PI *2, false);
    this.ctx.stroke();
  }

  drawBody() {
    console.log("body")
    this.ctx.fillRect(245, 110, 10, 80, false);
  }

  drawRightArm() {
    console.log("RightArm")
    this.ctx.beginPath();
    this.ctx.moveTo(250, 175);
    this.ctx.lineTo(170, 100);
    this.ctx.stroke();
  }

  
  drawLeftArm() {
    console.log("LeftArm")
    this.ctx.beginPath();
    this.ctx.moveTo(250, 200);
    this.ctx.lineTo(200, 100);
    this.ctx.stroke();
  }

  drawLeftLeg() {
    console.log("LeftLeg")
    this.ctx.beginPath();
    this.ctx.moveTo(250, 175);
    this.ctx.lineTo(300, 200);
    this.ctx.stroke();

  }

  drawRightLeg() {
    console.log("RightLeg")
    this.ctx.beginPath();
    this.ctx.moveTo(250, 140);
    this.ctx.lineTo(200, 190);
    this.ctx.stroke();

  }
}
