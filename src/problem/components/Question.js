import React, { useEffect, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Tab from "../../shared/components/Navigation/Tabs";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Input from "../../shared/components/FormElements/Input";
import userIcon from "./user-icon.svg";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hooks";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import "./Question.css";

let lastQuestionIndex = 0;

const Question = (props) => {
  const [loadedQuestions, setloadedQuestions] = useState([]);
  const [loadedQuestionIndex, setloadedQuestionIndex] = useState(0);
  const [questionBody, setQuestionBody] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [showForumEntry, setShowForumEntry] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isForum, setIsForum] = useState(false);
  const [msgContent, setMsgContent] = useState("");
  const [msgTitle, setMsgTitle] = useState("");
  const [msgUser, setMsgUser] = useState("");
  const [msgDate, setMsgDate] = useState("");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      content: {
        value: "",
        isValid: false,
      },
      header: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const forumMessageSubmitHandler = async (event) => {
    event.preventDefault();
    const userName = JSON.parse(
      localStorage.getItem("userData")
    ).userName.toString();

    try {
      const sentMessageResponse = await sendRequest(
        "http://51.138.73.135:8080/Algors/sendMessage",
        "POST",
        JSON.stringify({
          questionId: loadedQuestionIndex.toString(),
          userName: userName,
          body:
            formState.inputs.header.value +
            "^^" +
            formState.inputs.content.value,
        }),
        {}
      );

      console.log("sentMessageResponse");
      console.log(sentMessageResponse);

      closeForumEntryHandler();
    } catch (err) {}
  };

  const openMessageHandler = (content, title, user, date) => {
    setMsgContent(content);
    setMsgTitle(title);
    setMsgUser(user);
    setMsgDate(date);
    setShowMessage(true);
  };

  const closeMessageHandler = () => {
    setShowMessage(false);
  };

  useEffect(() => {
    if (props.index !== null && Object.keys(props.questions).length !== 0) {
      setloadedQuestionIndex(props.index);
      setQuestionBody(props.questions[props.index].questionBody);
      setQuestionName(props.questions[props.index].questionName);
      lastQuestionIndex = Object.keys(props.questions).length;
    }

    let messages = [];
    if (Object.keys(props.messages).length !== 0) {
      Object.values(props.messages).map((message) => {
        const bodySplit = message.body.split("^^");
        const messageTitle = bodySplit[0];
        const messageContent = bodySplit[1];

        messages.push(
          <Card className="forum-message__card">
            <button
              className="forum-message__card_button"
              onClick={() => {
                openMessageHandler(
                  messageContent,
                  messageTitle,
                  message.userName,
                  message.messageDate
                );
              }}
            >
              <div className="forum-message__card__left">
                <img className="center" src={userIcon} alt="user-icon" />
              </div>
              <div className="forum-message__card__right">
                <div className="forum-message__card__right__top">
                  <h2>{messageTitle}</h2>
                </div>
                <div className="forum-message__card__right__buttom">
                  <h4>
                    {message.userName} posted at {message.messageDate}
                  </h4>
                </div>
              </div>
            </button>
          </Card>
        );
      });
      setLoadedMessages(messages);
      console.log("messages:");
      console.log(messages);
    }
  }, [props]);

  const nextButtonHandler = () => props.onIndexChange(loadedQuestionIndex + 1);

  const prevButtonHandler = () => props.onIndexChange(loadedQuestionIndex - 1);

  const openForumEntryHandler = () => setShowForumEntry(true);

  const closeForumEntryHandler = () => {
    props.onNewForumMessage(loadedQuestionIndex);
    setShowForumEntry(false);
  };

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
      content: <div className="forum-content">{loadedMessages}</div>,
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
        className="new-message__modal"
        show={showForumEntry}
        onCancel={closeForumEntryHandler}
        header="Course subjects" // change this to courses name
        headerClass="new-message__modal-header"
        contentClass="course-item__modal-content"
        footerClass="course-item__modal-actions"
        footer={
          <React.Fragment>
            <Button
              type="submit"
              onClick={forumMessageSubmitHandler}
              disabled={!formState.isValid}
            >
              Submit
            </Button>
          </React.Fragment>
        }
      >
        <div className="new-message__content">
          <h2>Forum entry form</h2>
          <form>
            <Input
              element="input"
              id="header"
              type="text"
              placeholder="new message header"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
            <div className="">
              <Input
                element="textarea"
                id="content"
                type="textarea"
                rows="23"
                placeholder="new message content"
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        className="forum-message__modal"
        show={showMessage}
        onCancel={closeMessageHandler}
        header="Forum message" // change this to courses name
        headerClass="forum-message__modal-header"
        contentClass="forum-message__modal-content"
        footerClass="course-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={closeMessageHandler}>CLOSE</Button>
          </React.Fragment>
        }
      >
        <div className="map-container">
          <p>
            posted by {msgUser} at {msgDate}
          </p>
          <h1>{msgTitle}</h1>
          <h2>{msgContent}</h2>
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
        {isForum && (
          <div className="forum-new">
            <Button type="button" onClick={openForumEntryHandler}>
              New
            </Button>
          </div>
        )}
        {!isForum && (
          <div className="questions-nav">
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
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Question;
