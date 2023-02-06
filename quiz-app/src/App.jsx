import { useState } from "react"


function App() {

  const questions = [
    {
      questionText: "What is the largest continent?",
      answerOptions: [
        { answerText: "Russia", isCorrect: false},
        { answerText: "Asia", isCorrect: true},
        { answerText: "Australia", isCorrect: false},
        { answerText: "North America", isCorrect: false}
      ]
    },
    {
      questionText: "Who is the National hero of the Philippines?",
      answerOptions: [
        { answerText: "Gregorio Del Pilar", isCorrect: false},
        { answerText: "Apolinarion Mabini", isCorrect: false},
        { answerText: "Jose Manalo", isCorrect: false},
        { answerText: "Jose Rizal", isCorrect: true}
      ]
    },
    {
      questionText: "What is the Philippines National anthem?",
      answerOptions: [
        { answerText: "Lupang Hinirang", isCorrect: true},
        { answerText: "Bayang Magiliw", isCorrect: false},
        { answerText: "Bahay Kubo", isCorrect: false},
        { answerText: "Leron Leron Sinta", isCorrect: false}
      ]
    },
    {
      questionText: "Who is the most handsome among the list?",
      answerOptions: [
        { answerText: "Piolo Pascual", isCorrect: false},
        { answerText: "John Lloyd Cruz", isCorrect: false},
        { answerText: "Glenn Andaleon", isCorrect: true},
        { answerText: "Jericho Rosales", isCorrect: false}
      ]
    }
  ]

  const [ currentQuestion, setCurrentQuestion] = useState(0);
  const [ showScore, setShowScore ] = useState(false);
  const [ score, setScore ] = useState(0)

  function handleAnswerClick(isCorrect) {
    if(isCorrect){
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if(nextQuestion < questions.length){
      setCurrentQuestion(nextQuestion)
    }else{
      setShowScore(true)
    }
  }
  return (
    <div className="app">
      { showScore ? ( <div className="score-section">
        You scored {score} out of {questions.length} questions.
      </div> ) : ( 
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}/{questions.length}</span>
            </div>
            <div className="question-text">
              {
                questions[currentQuestion].questionText
              }
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button className="button-54" role="button" onClick={ () => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
              ))}
            </div>  
          </div>
        </>
       )}
    </div>
  )
}

export default App
