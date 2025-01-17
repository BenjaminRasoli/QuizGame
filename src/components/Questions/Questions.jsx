import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Questions.css";
import { MoonLoader } from "react-spinners";
import { useStatsStore, useHighScoreStore } from "../../Store/Store";
import { motion } from "motion/react";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [startPlaying, setStartPlaying] = useState(false);
  const [error, setError] = useState("");
  const { stats, setStats } = useStatsStore();
  const { highScore, setHighScore } = useHighScoreStore();

  const getData = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=10");
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
      setIsCorrect(true);
      setStats(stats + 1);
      if (stats + 1 > highScore) {
        setHighScore(stats + 1);
      }
    } else {
      setIsCorrect(false);
    }
    setNextQuestion(true);
    setSelectedOption("");
    setIsAnswered(true);
  };

  const startToPlay = () => {
    setStartPlaying(true);
  };

  const randomNumber = Math.floor(Math.random() * 11);

  const playAgain = () => {
    setSelectedOption("");
    setCurrentQuestion(0);
    setIsAnswered(false);
    setIsCorrect(null);
    setNextQuestion(false);
    setStats(0);
    getData();
  };

  const nextQuestionFunction = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption("");
    setIsAnswered(false);
    setIsCorrect(null);
    setNextQuestion(false);
  };

  if (startPlaying && questions.length === 0) {
    return (
      <div className="questionsContainer">
        <MoonLoader />
        {error}
      </div>
    );
  }

  if (currentQuestion === 10) {
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

  const currentQ = questions && questions[currentQuestion];
  const options = currentQ
    ? [...currentQ.incorrect_answers, currentQ.correct_answer]
    : [];

  return (
    <div className="questionsContainer">
      {startPlaying && (
        <div className="numberOfQuestion">
          {currentQuestion + 1}/{questions.length}
        </div>
      )}
      {startPlaying ? (
        <div>
          <h1>{decodeHtmlEntities(currentQ.question)}</h1>
          <h3>Select an option</h3>
          <div className="questionsOptionsContainer">
            {options.map((option) => (
              <button
                onClick={() => selectedOptionFunction(option)}
                key={option}
                className={`questionsButton 
      ${
        isAnswered
          ? option === currentQ.correct_answer
            ? "correct"
            : "incorrect"
          : ""
      }
      ${selectedOption === option ? "selected" : ""}`}
                disabled={isAnswered}
              >
                {decodeHtmlEntities(option)}
              </button>
            ))}
          </div>
          {selectedOption && (
            <motion.button
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
              }}
              onClick={submitAnswer}
              className="questionsButtonSubmit"
              disabled={isAnswered || !selectedOption}
            >
              Submit Answer
            </motion.button>
          )}
          {nextQuestion && (
            <motion.button
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
              }}
              onClick={nextQuestionFunction}
              className="questionsButton"
            >
              Next Question
            </motion.button>
          )}
        </div>
      ) : (
        <motion.button
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
          }}
          className="questionsButtonStart"
          onClick={startToPlay}
        >
          Press to start quiz
        </motion.button>
      )}
      {isAnswered &&
        (isCorrect ? (
          <div>
            <h2>Correct Answer!</h2>
          </div>
        ) : (
          <h2>
            The correct answer was{" "}
            {decodeHtmlEntities(currentQ?.correct_answer)}
          </h2>
        ))}
    </div>
  );
}

export default Questions;
