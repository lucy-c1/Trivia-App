import React from "react"

/*
Props
- handleCategoryInput:
    - onChange event on category input
    - setFormData
- handleQuestionNumInput:
    - onChange event on question num input
    - setFormData
- startQuizFunc
    - onClick event on Start Quiz button
    - change CoverPage to QuizPage
*/

export default function CoverPage(props) {
    const categories = ["Books", "Film", "Music", "Musicals and theatres", "Television", "Video games",
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
                        <select onChange = {props.handleInput} className ="form-control form-control-style" id = "form-select" name = "category" defaultValue = {props.defaultValues.category}>
                            <option value="Any">Any category</option>
                            {
                                categories.map(function (category, index) {
                                    return (
                                        <option value = {index + 10}>{category}</option> // plus 10 because API starts num 10
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="number-input" className = "h3-style">Number of questions:</label>
                        <input onChange = {props.handleInput} type="number" className = "form-control form-control-style" id = "number-input" name = "numQuestions" defaultValue = {props.defaultValues.numQuestions} />
                    </div>

                    <button onClick = {props.startQuizFunc} type="submit" className = "button-style" id = "start-quiz-button">Start Quiz</button>
                </form>
            </div>
        </div>
    )
}


/*
API keys:
Any category: https://opentdb.com/api.php?amount=5&type=multiple
Science and nature: https://opentdb.com/api.php?amount=5&category=17&type=multiple
General knowledge: https://opentdb.com/api.php?amount=5&category=9&type=multiple
Books: category 10
Film: category 11
Music: 12
Musicals and theatres: 13
Television: 14
Video games: 15
Board games: 16
Computers: 18
Mathematics: 19
Mythology: 20
Sports: 21
Geography: 22 
History: 23
Politics: 24
Art: 25
Celebreties: 26
Animals: 27
Vehicles: 28
Comics: 29
Gadgets: 30
Anime: 31
Cartoon and animation: 32
You can also get the category name from the API result itself

Allows users to choose num questions (min 5) and the category (or any category)
*/