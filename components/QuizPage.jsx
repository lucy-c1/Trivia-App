import React from "react"
import Question from "./Question"

/*
Props:
- allData: data from the form. Array of objects in the format of:
[
{
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
},
{
questionText: "How many hearts does an octopus have?", 
answersArr: [
    {
      answerText: "One",
      mode: "default"
    },
    {
      answerText: "Two",
      mode: "default"
    },
    {
      answerText: "Three",
      mode: "selected"
    },
    {
      answerText: "Four",
      mode: "default"
    }
  ]
},
{
questionText: "What is the hottest planet in our solar system?", 
answersArr: [
    {
      answerText: "Mercury",
      mode: "default"
    },
    {
      answerText: "Venus",
      mode: "default"
    },
    {
      answerText: "Mars",
      mode: "selected"
    },
    {
      answerText: "Saturn",
      mode: "default"
    }
  ]
}
]
*/
export default function QuizPage(props) {
    return (
        <div className = "page-container">
            <div className = "quizpage-container">
                <div className="questions-container">
                    {
                        props.allData.map(function (questionData, index) {
                            return (
                                <Question 
                                questionNum = {index + 1}
                                questionText = {questionData.questionText} 
                                answersArr = {questionData.answersArr}
                                />
                            )
                        })
                    }
                    <div className = "button-container">
                        <button className = "button-style" id = "submit-quiz">Submit Quiz</button>
                    </div>
                </div>
            </div>
        </div>
    )
}