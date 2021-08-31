import React, { useEffect, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Tab from "../../shared/components/Navigation/Tabs";

const Question = (props) => {
  const [loadedQuestions, setloadedQuestions] = useState([]);
  const [loadedQuestionIndex, setloadedQuestionIndex] = useState();
  const [loadedTabContent, setloadedTabContent] = useState([]);


  useEffect(() => {
    setloadedQuestions(props.questions);
    setloadedQuestionIndex(props.index);


    setloadedTabContent([
        {
          title: "Question",
          content: (
            <div>
              <h1>{loadedQuestions[loadedQuestionIndex].questionName}</h1>
              <p>{loadedQuestions[loadedQuestionIndex].questionBody}</p>
            </div>
          ),
        },
        {
          title: "Forum",
          content: "I've made you more content",
        },
      ]);
  }, []);

  //   const tabContent = [
  //     {
  //       title: "Question",
  //       content: "I've made you some content",
  //     },
  //     {
  //       title: "Forum",
  //       content: "I've made you more content",
  //     },
  //   ];

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
              {loadedTabContent.map((tab, idx) => (
                <Tab.TabPane key={`Tab-${idx}`} tab={tab.title}>
                  {tab.content}
                </Tab.TabPane>
              ))}
            </Tab>
          </div>
        </div>
      </div>
      <h1>{props.questions[props.index].questionName}</h1>
      <p>{props.questions[props.index].questionBody}</p>
    </React.Fragment>
  );
};

export default Question;
