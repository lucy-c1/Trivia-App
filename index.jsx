import React from 'react';
import ReactDOM from 'react-dom/client';
import CoverPage from "./components/CoverPage"
import Question from "./components/Question"
import QuizPage from './components/QuizPage';

function App() {
  // represents the configurations the user provided
  const [formData, setFormData] = React.useState({
    category: "Any",
    numQuestions: 5
  });

  function handleInput(event) {
    // console.log(formData);
    setFormData(function (prevFormData) {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    });
  }

  /* represents all the data from the API, not formatted */
  const [allAPIData, setAllAPIData] = React.useState("empty");

  /* Generate the API link */
  function getAPILink(categoryId, numQuestion) {
    if (categoryId === "Any") {
      return "https://opentdb.com/api.php?amount=5&type=multiple"
    } else {
      return `https://opentdb.com/api.php?amount=${numQuestion}&category=${categoryId}&type=multiple`
    }
  }

  const [isRunAPI, setIsRunAPI] = React.useState(false); 

  React.useEffect(function() {
    if (isRunAPI) { // do not run when the page first loads
      fetch(getAPILink(formData.category, formData.numQuestions))
        .then(res => res.json())
        .then(function (data) {
          console.log(data.results);
          setAllAPIData(data.results)
        })
    }
  }, [isRunAPI])

/*
API result of an element in array:
category: "Entertainment: Television"
correct_answer: "Green"
difficulty: "easy"
incorrect_answers: ['Blue', 'Red', 'Purple']
question: "In the Star Trek universe, what color is Vulcan blood?"
type: "multiple"
*/
  function startQuizFunc(event) {
    event.preventDefault();
    /* Trigger API Call */
    setIsRunAPI(true);
  }

  /* represents the formatted question-answers data retreived from the API along with other information
  */
  const [allData, setAllData] = React.useState([]);

  React.useEffect(function() {
    /* Format the allAPIData into the format we want */
    if (allAPIData !== "empty") { // do not run when the page first loads
      const formattedData = allAPIData.map(function (data) {
        const correctAnswerIndex = Math.floor(Math.random() * 4);
        // insert correct answer in random spot in array
        const oldArr = data.incorrect_answers;
        const answersArr = oldArr.slice(0, correctAnswerIndex).concat(data.correct_answer, oldArr.slice(correctAnswerIndex));
        return {
          "category": data.category,
          "questionText": data.question,
          "answerIndex": correctAnswerIndex,
          "answersArr": answersArr.map( // turn each element from String to object and add the property of mode
            function (answerStr) {
              return {
                answerText: answerStr,
                mode: "default"
              }
            }
          )
        }
      })
      console.log(formattedData)
  
      setAllData(formattedData)
    }
  }, [allAPIData])

  return (
    <div>
      {/* <QuizPage allData = {allData} /> */}
      <CoverPage 
      handleInput = {handleInput}
      startQuizFunc = {startQuizFunc}
      />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 

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