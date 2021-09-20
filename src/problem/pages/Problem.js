import React, { useEffect, useState } from "react";
import SplitPane, { Pane } from "react-split-pane";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Answer from "../components/Answer";
import Question from "../components/Question";

import "./Problem.css";

const Problem = () => {
  const courseId = useParams().courseId.toString();
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
    } catch (err) {}
  };

  // canceling pages scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  // loading all questions for the course
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

        setloadedQuestions(questionsResponse.questions);
        questionIndex = questionsResponse.firstQuestionIndex;

        setloadedQuestionIndex(questionsResponse.firstQuestionIndex);
      } catch (err) {}
    };

    fetchQuestions();

  }, [sendRequest]);

  // loading all forum messages for the specific question
  useEffect(() => {
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
