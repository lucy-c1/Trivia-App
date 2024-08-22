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
    return (
        <div className = "page-container">
            <div className = "coverpage-container">
                <div className = "title-container">
                    <h1 class = "h1-style">Quizz</h1>
                    <h3 class = "h3-style">Test your knowledge across a wide range of topics!</h3>
                </div>
                <h2 className = "h2-style" id = "configure-title">Configure your quiz:</h2>
                <form className = "form-container">
                    <div className="form-group" id = "group1">
                        <label htmlFor="form-select" className = "h3-style">Choose a category:</label>
                        <select class="form-control form-control-style" id = "form-select" name = "category">
                            <option value="Any category">Any category</option>
                            <option value="Books">Books</option>
                            <option value="Film">Film</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="number-input" className = "h3-style">Number of questions:</label>
                        <input type="number" className = "form-control form-control-style" id = "number-input" name = "numQuestions" defaultValue = "5" />
                    </div>

                    <button type="submit" className = "button-style" id = "start-quiz-button">Start Quiz</button>
                </form>
            </div>
        </div>
    )
}