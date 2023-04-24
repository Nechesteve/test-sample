
// Set the time for the quiz in seconds
/*let timeInSeconds = 10;

// Convert the time to minutes and seconds
let minutes = Math.floor(timeInSeconds / 60);
let seconds = timeInSeconds % 60;

// Display the initial time
console.log(`Time remaining:
 ${minutes} minutes ${seconds} seconds`);

// Decrement the timer every second
let timer = setInterval(function() {
  // Decrement the time by 1 second
  timeInSeconds--;

  // Convert the time to minutes and seconds
  minutes = Math.floor(timeInSeconds / 60);
  seconds = timeInSeconds % 60;

  document.querySelector(".timer").innerHTML = "Time Left: " + minutes + ":" +
   (seconds < 10 ? "0" + seconds : seconds);

  // Display the updated time
  console.log(`Time remaining: ${minutes} minutes ${seconds} seconds`);

  // Check if the time has run out
 
  if (timeInSeconds === 0) {
    clearInterval(timer);
    console.log("Time's up!");
    
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/questionLimit)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
  }
}, 1000); */



// Function to calculate quiz results



const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".Home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const eventEl = document.querySelector(".event");

const questionLimit = 5;
//change quiz.length to questionLimit
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOption = [];
let correctAnswers = 0;
let attempt = 0;


function setAvailableQuestions(){
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i])
    }
}

function getNewQuestion(){
  questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;

   const questionIndex = availableQuestions[Math.floor(Math.random()
     * availableQuestions.length)]
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;

  const index1 = availableQuestions.indexOf(questionIndex);
  availableQuestions.splice(index1,1)

  if(currentQuestion.hasOwnProperty("img")){
    const img = document.createElement("img");
    img.src = currentQuestion.img;
    questionText.appendChild(img);
  }

  
const optionLen = currentQuestion.option.length;

optionContainer.innerHTML = '';

let animationDelay = 0.15;

 for (let i=0; i<optionLen; i++) {
  availableOption.push(i);
  }

  for (let i=0; i<optionLen; i++) {
    const optonIndex = availableOption[Math.floor(Math.random() * 
      availableOption.length)]

    const index2 = availableOption.indexOf(optonIndex);
    availableOption.splice(index2,1);

    const option = document.createElement("div");
    option.innerHTML = currentQuestion.option[optonIndex];
    option.id = optonIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick","getResult(this)")
    
  }

  questionCounter++
}

function getResult(element){
  const id = parseInt(element.id);
 
  if(id === currentQuestion.answers){

   element.classList.add("correct");

   updateAnswerIndicator("correct");
   correctAnswers++;
  }
  else {
    element.classList.add("wrong");

    updateAnswerIndicator("wrong");

    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
      if(parseInt(optionContainer.children[i].id) === currentQuestion.answers){
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unclickableOptions();
}

function unclickableOptions(){
  const optionLen = optionContainer.children.length;
  for(let i=0 ; i<optionLen; i++){
    optionContainer.children[i].classList.add("already-answered");
  }
}

function answersIndicator(){
  answersIndicatorContainer.innerHTML = '';
  const totalQuestion = questionLimit;
  for(let i=0; i<totalQuestion; i++){
      const indicator = document.createElement("div");
      answersIndicatorContainer.appendChild(indicator);
  }
}

function updateAnswerIndicator(markType){
  answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function prev(){
 questionLimit - getNewQuestion();
}

function next(){
    if(questionCounter === questionLimit){
/*console.log("quiz over");*/
quizOver();
}
  else{
    getNewQuestion();
  }
}
 function quizOver(){
   quizBox.classList.add("hide");
   resultBox.classList.remove("hide");
   quizResult();
 }

function quizResult(){
  resultBox.querySelector(".total-question").innerHTML = questionLimit;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  const percentage = (correctAnswers/questionLimit)*100;
  resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
  resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
}

function resetQuiz(){
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
  availableQuestions = [];
}

function tryAgainQuiz(){
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");

  resetQuiz();
  startQuiz();
}

function goToHome(){
  resultBox.classList.add("hide");
  homeBox.classList.remove("hide");
  resetQuiz();
}

/*eventEl.addEventListener("click", ()=>{
   // function(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}
)*/

function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}


window.onload = function (){
  homeBox.querySelector(".total-questions").innerHTML = questionLimit;
  }
