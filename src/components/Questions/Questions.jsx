import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Questions.css";
import { MoonLoader } from "react-spinners";
import {
  useStatsStore,
  useHighScoreStore,
  useCurrentQuestionDisplayValueStore,
} from "../../Store/Store";
import { motion } from "motion/react";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [startPlaying, setStartPlaying] = useState(false);
  const [quizTimer, setQuizTimer] = useState(10);
  const [error, setError] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { stats, setStats } = useStatsStore();
  const { highScore, setHighScore } = useHighScoreStore();
  const { currentQuestionDisplayValue, setCurrentQuestionDisplayValue } =
    useCurrentQuestionDisplayValueStore();

  const getData = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=10");
      setQuestions(response.data.results);
    } catch (error) {
      setError("Failed to fetch questions. Please try again later.");
    }
  };

  useEffect(() => {
    if (startPlaying) {
      getData();
    }
  }, [startPlaying]);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("High Score");
    if (storedHighScore) {
      setHighScore(storedHighScore);
    }
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
    setCurrentQuestion(0);
    setCurrentQuestionDisplayValue(1);
  };

  const playAgain = async () => {
    await getData();
    setCurrentQuestion(0);
    setCurrentQuestionDisplayValue(1);
    setQuizTimer(10);
    setSelectedOption("");
    setIsAnswered(false);
    setIsCorrect(null);
    setNextQuestion(false);
    setStats(0);
  };

  const nextQuestionFunction = () => {
    setCurrentQuestion(currentQuestion + 1);
    setCurrentQuestionDisplayValue(currentQuestionDisplayValue + 1);
    setSelectedOption("");
    setIsAnswered(false);
    setIsCorrect(null);
    setNextQuestion(false);
    setQuizTimer(10);
  };

  const lastQuestionFunction = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  useEffect(() => {
    if (startPlaying && quizTimer > 0 && !isAnswered) {
      const interval = setInterval(() => {
        setQuizTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (quizTimer === 0 && !isAnswered) {
      setSelectedOption("");
      setIsAnswered(true);
      setNextQuestion(true);
    }
  }, [quizTimer, startPlaying, isAnswered]);

  const currentQ = questions[currentQuestion];

  useEffect(() => {
    if (currentQ) {
      const options = [...currentQ.incorrect_answers, currentQ.correct_answer];
      options.sort(() => Math.random() - 0.5);
      setShuffledOptions(options);
    } else {
      setShuffledOptions([]);
    }
  }, [currentQ]);

  if (startPlaying && questions.length === 0) {
    return (
      <div className="questionsContainer">
        <MoonLoader />
        <span className="errorText">{error}</span>
      </div>
    );
  }
  if (currentQuestion === 10) {
    return (
      <>
        <div className="questionsContainer">
          <div className="endScreenContainer">
            <h2>Thanks for playing you got {stats} points</h2>
            <h2>Youre High Score is {highScore}</h2>
            <button className="questionsButton" onClick={playAgain}>
              Want to play again?
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="questionsContainer">
        {startPlaying ? (
          <>
            <div className="SecondsLeft">
              <h2>{quizTimer} Seconds left</h2>
            </div>
            <div className="quizMainContent">
              <div className="quizMainContentQuestionAndOptions">
                <h1>{decodeHtmlEntities(currentQ.question)}</h1>
                <div className="questionsOptionsContainer">
                  {shuffledOptions.map((option) => (
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
              {isAnswered && currentQuestionDisplayValue === 10 ? (
                <motion.button
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                  }}
                  onClick={lastQuestionFunction}
                  className="questionsButton"
                >
                  Finish Quiz
                </motion.button>
              ) : (
                nextQuestion && (
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
                )
              )}
              {isAnswered &&
                (isCorrect ? (
                  <div>
                    <h2 className="correctAnswer">Correct Answer!</h2>
                  </div>
                ) : (
                  <h2>
                    The correct answer was
                    <span className="correctAnswer">
                      {" "}
                      {decodeHtmlEntities(currentQ?.correct_answer)}
                    </span>
                  </h2>
                ))}
            </div>
          </>
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
      </div>
    </>
  );
}

export default Questions;
