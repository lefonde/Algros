import React, { useEffect, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Tab from "../../shared/components/Navigation/Tabs";
import Button from "../../shared/components/FormElements/Button";

let lastQuestionIndex = 0;
const Question = props => {
  const [loadedQuestions, setloadedQuestions] = useState([]);
  const [loadedQuestionIndex, setloadedQuestionIndex] = useState(0);
  const [questionBody, setQuestionBody] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [loadedTabContent, setloadedTabContent] = useState([]);

  let messages = [];
  if (
    props.questions.length !== 0 &&
    props.index &&
    props.messages.length !== 0
  ) {
    
    messages = props.messages;
  }

  useEffect(() => {

    if(props.index !== null && Object.keys(props.questions).length !== 0) {
      setloadedQuestionIndex(props.index);
      setloadedQuestions(props.questions)
      setQuestionBody(props.questions[props.index].questionBody)
      setQuestionName(props.questions[props.index].questionName)
      lastQuestionIndex = Object.keys(props.questions).length;
    }
  }, [props]);

  const nextButtonHandler = () => {
    props.onIndexChange(loadedQuestionIndex + 1);
  }

  const prevButtonHandler = () => {
    props.onIndexChange(loadedQuestionIndex - 1);
  }

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
      content: "messages",
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
      <div className="row">
        <div className="col text-center">
          <div className="row text-left">
            <Tab>
              {tabContent.map((tab, idx) => (
                <Tab.TabPane key={`Tab-${idx}`} tab={tab.title}>
                  {tab.content}
                </Tab.TabPane>
              ))}
            </Tab>
          </div>
        </div>
      </div>
      <Button type="button" disabled={loadedQuestionIndex === 1} onClick={prevButtonHandler}>Prev</Button>
      <Button type="button" disabled={loadedQuestionIndex === lastQuestionIndex} onClick={nextButtonHandler}>Next</Button>
    </React.Fragment>
  );
};

export default Question;
