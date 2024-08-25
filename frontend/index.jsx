import React from 'react';
import ReactDOM from 'react-dom/client';
import CoverPage from "./components/CoverPage"
import Question from "./components/Question"
import QuizPage from './components/QuizPage';

function App() {
  // represents the configurations the user provided
  const [formData, setFormData] = React.useState(JSON.parse(localStorage.getItem("formData")) || {
    category: "Any",
    numQuestions: 5
  });

  /*
  local storage implementation, represents what is in defaultValue in CoverPage
  different from formData because formData is always changing with the user, this state does not
  this state only changes at a page load and at the end of the quiz when the startOver function is called
  */
  const [defaultValues, setDefaultValues] = React.useState(JSON.parse(localStorage.getItem("formData")) || {
    category: "Any",
    numQuestions: 5
  })

  /* update formData state every time the user makes changes */
  function handleInput(event) {
    setFormData(function (prevFormData) {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    });
  }

  /* Store formData in local storage */
  React.useEffect(function () {
    localStorage.setItem("formData", JSON.stringify(formData))
  }, [formData])

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

  /* used to trigger API call */
  const [isRunAPI, setIsRunAPI] = React.useState(false); 

  React.useEffect(function() {
    if (isRunAPI) { // do not run when the page first loads
      fetch(getAPILink(formData.category, formData.numQuestions))
        .then(res => res.json())
        .then(function (data) {
          setAllAPIData(data.results)
        })
    }
  }, [isRunAPI])

  function startQuizFunc(event) {
    /* trigger API Call only if user enters valid input for numQuestions */
    if (formData.numQuestions > 0 && formData.numQuestions <= 50) {
      event.preventDefault();
      setIsRunAPI(true);
    } else {
      console.log("number of questions must be between 1 and 50 inclusive")
    }
  }

  /* represents the formatted question-answers data retreived from the API along with other information */
  const [allData, setAllData] = React.useState([]);

  /*
  Changes property userAnswerIndex in allData. Used by child component to 
  change state in parent component
  */
  function changeUserAnswerIndex(questionIndex, newUserAnswerIndex) {
    setAllData(function (prevAllData) {
      return prevAllData.map(function (data, index) {
        return index === questionIndex ? {
          ...data,
          "userAnswerIndex": newUserAnswerIndex
        } : data
      })
    })
  }

  /* 
  Changes property answersArr[answerIndex].mode in allData. Used by child 
  component to change state in parent component
  changeUserAnswerIndex and changeModeFunct are two separate functions because later, 
  changeModeFunct is used to set answers to correct/wrong after the user submits quiz
  */
  function changeModeFunct(questionIndex, answerIndex, newMode) {
    setAllData(function (prevAllData) {
      return prevAllData.map(function (data, i) { // go through each question-answer element in allData
        if (i === questionIndex) {
          const newAnswersArr = data.answersArr.map(function (answer, index) { // go through each answer in answersArr for that question-answer element
            return index === answerIndex ? {
              ...answer,
              mode: newMode
            } : answer
          })
          
          return {
            ...data,
            answersArr: newAnswersArr
          }
        } else {
          return data;
        }
      })
    });
  }

  /* the data from the API call are HTML entities, have to decode before showing to user */
  function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }
  /*
  Example API result of an element in array:
  category: "Entertainment: Television"
  correct_answer: "Green"
  difficulty: "easy"
  incorrect_answers: ['Blue', 'Red', 'Purple']
  question: "In the Star Trek universe, what color is Vulcan blood?"
  type: "multiple"
  */
  /* convert the data retrieved from API into desired format */
  React.useEffect(function() {
    if (allAPIData !== "empty") { // do not run when the page first loads
      const formattedData = allAPIData.map(function (data) {
        const correctAnswerIndex = Math.floor(Math.random() * 4);
        // insert correct answer in random spot in array
        const oldArr = data.incorrect_answers;
        // using slice and concat because they return a new array unlike splice which modifies original
        const answersArr = oldArr.slice(0, correctAnswerIndex).concat(data.correct_answer, oldArr.slice(correctAnswerIndex));
        return {
          "category": data.category,
          "questionText": decodeHTMLEntities(data.question),
          "userAnswerIndex": -1,
          "answerIndex": correctAnswerIndex,
          "answersArr": answersArr.map( // turn each element from String to object and add the property of mode
            function (answerStr) {
              return {
                answerText: decodeHTMLEntities(answerStr),
                mode: "default"
              }
            }
          )
        }
      })
      setAllData(formattedData)
    }
  }, [allAPIData]) // technically can format everything in the first UseEffect function, but code would be too long

  /* called after the user clicks submit quiz button */
  function startOver() {
    /* retrive the user's previous quiz configurations */
    setFormData(JSON.parse(localStorage.getItem("formData")))
    setDefaultValues(JSON.parse(localStorage.getItem("formData")))
    setAllAPIData("empty");
    setIsRunAPI(false);
    setAllData([]);
  }

  return (
    <div>
      {!isRunAPI ? 
      <CoverPage 
      handleInput = {handleInput}
      startQuizFunc = {startQuizFunc}
      defaultValues = {defaultValues}
      /> : 
      <QuizPage 
      allData = {allData} 
      changeModeFunct = {changeModeFunct}
      changeUserAnswerIndex = {changeUserAnswerIndex}
      startOver = {startOver}
      formData = {formData}
      />
      }

    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 

/*
API keys:
Any category: https://opentdb.com/api.php?amount=5&type=multiple
Science and nature: https://opentdb.com/api.php?amount=5&category=17&type=multiple

General knowledge: 9
Books: category 10
Film: category 11
Music: 12
Musicals and theatres: 13
Television: 14
Video games: 15
Board games: 16
Science and nature: 17
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
*/