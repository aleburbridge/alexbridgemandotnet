let numberTimer;
let blankSpace;
let numberArray;
let numberArrayLength;
let answerArray;

const rightWrongDisplay = document.getElementById("rightWrongDisplay");
const answerInput = document.getElementById("answer_input");
const showNumbersButton = document.getElementById("show_numbers_button");
const lengthCount = document.getElementById("lengthCount");
const numberDisplay = document.getElementById("numberDisplay");
const correctnessDisplay = document.getElementById("correctness_display");
const lengthDisplay = document.getElementById("length_display");

let userAnswer
let correctAnswer

let isGameOver = false;

answerInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") { 
        let correct = checkAnswer(e.target.value);
        if (correct) {
            correctnessDisplay.innerHTML = "Correct! The numbers were " + numberArray
            showNumbersButton.disabled = false;
            answerInput.value = "";
            lengthDisplay.innerHTML = "Length: " + numberArrayLength;
        } else {
            correctnessDisplay.innerHTML = `Incorrect.\nYour answer: ${userAnswer}\nCorrect answer: ${correctAnswer}`
        }
    }
});

function initializeGame() {
    numberArray = []
    numberArrayLength = 3;
    answerArray = []
    answerInput.disabled = true;
    lengthDisplay.innerHTML = "Length: " + numberArrayLength;
    showNumbersButton.innerHTML = "Show Numbers";
}

function populateNumberArray() {
    numberArray = [];
    for (let i = 0; i < numberArrayLength; i++) {
        var currentNumber = Math.floor((Math.random() * 9));
        numberArray.push(currentNumber)
    }
    numberArrayLength++;
}

let t;

function flashEachNumber(count) {
    if (count >= numberArray.length) {
        clearInterval(t);
        answerInput.disabled = false;
        return;
    }

    numberDisplay.innerHTML = numberArray[count];
    numberDisplay.style.visibility = 'visible';

    // Hide the number after 250ms
    setTimeout(() => {
        numberDisplay.style.visibility = 'hidden';
    }, 500);
}

function startRound() {
    if (isGameOver) {
        initializeGame();
    }
    console.log("starting..")
    numberDisplay.innerHTML = "&nbsp;";
    correctnessDisplay.innerHTML = "";
    answerInput.disabled = true;
    showNumbersButton.disabled = true;
    populateNumberArray();
    let count = 0;
    t = setInterval(function() {
        flashEachNumber(count);
        count++;
    }, 1000);
}

function checkAnswer(userInput) {
    var numberString = numberArray.join('');
    if (userInput === numberString) {
        return true;
    }
    userAnswer = userInput;
    gameOver();
}

function gameOver() {
    numberDisplay.style.visibility = "visible";
    numberDisplay.innerHTML = "Game Over!";
    showNumbersButton.innerHTML = "Try Again";
    showNumbersButton.disabled = false;
    correctAnswer = numberArray
    isGameOver = true;
}

initializeGame();