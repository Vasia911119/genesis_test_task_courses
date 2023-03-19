import React, { useState, useEffect } from "react";
import { Container, LinkBack, Spinner } from "../components";
import { Header, Course, Footer } from "../views";
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
