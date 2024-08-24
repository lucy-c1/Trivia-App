import React from "react"
import Answer from "./Answer"
import ExplainButton from "./ExplainButton"

/*
Props:
- questionNum - ex: question 1
- questionText - question from API associated with question questionNum
- answersArr - answer choices from API associated with question and the current mode, an array of objects
    - Ex: [{answerText: "adios", mode: "default"}, {...}, ...]
- changeModeFunct - change mode property in answersArr array in parent state allData
- changeUserAnswerIndex = change userAnswerIndex property in parent state allData
- numCorrectAnswers
*/
export default function Question(props) {
    /* checks if another answer is already selected and if it is, reset it back to default
    this function only runs before changing an answer from default to selected. Not the other way around
    */
    function checkOtherAnswers() {
        /* anything in answersArr that is selected at this point should be reset back to default */
        props.answersArr.map(function (answer, index) {
            if (answer.mode === "selected") {
                return props.changeModeFunct(props.questionNum - 1, index, "default")
            } else {
                return answer;
            }
        })
    }
    return (
        <div className = "question-container">
            <h2 className = "h2-style">Question {props.questionNum}</h2>
            <h3 className="h3-style">{props.questionText}</h3>
            <div className = "answer-container">
                {props.answersArr.map(function (answerData, index) {
                    return (
                        <Answer 
                        key = {answerData.answerText}
                        answerText = {answerData.answerText}
                        mode = {answerData.mode}
                        answerIndex = {index}
                        questionNum = {props.questionNum}
                        changeModeFunct = {props.changeModeFunct}
                        changeUserAnswerIndex = {props.changeUserAnswerIndex}
                        checkOtherAnswers = {checkOtherAnswers}
                        numCorrectAnswers = {props.numCorrectAnswers}
                        />
                    )
                })}
            </div>
            {/* only show when quiz submits */}
            {props.numCorrectAnswers !== -1 && <ExplainButton />}
            <hr />
        </div>
    )
}