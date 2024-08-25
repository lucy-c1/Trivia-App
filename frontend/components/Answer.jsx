import React from "react"

/*
Props: 
- answerText: an element in answersArr from Question compoennt
- mode: can be "default", "selected", "correct", "wrong" 
    - depending on the mode, style is different
- changeModeFunct
- questionNum
- answerIndex: argument for changeUserAnswerIndex and changeModeFunct
- questionNum: argument for changeUserAnswerIndex and changeModeFunct
- changeModeFunct
- changeUserAnswerIndex
- checkOtherAnswers: a child cannot know of what their siblings are
- numCorrectAnswers: used to prevent users from being able to click on an answer after quiz is submitted
    - value of -1 means the quiz is not graded yet which means it has not been submitted yet
*/
export default function Answer(props) {
    return (
        <div>
            <button onClick = {function () {
                if (props.mode === "default" && props.numCorrectAnswers === -1) {
                    props.checkOtherAnswers();
                    props.changeUserAnswerIndex(props.questionNum - 1, props.answerIndex)
                    return props.changeModeFunct(props.questionNum - 1, props.answerIndex, "selected")
                } else if (props.mode === "selected") {
                    props.changeUserAnswerIndex(props.questionNum - 1, -1)
                    return props.changeModeFunct(props.questionNum - 1, props.answerIndex, "default")
                }
            }} className = {props.mode}>{props.answerText}</button>
        </div>
    )
}