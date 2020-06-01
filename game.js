const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressBar = document.getElementById('progress'); 
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
{
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
  ];

// fetch("questions.json")
//   .then(res => {
//     return res.json();
//   })
//   .then(loadedQuestions => {
//     console.log(loadedQuestions);
//     questions = loadedQuestions;
//     startGame();
//   })
//   .catch(err => {
//     console.error(err);
//   });


//CONSTANTS

const corect_bonus = 10;
const max_questions = 3;

startGame = () =>{ 
	questionCounter = 0;
	score = 0;
	availableQuestions = [ ...questions];
	getNewQuestion();
}

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter >= max_questions) {
    //go to the end page
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  	}
	questionCounter++; 
	progressBar.innerText = `Question ${questionCounter}/${max_questions}`;
	//Update the progress bar 
	progressBarFull.style.width = `${ (questionCounter/ max_questions ) * 100 }% `;
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach ( choice => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice' + number];
	});

	availableQuestions.splice(questionIndex, 1);
	acceptingAnswer = true;

};

choices.forEach ( choice => {
	choice.addEventListener("click", e => {
		if(!acceptingAnswer) return;

		acceptingAnswer = false;
		const choiceSelected = e.target;
		const selectedAnswer = choiceSelected.dataset['number'];
		let classToApply = 'incorrect';
		if (selectedAnswer == currentQuestion.answer) {
			classToApply = 'correct';
			incrementScore(corect_bonus);
		}
		choiceSelected.parentElement.classList.add(classToApply);
		setTimeout(() => {
        	choiceSelected.parentElement.classList.remove(classToApply);
        	getNewQuestion();
    	}, 1000);

	});
});

	incrementScore = num => {
		score+=num;
		scoreText.innerText = score;
	};

startGame();
