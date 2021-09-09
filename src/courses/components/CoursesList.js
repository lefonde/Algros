import React from "react";

import Card from "../../shared/components/UIElements/Card";
import CourseItem from "./CourseItem";
import "./CoursesList.css";

const CoursesList = (props) => {
  if (!props.items || props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Once you start a course it will be added here</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="courses-list">
      {Object.values(props.items).map((course) => (
        <CourseItem
          key={course.courseId}
          id={course.courseId}
          subjects={course.subjects}
          completion={course.courseCompletion}
          questionsAmount={course.questionsAmount}
          //image={course.image}
          name={course.courseName}
          user={props.user}
          all={props.all}
        />
      ))}
    </ul>
  );
};

export default CoursesList;
