import React, { useState } from "react";
import {} from "@material-ui/core";

import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";

import "./CourseItem.css";

const CourseItem = (props) => {
  const [showCourseDetails, setShowCourseDetails] = useState(false);

  const openProblemsListHandler = () => setShowCourseDetails(true);

  const closeProblemsListHandler = () => setShowCourseDetails(false);

  return (
    <React.Fragment>
      <Modal
        show={showCourseDetails}
        onCancel={closeProblemsListHandler}
        header="Course subjects" // change this to courses name
        headerClass="course-problems-list__modal-header"
        contentClass="course-item__modal-content"
        footerClass="course-item__modal-actions"
        footer={
          <React.Fragment>
            <Button to={"/courses/" + props.id + "/course"}>START</Button>
            <Button onClick={closeProblemsListHandler}>CLOSE</Button>
          </React.Fragment>
        }
      >
        <div className="course-subjects">
          <p>{props.subjects}</p>
        </div>
      </Modal>

      <li className="course-item">
        <button onClick={openProblemsListHandler} disabled={props.completion === "100%"}>
          <Card
            className={`course-item__info  ${
              props.all && `course-item__info--all`
            }  ${props.user && (props.completion === "100%" ? `course-item__info--user_disabled` : `course-item__info--user`)}`}
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
