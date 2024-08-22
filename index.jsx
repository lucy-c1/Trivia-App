import React from 'react';
import ReactDOM from 'react-dom/client';
import CoverPage from "./components/CoverPage"
import Question from "./components/Question"
import QuizPage from './components/QuizPage';

function App() {
  const questionNum = 1;
  const questionText = "How would one say goodbye in Spanish?";
  const answersArr = [
    {
      answerText: "Adios",
      mode: "default"
    },
    {
      answerText: "Hola",
      mode: "selected"
    },
    {
      answerText: "Au Revoir",
      mode: "correct"
    },
    {
      answerText: "Salir",
      mode: "wrong"
    }
  ];

  const APIData = [
    {
    questionText: "How would one say goodbye in Spanish?", 
    answersArr: [
        {
          answerText: "Adios",
          mode: "default"
        },
        {
          answerText: "Hola",
          mode: "default"
        },
        {
          answerText: "Au Revoir",
          mode: "correct"
        },
        {
          answerText: "Salir",
          mode: "wrong"
        }
      ]
    },
    {
    questionText: "How many hearts does an octopus have?", 
    answersArr: [
        {
          answerText: "One",
          mode: "default"
        },
        {
          answerText: "Two",
          mode: "default"
        },
        {
          answerText: "Three",
          mode: "selected"
        },
        {
          answerText: "Four",
          mode: "default"
        }
      ]
    },
    {
    questionText: "What is the hottest planet in our solar system?", 
    answersArr: [
        {
          answerText: "Mercury",
          mode: "default"
        },
        {
          answerText: "Venus",
          mode: "default"
        },
        {
          answerText: "Mars",
          mode: "selected"
        },
        {
          answerText: "Saturn",
          mode: "default"
        }
      ]
    }
    ];

  return (
    <div>
      {/* <Question 
      questionNum = {questionNum}
      questionText = {questionText}
      answersArr = {answersArr}
      />
      <Question 
      questionNum = {questionNum}
      questionText = {questionText}
      answersArr = {answersArr}
      /> */}
      <QuizPage APIData = {APIData} />
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