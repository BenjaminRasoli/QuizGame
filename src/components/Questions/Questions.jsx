import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Questions.css";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);

  const getData = async () => {
    const response = await axios.get("https://opentdb.com/api.php?amount=50");
    setQuestions(response.data.results);
    console.log(response.data.results);
  };

  useEffect(() => {
    getData();
  }, []);

  const decodeHtmlEntities = (string) => {
    const doc = new DOMParser().parseFromString(string, "text/html");
    return doc.documentElement.textContent;
  };

  const selectedOptionFunction = (option) => {
    setSelectedOption(option);
  };

  const submitAnswer = () => {
    if (selectedOption === currentQ.correct_answer) {
      setNextQuestion(true);
      setIsCorrect(true);
    } else {
      setIsPlaying(false);
      setIsCorrect(false);
    }
    setIsAnswered(true);
  };

  const playAgain = () => {
    setIsPlaying(true);
    setSelectedOption("");
    setCurrentQuestion(0);
    setIsAnswered(false);
    setIsCorrect(null);
    setNextQuestion(false);
    getData();
  };

  const nextQuestionFunction = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption("");
    setIsAnswered(false);
    setIsCorrect(null);
    setNextQuestion(false);
  };

  if (questions.length === 0) {
    return <div>loading...</div>;
  }

  const currentQ = questions[currentQuestion];
  const options = [...currentQ.incorrect_answers, currentQ.correct_answer];

  return (
    <div className="questionsContainer">
      <div>
        <h1>{decodeHtmlEntities(currentQ.question)}</h1>
        <div className="questionsOptionsContainer">
          {options.map((option) => (
            <button
              onClick={() => selectedOptionFunction(option)}
              key={option}
              className={`questionsButton 
                ${
                  isAnswered && selectedOption === option
                    ? isCorrect
                      ? "correct"
                      : "incorrect"
                    : ""
                }
                ${selectedOption === option ? "selected" : ""}`}
              disabled={!isPlaying || isAnswered}
            >
              {decodeHtmlEntities(option)}
            </button>
          ))}
        </div>
        <button
          onClick={submitAnswer}
          className="questionsButton"
          disabled={!isPlaying || isAnswered}
        >
          Submit Answer
        </button>
        {nextQuestion && (
          <button onClick={nextQuestionFunction} className="questionsButton">
            Next Question
          </button>
        )}
      </div>
      {!isPlaying && (
        <div>
          <h3>Thanks for playing</h3>
          <button className="questionsButton" onClick={playAgain}>Want to play again?</button>
        </div>
      )}
    </div>
  );
}

export default Questions;
