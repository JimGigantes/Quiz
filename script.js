const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

    const timeLeftDisplay = document.querySelector('#time-left')
    const startBtn = document.querySelector('#start-button')
    timeLeft = 60
// trouble
var correct = document.createElement("p");
correct.innerHTML = "Correct"
var wrong = document.createElement("p");
wrong.innerHTML = "Wrong"
var correctcount = 0
var wrongcount = 0

function countdown(){
    setInterval(function(){
        timeLeftDisplay.innerHTML = timeLeft
        timeLeft -= 1
    }, 1000)
    startButton.addEventListener('click',countdown)
}
startButton.addEventListener('click',countdown)



let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
    timeLeft = (timeLeft + 15);
    questionElement.append(correct);
    correctcount++;
  } else {
    element.classList.add('wrong');
    timeLeft = (timeLeft - 10);
    questionElement.append(wrong);
    wrongcount++;
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'The condition in an if/else statement is tenclosed within ___.',
    answers: [
      { text: 'Quotes', correct: false },
      { text: 'Curly brackets', correct: false },
      { text: 'parentheses', correct: true },
      { text: 'Square brackets', correct: false }
    ]
  },
  {
    question: 'Commonly used datatypes DO NOT include:',
    answers: [
      { text: 'Strings', correct: false },
      { text: 'booleans', correct: false },
      { text: 'alerts', correct: true },
      { text: 'numbers', correct: false }
    ]
  },
  {
    question: 'arrays in JavaScript can be used to store _____',
    answers: [
      { text: 'Numbers and strings', correct: false },
      { text: 'other arrays', correct: false },
      { text: 'booleans', correct: false },
      { text: 'all of the above', correct: true }
    ]
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: [
      { text: 'JavaScript', correct: false },
      { text: 'Terminal / Bash', correct: false },
      { text: 'For loops', correct: false },
      { text: 'Console.Log', correct: true }
    ]
  }
]