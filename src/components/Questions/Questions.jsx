import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Questions.css";
import { MoonLoader } from "react-spinners";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [stats, setStats] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=50");
      setQuestions(response.data.results);
    } catch (error) {
      setError("Failed to fetch questions. Please try again later.");
    }
  };

  useEffect(() => {
    const storedHighScore = localStorage.getItem("High Score");
    if (storedHighScore) {
      setHighScore(storedHighScore);
    }
    getData();
  }, []);

  useEffect(() => {
    if (highScore > 0) {
      localStorage.setItem("High Score", highScore);
    }
  }, [highScore]);

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
      setStats(stats + 1);
      if (stats + 1 > highScore) {
        setHighScore(stats + 1);
      }
    } else {
      setIsPlaying(false);
      setIsCorrect(false);
    }
    setIsAnswered(true);
  };

  const randomNumber = Math.floor(Math.random() * 51);

  const playAgain = () => {
    setIsPlaying(true);
    setSelectedOption("");
    setCurrentQuestion(randomNumber);
    setIsAnswered(false);
    setIsCorrect(null);
    setNextQuestion(false);
    setStats(0);
  };

  const nextQuestionFunction = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption("");
    setIsAnswered(false);
    setIsCorrect(null);
    setNextQuestion(false);
  };

  if (questions.length === 0) {
    return (
      <div className="questionsContainer">
        <MoonLoader />
        {error}
      </div>
    );
  }

  if (stats === 50) {
    return (
      <>
        <div className="questionsContainer">
          <h2>Congratulations you completed all questions!</h2>
          <button className="questionsButton" onClick={playAgain}>
            Want to play again?
          </button>
          <h3>Thanks for playing you got {stats} points</h3>
          <h3>Youre High Score is {highScore}</h3>
        </div>
      </>
    );
  }

  const currentQ = questions[currentQuestion];
  const options = [...currentQ.incorrect_answers, currentQ.correct_answer];

  return (
    <div className="questionsContainer">
      <div>
        <h2>High Score {highScore}</h2>
        <h4>Currenct Score {stats}</h4>
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
          <h3>Thanks for playing you got {stats} points</h3>
          <h3>Youre High Score is {highScore}</h3>
          <h4>
            Correct answer is {decodeHtmlEntities(currentQ.correct_answer)}
          </h4>
          <button className="questionsButton" onClick={playAgain}>
            Want to play again?
          </button>
        </div>
      )}
    </div>
  );
}

export default Questions;
