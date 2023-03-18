import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/api";
import Spinner from "../components/Spinner/Spinner";
import Footer from "../views/Footer/Footer";
import Header from "../views/Header/Header";
import Container from "../components/Container/Container";
import LinkBack from "../components/LinkBack/LinkBack";
import Course from "../views/Course/Course";

const CoursesPage = () => {
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const courseData = await getCourseById(params?.courseId);
      setCourse(courseData);
      setVideoUrl(courseData?.meta?.courseVideoPreview?.link);
      setIsLoading(false);
    }
    fetchData();
  }, [params.courseId]);

  return (
    <Container>
      <Header title={course.title} />
      <main>
        {isLoading ? (
          <Spinner />
        ) : (
          <Course
            setVideoUrl={setVideoUrl}
            videoUrl={videoUrl}
            course={course}
          />
        )}
        <LinkBack />
      </main>
      <Footer />
    </Container>
  );
};

export default CoursesPage;
