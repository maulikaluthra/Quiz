const username = document.getElementById('username');
const saveScore = document.getElementById('save-score-btn');
const finalScore = document.getElementById('final-score');
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScore")) || [];
const max_high_scores = 5;
console.log(highScores);
finalScore.innerText = mostRecentScore;


username.addEventListener("keyup", () => {
	saveScore.disabled = !username.value;
});


saveHighScore = (e) => {
	alert("Your score is saved!");
   e.preventDefault();

	const score = {
		score : mostRecentScore,
		name : username.value
	};

	highScores.push(score);
	highScores.sort( (a,b) => b.score-a.score )
	highScores.splice(max_high_scores);
	localStorage.setItem('highScore', JSON.stringify(highScores));
	window.location.assign('index.html');

};


