import React, { useState, useEffect } from "react";
import { getCourses } from "../services/api";
import { Container, LinkToTop, Spinner } from "../components";
import { Header, Courses, Footer } from "../views";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const coursesData = await getCourses();
      setCourses(coursesData.courses);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Header title="Collection of training courses" />
      <main>
        {isLoading ? <Spinner /> : <Courses courses={courses} />}
        <LinkToTop />
      </main>
      <Footer />
    </Container>
  );
};

export default CoursesPage;
