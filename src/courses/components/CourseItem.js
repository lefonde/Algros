import React, { useState } from "react";
import Triangle from "./triangle.svg";
import {} from "@material-ui/core";

//import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

import "./CourseItem.css";

const CourseItem = (props) => {
  const [showCourseDetails, setShowMap] = useState(false);

  const openProblemsListHandler = () => setShowMap(true);

  const closeProblemsListHandler = () => setShowMap(false);

  return (
    <React.Fragment>
      <Modal
        show={showCourseDetails}
        onCancel={closeProblemsListHandler}
        header="Course subjects" // change this to courses name
        contentClass="course-item__modal-content"
        footerClass="course-item__modal-actions"
        footer={
          <React.Fragment>
            <Button to={"/courses/" + props.id + "/course"}>START</Button>
            <Button onClick={closeProblemsListHandler}>CLOSE</Button>
          </React.Fragment>
        }
      >
        <div className="map-container">
          <h2>Subjects</h2>
          <p>{props.subjects}</p>
        </div>
      </Modal>

      <li className="course-item">
        {/* <Card className="course-item__content">
          <div className="course-item__info">
            <div className="course-item__info-item">
              <h2>{props.name}</h2>
            </div>
            <div className="course-item__info-item">
              <div className="course-item__info-info">
                <p>10 problems</p>
                <p>3%</p>
              </div>
            </div>
            <div className="course-item__info-button">
              <Button inverse onClick={openProblemsListHandler}>
                <img style={{margin:'auto'}} src={Triangle} alt="Open" />
              </Button>
            </div>
          </div>
        </Card> */}
        <button onClick={openProblemsListHandler}>
          <Card
            className={`course-item__info  ${
              props.all && `course-item__info--all`
            }  ${props.user && `course-item__info--user`}`}
          >
            <h2>{props.name}</h2>
            {props.user && (
              <div>
                <p>{props.questionsAmount} problems</p>
                <p>{props.completion}</p>
              </div>
            )}
          </Card>
        </button>
      </li>
    </React.Fragment>
  );
};

export default CourseItem;
