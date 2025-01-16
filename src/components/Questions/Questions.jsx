import axios from "axios";
import React, { useEffect, useState } from "react";

function Questions() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("https://opentdb.com/api.php?amount=1");
      setQuestions(response.data.results);
      console.log(response.data.results);
    };
    getData();
  }, []);
  return (
    <div>
      {questions.map((question, index) => {
        const options = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];

        return (
          <div key={index}>
            <h1>{question.question}</h1>
            {options.map((option) => (
              <button>{option} </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Questions;
