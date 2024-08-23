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

  // local storage implementation, represents what is in defaultValue in CoverPage
  // different from formData because formData is always changing with the user, this state does not
  // this state only changes at a page load and at the end of the quiz when the startOver function is called
  const [defaultValues, setDefaultValues] = React.useState(JSON.parse(localStorage.getItem("formData")) || {
    category: "Any",
    numQuestions: 5
  })

  function handleInput(event) {
    // console.log(formData);
    setFormData(function (prevFormData) {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    });
  }

  /* Store formData in local storage */
  React.useEffect(function () {
    // console.log(formData)
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

  const [isRunAPI, setIsRunAPI] = React.useState(false); 

  React.useEffect(function() {
    if (isRunAPI) { // do not run when the page first loads
      fetch(getAPILink(formData.category, formData.numQuestions))
        .then(res => res.json())
        .then(function (data) {
          // console.log(data.results);
          setAllAPIData(data.results)
        })
    }
  }, [isRunAPI])

  function startQuizFunc(event) {
    /* Trigger API Call only if user enters valid input for numQuestions */
    if (formData.numQuestions > 0 && formData.numQuestions <= 50) {
      event.preventDefault();
      setIsRunAPI(true);
    } else {
      console.log("number of questions must be between 1 and 50 inclusive")
    }
  }

  /* represents the formatted question-answers data retreived from the API along with other information
  */
  const [allData, setAllData] = React.useState([]);

  // React.useEffect(function () {
  //   console.log(allData);
  //   console.log("Hello????????")
  // }, [allData])

  /* Changes property userAnswerIndex in allData. Used by child component to change state in parent component
  Takes in 2 parameters: questionIndex and newUserAnswerIndex
  */
  function changeUserAnswerIndex(questionIndex, newUserAnswerIndex) {
    // console.log("Question index: " + questionIndex)
    // console.log("New user answer index: " + newUserAnswerIndex)
    setAllData(function (prevAllData) {
      return prevAllData.map(function (data, index) {
        // console.log(data)
        // console.log(index)
        // console.log(index === questionIndex ? {
        //   ...data,
        //   "userAnswerIndex": newUserAnswerIndex
        // } : data)
        return index === questionIndex ? {
          ...data,
          "userAnswerIndex": newUserAnswerIndex
        } : data
      })
    })
  }

  /* Changes property answersArr[answerIndex].mode in allData. Used by child component to change state in parent component
  Takes in 3 parameters: questionIndex, answerIndex, and newMode
  */
  function changeModeFunct(questionIndex, answerIndex, newMode) {
    // console.log("Question index: " + questionIndex);
    // console.log("Answer index: " + answerIndex);
    // console.log("new mode: " + newMode);

    setAllData(function (prevAllData) {
      return prevAllData.map(function (data, i) { // go through each question-answer element in array
        if (i === questionIndex) {
          const newAnswersArr = data.answersArr.map(function (answer, index) { // go through each answer in answersArr
            return index === answerIndex ? {
              ...answer,
              mode: newMode
            } : answer
          })
          
          // console.log(newAnswersArr)

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

  function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }
  /*
  API result of an element in array:
  category: "Entertainment: Television"
  correct_answer: "Green"
  difficulty: "easy"
  incorrect_answers: ['Blue', 'Red', 'Purple']
  question: "In the Star Trek universe, what color is Vulcan blood?"
  type: "multiple"
  */
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
      // console.log(formattedData)
  
      setAllData(formattedData)
    }
  }, [allAPIData]) // technically I can format it in the first UseEffect function, but I feel like the code is getting long...

  function startOver() {
    // setFormData({
    //   category: "Any",
    //   numQuestions: 5
    // })
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