import React from "react"

/*
Props
- handleInput:
    - onChange event on category and question num input
    - setFormData
- startQuizFunc
    - onClick event on Start Quiz button
    - change CoverPage to QuizPage
- defaultValues
    - defaultValue property on the two inputs
    - needed for preventing the previous values "Any category" and 5 from 
    appearing when user used other configurations
*/

export default function CoverPage(props) {
    const categories = ["General Knowledge", "Books", "Film", "Music", "Musicals and theatres", "Television", "Video games",
        "board games", "Science and nature", "Computers", "Mathematics", "Mythology", "Sports", "Geography",
        "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Comics", "Gadgets", "Anime",
        "Cartoon and animation"
    ];

    return (
        <div className = "page-container">
            <div className = "coverpage-container">
                <div className = "title-container">
                    <h1 className = "h1-style">Quizz</h1>
                    <h3 className = "h3-style">Test your knowledge across a wide range of topics!</h3>
                </div>
                <h2 className = "h2-style" id = "configure-title">Configure your quiz:</h2>
                <form className = "form-container">
                    <div className="form-group" id = "group1">
                        <label htmlFor="form-select" className = "h3-style">Choose a category:</label>
                        <select onChange = {props.handleInput} className ="form-control form-control-style" id = "form-select" 
                        name = "category" defaultValue = {props.defaultValues.category}>
                            <option value="Any">Any category</option>
                            {
                                categories.map(function (category, index) {
                                    return (
                                        <option value = {index + 9} key = {category}>{category}</option> // plus 9 because API starts num 9
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="number-input" className = "h3-style">Number of questions:</label>
                        <input required min = "1" max = "50" onChange = {props.handleInput} type="number" className = "form-control form-control-style" id = "number-input" 
                        name = "numQuestions" defaultValue = {props.defaultValues.numQuestions} />
                    </div>

                    <button onClick = {props.startQuizFunc} type="submit" className = "button-style" id = "start-quiz-button">Start Quiz</button>
                </form>
            </div>
        </div>
    )
}