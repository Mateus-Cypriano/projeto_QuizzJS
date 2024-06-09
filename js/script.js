// Declaração de variaveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0; 

// Perguntas
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]

// Substituição do quizz para a primeira pergunta
function init() {
    //criar a primeira pergunta
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {

    //limpa a questao anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn){
        btn.remove();
    });

    // altera o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // insere as alternativas
    questions[i].answers.forEach(function(answer, i) {

      // cria o template do botão do quizz
      const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
      
      const letterBtn = answerTemplate.querySelector(".btn-letter");
      const answerText = answerTemplate.querySelector(".question-answer");

      letterBtn.textContent = letters[i];
      answerText.textContent = answer['answer'];

      answerTemplate.setAttribute("correct-answer", answer["correct"]);

      //Remove hide e o template class
      answerTemplate.classList.remove("hide");
      answerTemplate.classList.remove("answer-template");

      //inserir a alternativa na tela
      answersBox.appendChild(answerTemplate);

      //inserir evento de clique no botao
      answerTemplate.addEventListener("click", function() {
        checkAnswer(this);
      });

    });

    //incrementar o numero da questao
    actualQuestion++;


  }

  //verificando resposta do usuário
  function checkAnswer(btn) {

    // seleciona todos os botões
    const buttons = answersBox.querySelectorAll("button");

    // verefica se a resposta está correta e adiciona as classes nos botões
    buttons.forEach(function(button) {

      //checa se o usuario acertou a pergunta
      if(button.getAttribute("correct-answer") === "true") {
        
        button.classList.add("correct-answer");

        if(btn === button) {
          //incremento dos postos
          points++;
        }

      } else {
        button.classList.add("wrong-answer");
      }

    });
    
    //Exibe a proxima pergunta
    nextQuestion();
    
  }

  //Exibe a proxima pergunta do quizz.
  function nextQuestion() {

    //timer para usuario verificar as respostas
    setTimeout(function() {
    
      //verifica se ainda ha perguntas
      if(actualQuestion >= questions.length) {
        //apresenta a msg de sucesso
        showSuccessMessage();
        return;
      }

      createQuestion(actualQuestion);

    }, 1500);
  }

  function showSuccessMessage() {
    
  hideOrShowQuizz();

  // trocar dados da tela de sucesso

  // calcular o score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score span");

  displayScore.textContent = score.toString();

  // alterar o número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector("#question-qty");
  totalQuestions.textContent = questions.length;

}

function hideOrShowQuizz() {

  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

//Reiniciar quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
  //zerar o jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();

});

//inicia o quizz
init();
