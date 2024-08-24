import React from "react"
import Question from "./Question"

/*
Props:
- changeModeFunct
- changeUserAnswerIndex
- startOver
- formData
- allData: data from the form. Array of objects in the format of:
[{
questionText: "How would one say goodbye in Spanish?", 
answersArr: [
    {
      answerText: "Adios",
      mode: "default"
    },
    {
      answerText: "Hola",
      mode: "default"
    },
    {
      answerText: "Au Revoir",
      mode: "correct"
    },
    {
      answerText: "Salir",
      mode: "wrong"
    }
  ]
}]
*/
export default function QuizPage(props) {
    const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(-1);
    const categories = ["General Knowledge", "Books", "Film", "Music", "Musicals and theatres", "Television", "Video games",
      "board games", "Science and nature", "Computers", "Mathematics", "Mythology", "Sports", "Geography",
      "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Comics", "Gadgets", "Anime",
      "Cartoon and animation"
  ];

    function checkQuizAnswers() {
        setNumCorrectAnswers(0);

        for (let i = 0; i < props.allData.length; i++) {
            const questionData = props.allData[i];
            if (questionData.userAnswerIndex === questionData.answerIndex) {
                setNumCorrectAnswers(function (prevNumCorrect) {
                    return prevNumCorrect + 1;
                });
                props.changeModeFunct(i, questionData.answerIndex, "correct")
            } else {
                props.changeModeFunct(i, questionData.answerIndex, "correct")
                props.changeModeFunct(i, questionData.userAnswerIndex, "wrong")
            }
        }
    }

    function parseResult(numCorrect) {
        const totalQuestions = props.allData.length;
        const percent = Math.round(Number.parseFloat(numCorrect) / totalQuestions * 100);
        return `Your score is: ${numCorrect}/${totalQuestions} (${percent}%)`;
    }

    React.useEffect(function () {
        // console.log(parseResult(numCorrectAnswers));
    }, [numCorrectAnswers]);

    return (
        <div className = "page-container">
            <div className = "quizpage-container">
              <div className="quizinfo-container">
                <h2 className = "h2-style">Question Category: {props.formData.category === "Any" ? "Any" : categories[props.formData.category - 9]}</h2>
              </div>
                <div className="questions-container">
                    {
                        props.allData.map(function (questionData, index) {
                            return (
                                <Question 
                                key = {index}
                                questionNum = {index + 1}
                                questionText = {questionData.questionText} 
                                answersArr = {questionData.answersArr}
                                changeModeFunct = {props.changeModeFunct}
                                changeUserAnswerIndex = {props.changeUserAnswerIndex}
                                numCorrectAnswers = {numCorrectAnswers}
                                answerIndex = {questionData.answerIndex}
                                />
                            )
                        })
                    }
                    {numCorrectAnswers === -1 ? 
                    <h3></h3> : 
                    <div className="result-container">
                        <h3 className = "h3-style">
                            {parseResult(numCorrectAnswers)}
                        </h3>
                    </div>}
                    {numCorrectAnswers === -1 ? // uses numCorrectAnswers to check whether the quiz is submitted
                    <div className = "button-container">
                        <button onClick = {function () {
                            return checkQuizAnswers();
                        }} 
                        className = "button-style" id = "submit-quiz">Submit Quiz</button>
                    </div> : 
                    <div className = "button-container">
                        <button onClick = {function () {
                            setNumCorrectAnswers(-1);
                            return props.startOver();
                        }} 
                        className = "button-style" id = "submit-quiz">Play Again</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}