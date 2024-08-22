import React from "react"

/*
Props: 
- answerText: an element in answersArr from Question compoennt
- mode: can be "default", "selected", "correct", "wrong" 
    - depending on the mode, style is different
*/
export default function Answer(props) {
    return (
        <div>
            <button className = {props.mode}>{props.answerText}</button>
        </div>
    )
}