import React, { useEffect, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Tab from "../../shared/components/Navigation/Tabs";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Input from "../../shared/components/FormElements/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hooks";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import "./Question.css"

let lastQuestionIndex = 0;
const Question = (props) => {
  const [loadedQuestions, setloadedQuestions] = useState([]);
  const [loadedQuestionIndex, setloadedQuestionIndex] = useState(0);
  const [questionBody, setQuestionBody] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [showForumEntry, setShowForumEntry] = useState(false);
  const [isForum, setIsForum] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      content: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const forumMessageSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const sentMessageResponse = await sendRequest(
        "http://51.138.73.135:8080/Algors/sendMessage",
        "POST",
        JSON.stringify({
          questionId: "1",
          userName: "test14@test.com",
          body: formState.inputs.content.value,
        }),
        {}
      );

      console.log("sentMessageResponse");
      console.log(sentMessageResponse);
    } catch (err) {}
  };

  useEffect(() => {
    if (props.index !== null && Object.keys(props.questions).length !== 0) {
      setloadedQuestionIndex(props.index);
      setloadedQuestions(props.questions);
      setQuestionBody(props.questions[props.index].questionBody);
      setQuestionName(props.questions[props.index].questionName);
      lastQuestionIndex = Object.keys(props.questions).length;
    }

    let messages = [];
    if (Object.keys(props.messages).length !== 0) {
      Object.values(props.messages).map((message) => {
        messages.push(<h1>{message.body}</h1>);
      });
      setLoadedMessages(messages);
      console.log("messages:");
      console.log(messages);
    }
  }, [props]);

  const nextButtonHandler = () => props.onIndexChange(loadedQuestionIndex + 1);

  const prevButtonHandler = () => props.onIndexChange(loadedQuestionIndex - 1);

  const openForumEntryHandler = () => setShowForumEntry(true);

  const closeForumEntryHandler = () => setShowForumEntry(false);

  const forumTabHandler = () => setIsForum(true);

  const questionTabHandler = () => setIsForum(false);

  let tabContent = [
    {
      title: "Question",
      content: (
        <div>
          <h1>{questionName}</h1>
          <p>{questionBody}</p>
        </div>
      ),
    },
    {
      title: "Forum",
      content: <div>{loadedMessages}</div>,
    },
  ];

  if (!props.questions || props.questions.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No questions found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Modal
        show={showForumEntry}
        onCancel={closeForumEntryHandler}
        header="Course subjects" // change this to courses name
        contentClass="course-item__modal-content"
        footerClass="course-item__modal-actions"
        footer={
          <React.Fragment>
            <Button
              type="button"
              onClick={forumMessageSubmitHandler}
              disabled={!formState.isValid}
            >
              Submit
            </Button>
          </React.Fragment>
        }
      >
        <div className="map-container">
          <h2>Forum entry form</h2>
          <form>
            <Input
              element="input"
              id="content"
              type="text"
              placeholder="new message content"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </form>
        </div>
      </Modal>
      <div className="question-content">
        <div className="tabs">
          <Tab>
            {tabContent.map((tab, idx) => (
              <Tab.TabPane
                className="tab"
                key={`Tab-${idx}`}
                tab={tab.title}
                onTabSelected={idx === 1 ? forumTabHandler : questionTabHandler}
                onTab
              >
                {tab.content}
              </Tab.TabPane>
            ))}
          </Tab>
        </div>
        <div className="forum-new">
          {isForum && (
            <Button type="button" onClick={openForumEntryHandler}>
              New
            </Button>
          )}
        </div>
        {!isForum && <div className="questions-nav">
          <Button
            type="button"
            disabled={loadedQuestionIndex === 1}
            onClick={prevButtonHandler}
          >
            Prev
          </Button>
          <Button
            type="button"
            disabled={loadedQuestionIndex === lastQuestionIndex}
            onClick={nextButtonHandler}
          >
            Next
          </Button>
        </div>}
      </div>
    </React.Fragment>
  );
};

export default Question;
