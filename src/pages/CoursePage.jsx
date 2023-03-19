import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner/Spinner";
import Footer from "../views/Footer/Footer";
import Header from "../views/Header/Header";
import Container from "../components/Container/Container";
import LinkBack from "../components/LinkBack/LinkBack";
import Course from "../views/Course/Course";
import { getCourseById } from "../services/api";
import { useParams } from "react-router-dom";

const CoursePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const courseData = await getCourseById(params?.courseId);
      setCourse(courseData);
      setIsLoading(false);
    }
    fetchData();
  }, [params.courseId]);

  return (
    <Container>
      <Header title={course.title} />
      <main>
        {isLoading ? <Spinner /> : <Course course={course} />}
        <LinkBack />
      </main>
      <Footer />
    </Container>
  );
};

export default CoursePage;
