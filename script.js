let questions = [
    {
        "questiton" : "Wer hat HTML erfunden?",
        "answer_1" : "Robby Williams",
        "answer_2" : "Lady Gaga",
        "answer_3" : "Tim Berners - Lee",
        "answer_4" : "Justin Biber",
        "right_answer" : 3
    },
    {
        "questiton" : "Welches Jahr gilt als das Geburtsjahr des Internets?",
        "answer_1" : "1969",
        "answer_2" : "1984",
        "answer_3" : "1991",
        "answer_4" : "2000",
        "right_answer" : 1
    },
    {
        "questiton" : "Was bedeutet CSS?",
        "answer_1" : "Cascading Style Sheets",
        "answer_2" : "Creative Style System",
        "answer_3" : "Central Simple Syntax",
        "answer_4" : "Coded Style Sheet",
        "right_answer" : 1
    },
    {
        "questiton" : "Welche Programmiersprache wird am häufigsten für die Webentwicklung verwendet?",
        "answer_1" : "Java",
        "answer_2" : "Python",
        "answer_3" : "JavaScript",
        "answer_4" : "C++",
        "right_answer" : 3
    },
    {
        "questiton" : "Wofür steht die Abkürzung HTTP?",
        "answer_1" : "HyperText Transfer Protocol",
        "answer_2" : "HyperText Transmission Protocol",
        "answer_3" : "Hyperlink Text Transfer Protocol",
        "answer_4" : "HighText Transfer Protocol",
        "right_answer" : 1
    },
    {
        "questiton" : "Welche Datei wird normalerweise als Homepage bezeichnet?",
        "answer_1" : "index.html",
        "answer_2" : "home.html",
        "answer_3" : "default.html",
        "answer_4" : "main.html",
        "right_answer" : 1
    },
    {
        "questiton" : "Welche Organisation überwacht die Standards des World Wide Web?",
        "answer_1" : "W3C",
        "answer_2" : "IETF",
        "answer_3" : "ICANN",
        "answer_4" : "ISO",
        "right_answer" : 1
    },
];

let rightQuestions = 0;

let currentQuestion = 0;

let audio_success = new Audio('audio/success.mp3');
let audio_fail = new Audio('audio/fail.mp3');

function init() {
    showQuestion();
  document.getElementById('all-questions').innerHTML = questions.length;
    
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        // Show question
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
  return  currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questinBody').style = 'display: none;';
    document.getElementById('all-right-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-img').src = './img/tropy.png';
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['questiton'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}



function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    if (rightAnswerSelected(selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;
        audio_success.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audio_fail.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber) {
    let question = questions[currentQuestion];
    return selectedQuestionNumber == question['right_answer']
}

function nextQuestion() {
    currentQuestion++; // z.B von 0 auf 1
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function resartGame() {
    document.getElementById('header-img').src = './img/brainbg.jpg';
    document.getElementById('endScreen').style = 'display: none;';
    document.getElementById('questinBody').style = '';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}
