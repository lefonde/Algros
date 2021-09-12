import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { Dropdown, Selection } from "react-dropdown-now";
import "react-dropdown-now/style.css";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";

import "./Answer.css";

const Answer = (props) => {
  const courseId = useParams().courseId.toString();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSubmissionResult, setLoadedSubmissionResult] = useState(" ");
  const [loadedQuestionIndex, setloadedQuestionIndex] = useState(0);
  const [languageTemplate, setLanguageTemplate] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("java");

  const javaTemplate =
    "public class Solution {public static void main(String[] args) {System.out.println(-321);} }";
  const python3Template =
    'using System;class Program{ static void Main() { int x = 10; int y = 25; int z = x + y; Console.Write("Sum of x + y = "+ z); }}';

  const languageOptions = [
    { id: "java", value: "java", label: "java" },
    { id: "python3", value: "python3", label: "python3" },
  ];

  const languageTemplates = [
    {
      id: "C#",
      code: 'using System;class Program{ static void Main() { int x = 10; int y = 25; int z = x + y; Console.Write("Sum of x + y = "+ z); }}',
    },
    {
      id: "java",
      code: "public class Solution {public static void main(String[] args) {System.out.println(-321);} }",
    },
  ];

  useEffect(() => {
    setloadedQuestionIndex(props.questionIndex);
  }, [props]);

  const codeString =
    "public class Solution {public static void main(String[] args) {System.out.println(-321);} }";

  const [formState, inputHandler, setFormData] = useForm(
    {
      answer: {
        value: "",
        isValid: false,
      },
      result: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitQuestion = async () => {
    try {
      console.log("answer string to send=");
      console.log(
        document.getElementById("answer").value.replace(/(\r\n|\n|\r)/gm, "")
      );
      
      const userId = JSON.parse(
        localStorage.getItem("userData")
      ).userId.toString();
      
      const answerSubmissionResponse = await sendRequest(
        "http://51.138.73.135:8080/Algors/submit",
        "POST",
        JSON.stringify({
          answer: document.getElementById("answer").value,
          language: selectedLanguage,
          version: "0",
          courseId: courseId,
          userId: userId,
          questionId: loadedQuestionIndex.toString(),
        }),
        {}
      );
      console.log(answerSubmissionResponse);

      let submitResultString = `output:${answerSubmissionResponse.output}, memory:${answerSubmissionResponse.memory}, cpu time:${answerSubmissionResponse.cpuTime}`;
      console.log("answerSubmissionResponse=");
      console.log(submitResultString);

      let test_SubmissionResults = (
        <div>
          {answerSubmissionResponse.error ? (
            <h3 style={{ color: "red" }}>{answerSubmissionResponse.error}</h3>
          ) : (
            <h3 style={{ color: "green" }}>Passed</h3>
          )}
          <h3>{`output: ${answerSubmissionResponse.output}`}</h3>
          {!answerSubmissionResponse.error && (
            <h4>{`memory:${answerSubmissionResponse.memory},  cpu time:${answerSubmissionResponse.cpuTime}`}</h4>
          )}
        </div>
      );

      setLoadedSubmissionResult(test_SubmissionResults);
    } catch (err) {}
    console.log(loadedSubmissionResult);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    submitQuestion();
  };

  return (
    <form className="answer-pane" onSubmit={authSubmitHandler}>
      <div className="codearea">
        {selectedLanguage === "java" && (
          <Input
            id="answer"
            type="text"
            element="codearea"
            validators={[VALIDATOR_MINLENGTH(3)]}
            errorText="Please enter a valid code answer"
            placeholder="test placeholder"
            onInput={inputHandler}
            language="java"
            initialValue={javaTemplate}
          />
        )}
        {selectedLanguage === "python3" && (
          <Input
            id="answer"
            type="text"
            element="codearea"
            validators={[VALIDATOR_MINLENGTH(3)]}
            errorText="Please enter a valid code answer"
            placeholder="test placeholder"
            onInput={inputHandler}
            language="csharp"
            initialValue={python3Template}
          />
        )}
      </div>
      <div className="answer-footer">
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        <Dropdown
          id="languages-dropdown"
          placeholder="Select an option"
          className="language-selector"
          options={languageOptions}
          value="java"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => {
            // const input = document.getElementById("answer");
            // input.value = languageTemplates.find(
            //   (entry) => entry.id === value.value
            // )
            //   ? languageTemplates.find((entry) => entry.id === value.value).code
            //   : "no template";
            // const event = new Event("text", { bubbles: true });
            // input.dispatchEvent(event);
            setSelectedLanguage(value.value)
          }}
          onClose={(closedBySelection) =>
            console.log("closedBySelection?:", closedBySelection)
          }
          onOpen={() => console.log("open!")}
        />
        <Button
          className="item-relative"
          type="submit"
          disabled={formState.isValid}
        >
          Submit
        </Button>
        {!isLoading && (
          <label id="result" for="submit">
            {loadedSubmissionResult}
          </label>
        )}
      </div>
    </form>
  );
};

export default Answer;
