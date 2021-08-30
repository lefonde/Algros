import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [userError, setUserError] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);

    if (isLoginMode) {
      try {
        const loginResponseData = await sendRequest(
          "http://51.138.73.135:8080/Algors/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            userName: "test2",
            password: formState.inputs.password.value,
          }),
          {}
        );

        console.log(loginResponseData);


        if (loginResponseData.userId === -1) {
          setUserError("username or password is incorrect.");
        } else {
          auth.login();
        }
      } catch (err) {}
    } else {
      try {
        const signUpResponseData = await sendRequest(
          "http://51.138.73.135:8080/Algors/signUp",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            userName: formState.inputs.name.value,
            password: formState.inputs.password.value,
          }),
          {}
        );

        console.log(signUpResponseData);

        if (signUpResponseData.userId === -1) {
          setUserError("user already exists.");
        } else {
          auth.login();
        }
      } catch (err) {}
    }
  };

  const clearUserError = () => {
    setUserError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <ErrorModal error={userError} onClear={clearUserError} />
      <Card className="authentication">
        <h2>Just a moment and you're in</h2>
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              placeholder="name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            placeholder="email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            placeholder="password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <div className="authentication__links">
            <button type="button" className="authentication__link">
              forgot password?
            </button>
            <button
              type="button"
              className="authentication__link"
              onClick={switchModeHandler}
            >
              {" "}
              {isLoginMode ? "new bro? sign up." : "oh, we've met? login"}{" "}
            </button>
          </div>
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Sign in" : "Create acount"}
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Auth;