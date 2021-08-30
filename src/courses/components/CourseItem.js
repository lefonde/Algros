import React, { useState } from "react";
import Triangle from "./triangle.svg";
import {} from "@material-ui/core";
//import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";

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
        header="Course problem list" // change this to courses name
        contentClass="course-item__modal-content"
        footerClass="course-item__modal-actions"
        footer={
          <React.Fragment>
            <Button to="/problem">START</Button>
            <Button onClick={closeProblemsListHandler}>CLOSE</Button>
          </React.Fragment>
        }
      >
        <div className="map-container">
          <h2>Problems list</h2>
        </div>
      </Modal>

      <li className="course-item">
        <Card className="course-item__content">
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
        </Card>
      </li>
    </React.Fragment>
  );
};

export default CourseItem;
