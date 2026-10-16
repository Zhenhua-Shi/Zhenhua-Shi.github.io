let randomNumber = Math.floor(Math.random() * 100) + 1;

const display_qty_guesses = document.querySelector(".qty_guesses");
const display_history_guesses = document.querySelector(".history_guesses");
const display_last_guess = document.querySelector(".last_guess");
const display_low_high = document.querySelector(".low_high");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let start_over_btn;

function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll(".resultParas p");
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }

  start_over_btn.parentNode.removeChild(start_over_btn);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  display_last_guess.style.backgroundColor = "white";
  randomNumber = Math.floor(Math.random() * 100) + 1;
}


function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  start_over_btn = document.createElement("button");
  start_over_btn.textContent = "Start over";
  document.body.append(start_over_btn);
  start_over_btn.addEventListener("click", resetGame);
}


function checkGuess() {
  const userGuess = Number(guessField.value);
  display_low_high.textContent = "";
  display_last_guess.style.backgroundColor = "red";

  if (guessCount === 1) {
    display_history_guesses.textContent = "History guess(es):";
  }
  display_qty_guesses.textContent = `Number of guess(es): ${guessCount}`;
  display_history_guesses.textContent = `${display_history_guesses.textContent} ${userGuess}`;

  if (userGuess === randomNumber) {
    display_last_guess.textContent = "Congratulations! You got it!";
    display_last_guess.style.backgroundColor = "green";
    setGameOver();
  } else if (guessCount === 10) {
    display_last_guess.textContent = `!!!You guessed wrong ${guessCount} times, GAME OVER!!!`;
    setGameOver();
  } else {
    display_last_guess.textContent = "Wrong!";
    if (userGuess < randomNumber) {
      display_low_high.textContent = "Your last guess was too low!";
    } else if (userGuess > randomNumber) {
      display_low_high.textContent = "Your last guess was too high!";
    }
  }
  guessCount++;
  guessField.value = "";
  guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);
