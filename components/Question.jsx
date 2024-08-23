import React from "react"
import Answer from "./Answer"

/*
Props:
- questionNum - ex: question 1
- questionText - question from API associated with question questionNum
- answersArr - answer choices from API associated with question and the current mode, an array of objects
    - Ex: [{answerText: "adios", mode: "default"}, {...}, ...]
*/
export default function Question(props) {
    return (
        <div className = "question-container">
            <h2 className = "h2-style">Question {props.questionNum}</h2>
            <h3 className="h3-style">{props.questionText}</h3>
            <div className = "answer-container">
                {props.answersArr.map(function (answerData, index) {
                    return (
                        <Answer 
                        answerText = {answerData.answerText}
                        mode = {answerData.mode}
                        answerIndex = {index}
                        questionNum = {props.questionNum}
                        changeModeFunct = {props.changeModeFunct}
                        changeUserAnswerIndex = {props.changeUserAnswerIndex}
                        />
                    )
                })}
            </div>
            <hr />
        </div>
    )
}