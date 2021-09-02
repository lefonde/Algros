import React, { useEffect, useState, useContext } from "react";
import ScrollArea from "react-scrollbar";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import CoursesList from "../components/CoursesList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Courses.css";

const Courses = () => {
  const DEBUG = false;
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedAllCourses, setLoadedAllCourses] = useState([]);
  const [loadedUserCourses, setLoadedUserCourses] = useState([]);


  useEffect(() => {
    document.body.style.background =
      "linear-gradient(180deg, #FFFFFF 50%, rgba(226, 211, 175, 0.25) 50%)";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.backgroundAttachment = "fixed";

    if (DEBUG) {
      const testCourses = {
        1: { courseName: "sum course", subjects: "base, array", courseId: 1 },
        2: { courseName: "squre course", subjects: "base", courseId: 2 },
      };

      setLoadedAllCourses(testCourses);
      return;
    }

    const fetchAllCourses = async () => {
      try {
        const allCoursesResponse = await sendRequest(
          "http://51.138.73.135:8080/Algors/allCourses"
        );
        console.log(allCoursesResponse);
        setLoadedAllCourses(allCoursesResponse.courses);
      } catch (err) {}
    };

    const fetchUserCourses = async () => {
      try {
        const userCoursesResponse = await sendRequest(
          "http://51.138.73.135:8080/Algors/userCourses",
          "POST",
          JSON.stringify({
            userId: auth.userId.toString(),
          }),
          {}
        );
        setLoadedUserCourses(userCoursesResponse.courses);
      } catch (err) {}
    };

    fetchUserCourses();
    fetchAllCourses();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {(!isLoading || DEBUG) && (
        <CoursesList items={loadedUserCourses} className="course-list__list" />
      )}
      {(!isLoading || DEBUG) && (
        <CoursesList items={loadedAllCourses} className="course-list__list" />
      )}
    </React.Fragment>
  );
};

export default Courses;
