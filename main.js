const questions = [
    {
        question: "What company was initially known as 'Blue Ribbon Sports'?",
        options: ["Adidas", "Nike", "Puma", "Deckers Brands"],
        correctAnswer: 1
    },
    {
        question: "How many dots appear on a pair of dice?",
        options: ["32", "36", "42", "48"],
        correctAnswer: 2
    },
    {
        question: " What phone company produced the 3310?",
        options: ["Nokia", "Iphone", "Samsung", "Motorola"],
        correctAnswer: 0
    },
    {
        question: "What is the world’s largest retailer? ",
        options: ["Amazon", "Flipkart", "Big Bazaar", "Walmart"],
        correctAnswer: 3
    },
    {
        question: "What city is known as 'The Eternal City'?",
        options: ["Egypt", "Berlin", "Rome", "None of the above"],
        correctAnswer: 2
    },
    {
        question: "How many bones do we have in an ear?",
        options: ["3", "5", "6", "No Bones"],
        correctAnswer: 0
    },
    {
        question: "Which country is credited with inventing ice cream?",
        options: ["America", "Japan", "China", "India"],
        correctAnswer: 2
    },
    {
        question: "What year was the first iPhone released?",
        options: ["2010", "2008", "2007", "2006"],
        correctAnswer: 2
    },
    {
        question: "In what year did World War II end? ",
        options: ["1925", "1918", "1930", "1940"],
        correctAnswer: 3
    },
    {
        question: "In what decade was the internet created?",
        options: ["1980s", "1960s", "1990s", "1950s"],
        correctAnswer: 1
    }
];
let currentQuestionIndex = 0;
let score = 0;
function start(){
    const stbtn = document.getElementById('stbtn');
    stbtn.style.display = 'none';
    const quiz=document.getElementById('quiz');
    quiz.classList.remove('hidden');
}
const loadQuestion = () => {
    const questionContainer = document.getElementById('ques');
    const optionsContainer = document.getElementById('opt');
    const progressContainer = document.getElementById('pro');
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
        <input type="radio" name="answer" id="option-${index}" value="${index}"><label for="option-${index}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });
    progressContainer.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    };
    
const selectAnswer = () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const selectedAnswerIndex = parseInt(selectedOption.value);
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswerIndex === currentQuestion.correctAnswer) {
        ++score;
        }
    }
};
const nextQuestion = () => {
    selectAnswer();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        document.getElementById('pre').disabled = false;
    }
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById('next-btn').textContent = "Finish";
    }
};
const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
    if (currentQuestionIndex === 0) {
        document.getElementById('pre').disabled = true;
    }
};
document.getElementById('next-btn').addEventListener('click', () => {
    if (currentQuestionIndex === questions.length - 1) {
        showResults();
    } else {
        nextQuestion();
    }
});
const showResults = () => {
    const resultContainer = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const feedbackElement = document.getElementById('feedback');
    scoreElement.innerHTML = `Your Score: ${score+1} out of ${questions.length}`;
    if (score / questions.length > 0.8) {
        feedbackElement.innerHTML = "Excellent!";
    } else if (score / questions.length > 0.5) {
        feedbackElement.innerHTML = "Good job!";
    } else {
        feedbackElement.innerHTML = "Keep practicing!";
    }
    document.getElementById('quiz').style.display = 'none';
    resultContainer.classList.remove('hidden');
};
document.getElementById('pre').addEventListener('click', prevQuestion);
document.getElementById('retry-btn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').classList.add('hidden');
    loadQuestion();
    document.getElementById('pre').disabled = true;
    document.getElementById('next-btn').textContent = "Next";
});
loadQuestion();