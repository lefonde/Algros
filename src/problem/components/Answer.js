import React, { createRef, useEffect, useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";

import "./Answer.css";

const Answer = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSubmissionResult, setLoadedSubmissionResult] = useState(" ");
  const [loadedQuestionIndex, setloadedQuestionIndex] = useState(0);

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
      console.log(loadedQuestionIndex);
      const answerSubmissionResponse = await sendRequest(
        "http://51.138.73.135:8080/Algors/submit",
        "POST",
        JSON.stringify({
          answer: codeString,
          language: "java",
          version: "0",
          courseId: "1",
          userId: "50",
          questionId: loadedQuestionIndex.toString(),
        }),
        {}
      );
      console.log(answerSubmissionResponse);

      let submitResultString = `output:${answerSubmissionResponse.output}, memory:${answerSubmissionResponse.memory}, cpu time:${answerSubmissionResponse.cpuTime}`;
      console.log("answerSubmissionResponse=");
      console.log(submitResultString);

      setLoadedSubmissionResult(submitResultString);
    } catch (err) {}
    console.log(loadedSubmissionResult);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    submitQuestion();
  };

  return (
    <form onSubmit={authSubmitHandler}>
      <Input
        className="codearea"
        id="answer"
        element="codearea"
        validators={[VALIDATOR_MINLENGTH(3)]}
        errorText="Please enter a valid code answer"
        placeholder="test placeholder"
        onInput={inputHandler}
        initialValue={codeString}
        language="js"
        value={codeString}
      />
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <Button type="submit" disabled={formState.isValid}>
        Submit
      </Button>
      {!isLoading && (
        <label id="result" for="submit">
          {loadedSubmissionResult}
        </label>
      )}
    </form>
  );
};

export default Answer;
