/*Game Rules:
- Player must guess a number between a min and max 
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose 
- Let player choose to play again
*/

let min = 1, 
  max = 10, 
  winningNumber = getRandomNum(min, max),
  guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
minNum = document.querySelector('.min-num'),
maxNum = document.querySelector('.max-num'),
guessBtn = document.querySelector('#guess-btn'),
guessInput = document.querySelector('#guess-input'),
message = document.querySelector('.message');

//Assign UI min and max 
minNum.textContent= min;
maxNum.textContent= max;

//Play Again event listener
game.addEventListener('mousedown', function(e){  
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

//Listen for guess
  guessBtn.addEventListener('click', function(){          let guess = parseInt(guessInput.value);

  //Validate 
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  //Check if won
    if( guess === winningNumber){    
      gameOver(true, `${winningNumber} is correct, YOU WIN!`);
    }
    else {
      //Wrong guess
      guessesLeft -= 1;
      if(guessesLeft === 0){
        //Game Over - Lost
        gameOver(false, `You Lost!😞😞.The correct guess was ${winningNumber}. Better guess next time...`);
      }
      else {
        //Game Continue
        //Change border color
        guessInput.style.borderColor = 'red';
        //Tell user that the guess made was wrong
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`);
        //Clear the guess-input field
        guessInput.value = '';
      } 
    }
  });

//Game Over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red'; 
  //Disable input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //Set message
  setMessage(msg, color);

  //Play Again
  guessBtn.value = 'Play Again';
  //Appended a class because if it might has a class then that will not overwritten 
  guessBtn.className += 'play-again';
}

//Getting winning number
function getRandomNum(min, max){
  return (Math.floor(Math.random()*(max-min+1) + min ));
}

function setMessage(msg, color){
  message.style.color = color;
  message.textContent =  msg;
}