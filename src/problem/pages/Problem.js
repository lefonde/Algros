import React, { useEffect, useState, useContext } from "react";
import SplitPane, { Pane } from "react-split-pane";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Answer from "../components/Answer";
import Question from "../components/Question";

import "./Problem.css";

const Problem = () => {
  const courseId = useParams().courseId;
  const DEBUG = false;
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedQuestions, setloadedQuestions] = useState([]);
  const [loadedQuestionIndex, setloadedQuestionIndex] = useState(null);
  const [forumMessages, setforumMessages] = useState([]);

  const updateQuestionIndexHandler = (newIndex) => {
    setloadedQuestionIndex(newIndex);
    console.log("updated question index=");
    console.log(newIndex);
  };

  useEffect(() => {
    if (DEBUG) {
      const DEBUG_allForumMessages = {
        messages: {
          1: {
            messageId: 1,
            messageDate: "2021-08-31",
            userName: "mor",
            body: "test",
            questionNumber: 1,
          },
        },
      };

      const DEBUG_allQuestions = {
        firstQuestionIndex: 1,
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
      console.log(DEBUG_allForumMessages.messages);
      setforumMessages(DEBUG_allForumMessages.messages[loadedQuestionIndex]);

      console.log(loadedQuestions);
      console.log(forumMessages);
      return;
    }
    const fetchQuestions = async () => {
      try {
        console.log("sending request");
        const questionsResponse = await sendRequest(
          "http://51.138.73.135:8080/Algors/questions",
          "POST",
          JSON.stringify({
            userId: auth.userId.toString(),
            courseId: courseId.toString(),
          }),
          {}
        );
        setloadedQuestions(questionsResponse.questions);
        setloadedQuestionIndex(questionsResponse.firstQuestionIndex);
      } catch (err) {}
    };

    const fetchAllForumMessages = async () => {
      try {
        const forumMessagesResponse = await sendRequest(
          "http://51.138.73.135:8080/Algors/allForumMessage",
          "POST",
          JSON.stringify({
            questionId: "1",
          }),
          {}
        );
        setforumMessages(forumMessagesResponse.messages);
        console.log(forumMessagesResponse.messages);
      } catch (err) {}
    };

    fetchAllForumMessages();
    fetchQuestions();
  }, [sendRequest]);

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
          {(!isLoading || DEBUG) && (
            <Question
              questions={loadedQuestions}
              index={loadedQuestionIndex}
              messages={forumMessages}
              onIndexChange={updateQuestionIndexHandler}
            />
          )}
        </Pane>
        <Pane initialSize="150px">
          <Answer questionIndex={loadedQuestionIndex} />
        </Pane>
      </SplitPane>
    </React.Fragment>
  );
};

export default Problem;
