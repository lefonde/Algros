import React from "react";
import SplitPane, { Pane } from "react-split-pane";
import Answer from "../components/Answer";
import Question from "../components/Question";

import "./Problem.css";

const Problem = () => {
  return (
    <SplitPane split="vertical" minSize={20} defaultSize={700}>
      <Pane initialSize="150px">
        <Question />
      </Pane>
      <Pane initialSize="150px">
        <Answer />
      </Pane>

    </SplitPane>
  );
};

export default Problem;
