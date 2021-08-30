import React, { useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";

import "./Answer.css";

const Answer = () => {
  const codeString =
    "import SyntaxHighlighter from 'react-syntax-highlighter';\nimport { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';\nconst Component = () => {\n  const codeString = '(num) => num + 1';\n  return (\n    <SyntaxHighlighter language=\"javascript\" style={docco}>\n      {codeString}\n    </SyntaxHighlighter>\n  );\n};";

  const [formState, inputHandler] = useForm(
    {
      answer: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  const [code, setCode] = React.useState(
    "import SyntaxHighlighter from 'react-syntax-highlighter';\nimport { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';\nconst Component = () => {\n  const codeString = '(num) => num + 1';\n  return (\n    <SyntaxHighlighter language=\"javascript\" style={docco}>\n      {codeString}\n    </SyntaxHighlighter>\n  );\n};"
  );

  return (
    <form onSubmit={authSubmitHandler}>
      <Input
        id="answer"
        element="codearea"
        label="Your answer:"
        validators={[VALIDATOR_MINLENGTH(3)]}
        errorText="Please enter a valid code answer"
        placeholder="test placeholder"
        onInput={inputHandler}
        initialValue={codeString}
        language="js"
        value={codeString}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Submit
      </Button>
    </form>
  );
};

export default Answer;
