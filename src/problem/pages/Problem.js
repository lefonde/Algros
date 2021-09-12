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
  const DEBUG = false;
  const courseId = useParams().courseId.toString();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedMessages, setLoadedMessages] = useState(false);
  const [loadedQuestions, setloadedQuestions] = useState([]);
  const [loadedQuestionIndex, setloadedQuestionIndex] = useState(null);
  const [forumMessages, setforumMessages] = useState([]);
  let questionIndex = 0;

  const updateQuestionIndexHandler = (newIndex) => {
    questionIndex = newIndex;
    setloadedQuestionIndex(newIndex);
    fetchAllForumMessages(newIndex);
    console.log("updated question index=");
    console.log(newIndex);
  };

  const fetchAllForumMessages = async (index) => {
    setLoadedMessages(false);
    try {
      const forumMessagesResponse = await sendRequest(
        "http://51.138.73.135:8080/Algors/allForumMessage",
        "POST",
        JSON.stringify({
          questionId: index.toString(),
        }),
        {}
      );
      setforumMessages(forumMessagesResponse.messages);
      setLoadedMessages(true);
      console.log("forum messages index=");
      console.log(index);
    } catch (err) {}
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    const userId = JSON.parse(
      localStorage.getItem("userData")
    ).userId.toString();

    const fetchQuestions = async () => {
      try {
        const questionsResponse = await sendRequest(
          "http://51.138.73.135:8080/Algors/questions",
          "POST",
          JSON.stringify({
            userId: userId,
            courseId: courseId,
          }),
          {}
        );
        console.log("questionsResponse");
        console.log(questionsResponse);
        setloadedQuestions(questionsResponse.questions);
        questionIndex = questionsResponse.firstQuestionIndex;
        setloadedQuestionIndex(questionsResponse.firstQuestionIndex);
      } catch (err) {}
    };

    fetchQuestions();
  }, [sendRequest]);

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

    fetchAllForumMessages(questionIndex);
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <div className="problem">
        <SplitPane split="vertical" minSize={400} defaultSize={600}>
          <div className="left-pane">
            <Pane>
              {!isLoading && loadedMessages && (
                <Question
                  questions={loadedQuestions}
                  index={loadedQuestionIndex}
                  messages={forumMessages}
                  onIndexChange={updateQuestionIndexHandler}
                  onNewForumMessage={fetchAllForumMessages}
                />
              )}
            </Pane>
          </div>
          <Pane>
            <Answer questionIndex={loadedQuestionIndex} />
          </Pane>
        </SplitPane>
      </div>
    </React.Fragment>
  );
};

export default Problem;
