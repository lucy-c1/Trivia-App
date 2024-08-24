import React from "react"

/*
Once the user clicks on Explain Answer, check if an AI response has been
generated before in aiResponses, if not fetch a response from server
*/
/*
props:
- questionNum
- questionText
- answerText: not the index, the text of the correct answer
*/
export default function ExplainButton(props) {
    const [isClicked, setIsClick] = React.useState(false);
    /* String that represents the response from AI */
    const [aiResponse, setAIResponse] = React.useState("");

    function parseInput() {
        return `Question: ${props.questionText} Answer: ${props.answerText}`
    }

    /* Will need 2 pieces of info: the question and the answer to the question */
    function fetchAIResponse() {
        const input = parseInput();
        console.log(input);
    }

    /* will fetchAIResponse when isClicked is true */
    React.useEffect(() => {
        if (isClicked && aiResponse === "") { // only fetch response if explain button is clicked and aiResponse is empty meaning there has not been a response generated before
            fetchAIResponse();
        } // else there's already a response for this question, so no need to do anything. Previously generated response will load
    }, [isClicked])

    function changeIsClicked() {
        setIsClick(function (prevIsClick) {
            return !prevIsClick;
        })
    }

    return (
        <div className = "explain-button-container">
            <button onClick = {changeIsClicked} id = "aiButton">{isClicked ? "△ Hide explanation" : "▽ Explain answer"}</button>
            
            {isClicked && 
            <p id = "aiResponseText">
                {aiResponse}
                This will eventually be AI generated response~ This will eventually be AI generated response~ This will eventually be AI generated response~
            </p>
            }
        </div>
    )
}