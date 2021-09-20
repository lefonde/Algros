import React, { useEffect, useState, useContext } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import CoursesList from "../components/CoursesList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Courses.css";

const Courses = () => {
  const DEBUG = false;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedAllCourses, setLoadedAllCourses] = useState([]);
  const [updatedAllCourses, setUpdatedAllCourses] = useState([]);

  const [loadedUserCourses, setLoadedUserCourses] = useState([]);

  let allCoursesList = [];
  let userCoursesList = [];

  useEffect(() => {
    document.body.style.background = "#ffffff";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.backgroundAttachment = "fixed";
  }, []);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const allCoursesResponse = await sendRequest(
          "http://51.138.73.135:8080/Algors/allCourses"
        );
        setLoadedAllCourses(allCoursesResponse.courses);
        setUpdatedAllCourses(true);
      } catch (err) {}
    };

    fetchAllCourses();
  }, [sendRequest]);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const userId = JSON.parse(
          localStorage.getItem("userData")
        ).userId.toString();
        const userCoursesResponse = await sendRequest(
          "http://51.138.73.135:8080/Algors/userCourses",
          "POST",
          JSON.stringify({
            userId: userId,
          }),
          {}
        );

        Object.values(loadedAllCourses).map((currentCourse, idx1) => {
          Object.values(userCoursesResponse.userCourses).map(
            (userCourse, idx2) => {
              if (currentCourse.courseId === userCourse.courseId)
                userCoursesList.push({
                  courseId: currentCourse.courseId,
                  courseName: currentCourse.courseName,
                  subjects: currentCourse.subjects,
                  questionsAmount: userCourse.questionAmount,
                  courseCompletion: `${parseInt(
                    (userCourse.questionCompletedAmount /
                      userCourse.questionAmount) *
                      100
                  )}%`,
                });
            }
          );
        });

        setLoadedUserCourses(userCoursesList);
      } catch (err) {}
    };

    fetchUserCourses();
  }, [sendRequest, loadedAllCourses]);

  useEffect(() => {
    if(loadedUserCourses.length === 0) {
      setUpdatedAllCourses(loadedAllCourses);
      return;
    }
    Object.values(loadedAllCourses).map((currentCourse, idx1) => {
      Object.values(loadedUserCourses).map((userCourse, idx2) => {
        if (currentCourse.courseId !== userCourse.courseId)
          allCoursesList.push({
            courseId: currentCourse.courseId,
            courseName: currentCourse.courseName,
            subjects: currentCourse.subjects,
            questionsAmount: userCourse.questionAmount,
            courseCompletion: `${parseInt(
              (userCourse.questionCompletedAmount / userCourse.questionAmount) *
                100
            )}%`,
          });
      });
    });

    setUpdatedAllCourses(allCoursesList);

  }, [loadedUserCourses]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <div className="courses-list_user">
        <h1>Your courses</h1>
        {(!isLoading || DEBUG) && (
          <CoursesList
            items={loadedUserCourses}
            className="course-list__list"
            user
          />
        )}
      </div>
      <div className="courses-list_all">
        <h1>All Courses</h1>
        {(!isLoading || DEBUG) && (
          <CoursesList
            items={updatedAllCourses}
            className="course-list__list"
            all
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Courses;
