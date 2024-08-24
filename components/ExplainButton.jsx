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
    /* array of objects that stores aiResponses, has properties 
    questionNum: acts as id
    aiResponse: "String that represents the response from AI"
    */
    const [aiResponses, setAIResponses] = React.useState([]);

    /* Will need 2 pieces of info: the question and the answer to the question */
    function fetchAIResponse() {
        console.log("Attempting to fetch AI response");
    }

    /* will fetchAIResponse when isClicked is true */
    React.useEffect(() => {
        if (isClicked) {
            console.log("isClicked is true");
            /* TO DO: add code to determine if a response from AI was
            already generated before in aiResponses before running 
            fetchAIResponse */
            fetchAIResponse();
        }
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
                This will eventually be AI generated response~ This will eventually be AI generated response~ This will eventually be AI generated response~
            </p>
            }
        </div>
    )
}