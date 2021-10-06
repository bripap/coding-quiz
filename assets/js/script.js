const quiz = document.getElementById("quiz");
const startQuizButton = document.getElementById("startbtn");
const startQuizDiv = document.getElementById("startpage");
const questionsEl = document.getElementById("questions");
const quizTimer = document.getElementById("timer");
const finalScoreEl = document.getElementById("finalScore");
const resultsEl = document.getElementById("result");
const gameoverDiv = document.getElementById("gameover");
const highscoreContainer = document.getElementById("highscoreContainer");
const highscorePage = document.getElementById("highscorePage");
const highscoreInputName = document.getElementById("initials");
const highscoreDisplayName = document.getElementById("highscore-initials");
const endbuttons = document.getElementById("endbuttons");
const submitScoreBtn = document.getElementById("submitScore");
const highscoreDisplayScore = document.getElementById("highscore-score");

const buttonA = document.getElementById("a");
const buttonB = document.getElementById("b");
const buttonC = document.getElementById("c");
const buttonD = document.getElementById("d");

const quizQuestions = [{
    question: "Inside what HTML element do we wrap the JavaScript?",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;javascript&gt;",
    choiceC: "&lt;script&gt;",
    choiceD: "&lt;js&gt;",
    correctAnswer: "c"},
  {
    question: "Where is the correct place to insert a JavaScript into HTML?",
    choiceA: "The bottom of the &lt;body&gt; section",
    choiceB: "The bottom of the &lt;head&gt; section",
    choiceC: "The top of the &lt;head&gt; section",
    choiceD: "The top of the &lt;head&gt; section",
    correctAnswer: "a"},
   {
    question: "How do you call a function named thisFunction?",
    choiceA: "thisFunction{}",
    choiceB: "thisFunction()",
    choiceC: "call thisFunction{}",
    choiceD: "call thisFunction()",
    correctAnswer: "b"},
    {
    question: "How do you declare a JavaScript variable named exampleVar?",
    choiceA: "const exampleVar",
    choiceB: "variable exampleVar",
    choiceC: "let exampleVar",
    choiceD: "both A & C",
    correctAnswer: "d"},
    {
    question: "The first index of an array is ___?",
    choiceA: "0",
    choiceB: "1",
    choiceC: "custom",
    choiceD: "there is no first index",
    correctAnswer: "a"},  
    {
    question: "What is not a Javascript datatype?",
    choiceA: "strings",
    choiceB: "booleans",
    choiceC: "alerts",
    choiceD: "numbers",
    correctAnswer: "c"},
    {
    question: "An if statement is enclosed within...",
    choiceA: "square brackets",
    choiceB: "parentheses",
    choiceC: "quotes",
    choiceD: "curly brackets",
    correctAnswer: "b"},
    ];

let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 76;
let timerInterval;
let score = 0;
let correct;

function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quiz.style.display = "block";
}

function showScore() {
    quiz.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You scored " + score + " out of " + quizQuestions.length + " !";
}

submitScoreBtn.addEventListener("click", function highscore() {
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        let savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        let currentUser = highscoreInputName.value.trim();
        let currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscorePage.style.display = "block";
        endbuttons.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }    
});

function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    let highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        let newNameSpan = document.createElement("li");
        let newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscorePage.style.display = "block";
    endbuttons.style.display = "flex";

    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        timeLeft -= 5;
        currentQuestionIndex++;
        generateQuizQuestion();
    } else{
        showScore();
    }
}

startQuizButton.addEventListener("click",startQuiz);