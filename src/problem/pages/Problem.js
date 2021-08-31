import React, { useEffect, useState } from "react";
import SplitPane, { Pane } from "react-split-pane";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Answer from "../components/Answer";
import Question from "../components/Question";

import "./Problem.css";

const Problem = () => {
  const DEBUG = true;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedQuestions, setloadedQuestions] = useState([]);
  const [loadedQuestionIndex, setloadedQuestionIndex] = useState();

  useEffect(() => {
    if (DEBUG) {
      
      const DEBUG_allQuestions = {
        firstQuestionIndex: 2,
        questions: {
          1: {
            questionId: 1,
            level: "Easy",
            questionName: "sum",
            done: true,
            questionBody: "user gets two numbers and return the sum",
          },
          2: {
            questionId: 2,
            level: "Easy",
            questionName: "array sum",
            done: false,
            questionBody: "user gets arrayrs and return the sum",
          },
        },
      };
      
      setloadedQuestions(DEBUG_allQuestions.questions);
      setloadedQuestionIndex(DEBUG_allQuestions.firstQuestionIndex);
      console.log(loadedQuestions);
      return;
    }
    const fetchQuestions = async () => {
      try {
        const questionsResponse = await sendRequest(
          "http://51.138.73.135:8080/Algors/questions",
          "POST",
          JSON.stringify({
            userId: "1",
            courseId: "1",
          }),
          {}
        );
        setloadedQuestions(questionsResponse);
        console.log(questionsResponse);
      } catch (err) {}
    };

    fetchQuestions(sendRequest);
  }, []);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <SplitPane split="vertical" minSize={20} defaultSize={700}>
        <Pane initialSize="150px">
          {(!isLoading || DEBUG) && <Question questions={loadedQuestions} index={loadedQuestionIndex} />}
        </Pane>
        <Pane initialSize="150px">
          <Answer />
        </Pane>
      </SplitPane>
    </React.Fragment>
  );
};

export default Problem;
