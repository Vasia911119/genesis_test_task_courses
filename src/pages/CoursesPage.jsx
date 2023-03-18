import React, { useState, useEffect } from "react";
import { getCourses } from "../services/api";
import Spinner from "../components/Spinner/Spinner";
import LinkToTop from "../components/LinkToTop/LinkToTop";
import Footer from "../views/Footer/Footer";
import Header from "../views/Header/Header";
import Container from "../components/Container/Container";
import Courses from "../views/Courses/Courses";

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
