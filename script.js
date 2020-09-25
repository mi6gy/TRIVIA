var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

function start() {
    // console.log(start);

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //IF TIMER REACHES ZER0
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    next();
}

function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizQues = "<h2>" + questions[currentQuestion].question + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        // putting answers in the right button.
        var buttonCode = "<button onclick=\"[answer]\">[select]</button>";

        buttonCode = buttonCode.replace("[select]", questions[currentQuestion].choices[buttonLoop]);

        if (
            questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            // correct answer
            buttonCode = buttonCode.replace("[answer]", "correct()");
        }

        else {
            buttonCode = buttonCode.replace("[answer]", "incorrect()");

        }
        quizQues += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizQues;
}





//stop the timer to end the game 
function endGame() {
    clearInterval(timer);

    var quizQues = `
<h2>GAME OVER!</h2>
<h3>` + score + ` /300</h3>
<h3>You answered ` + score / 50 + ` questions correct.</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizQues;
}

//score
function correct() {
    score += 50;
    next();
}
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizQues = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;

    document.getElementById("quizBody").innerHTML = quizQues;
}

function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

//resets the game upon completion 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizQues = `
<h1>
    New Jersey Trivia
</h1>
<h3>
    Play again.
</h3>
<button onclick="start()">Start!</button>`;
// will restart game after ending

    document.getElementById("quizBody").innerHTML = quizQues;
}

//-15 seconds for incorrect answers
function incorrect() {
    timeLeft -= 15;
    next();
}


var questions = [{
    question: "In June of 1991, which of the following became the Offical State Dinosaur of New Jersey?",
    choices: [
        "Tyrannosaurus",
        "Hadrosaurus",
        "Triceratops",
        "Gallimimus"],
    answer: "Hadrosaurus"
},
{
    question: "New Jersey was the ____ state to ratify the US Constitition.",
    choices: [
        "1st",
        "5th",
        "13th",
        "3rd"],
    answer: "3rd"
},
{
    question: "The street names in the Monopoly board game are named after actual streets in ______ City.",
    choices: [
        "Ocean",
        "Union",
        "Atlantic",
        "Jersey"],
    answer: "Atlantic"
},
{
    question: "Where was the first professional baseball game played?",
    choices: [
        "Hoboken",
        "Newark",
        "New Brunswick",
        "Morristown"],
    answer: "Hoboken"
},
{
    question: "What famous inventor was nicknamed the 'Wizard of Melo Park'?",
    choices: [
        "Phil Murphy",
        "Thomas Edison",
        "Alexander Graham Bell",
        "Henry Ford"],
    answer: "Thomas Edison"
},

{
    question: "Who won very first intercollegiate football game?",
    choices: [
        "Princton",
        "NJIT",
        "Rutgers",
        "Kean"
    ],
    answer: "Rutgers",
}]