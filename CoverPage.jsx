import React from "react"

export default function CoverPage() {
    return (
        <div>
            <div className = "coverpage-container">
                <div className = "title-container">
                    <h1 class = "h1-style">Quizz</h1>
                    <h3 class = "h3-style">Test your knowledge across a wide range of topics!</h3>
                </div>
                <h2 className = "h2-style">Configure your quiz:</h2>
                <form className = "form-container">
                    <div className="form-group">
                        <label htmlFor="form-select">Choose a category:</label>
                        <select class="form-control" id = "form-select" name = "category">
                            <option value="Any category">Any category</option>
                            <option value="Books">Books</option>
                            <option value="Film">Film</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="number-input">Number of questions:</label>
                        <input type="number" className = "form-control" id = "number-input" name = "numQuestions" defaultValue = "5" />
                    </div>

                    <button type="submit" className = "submit-button">Start Quiz</button>
                </form>
            </div>
        </div>
    )
}