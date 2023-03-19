import React from "react";
import { Link, useParams } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import styles from "./Lessons.module.css";

export const Lessons = ({ course, setVideoUrl, setProgress, videoUrl }) => {
  const params = useParams();
  return (
    <div className={styles.mainWrapper}>
      <p className={styles.text}>Lessons:</p>
      <ol className={styles.list}>
        {course?.lessons?.map((lesson, index) => (
          <li key={index}>
            {lesson.link === undefined ? (
              <Link
                onClick={(e) => e.preventDefault()}
                style={{
                  color: "gray",
                  textDecoration: "none",
                  cursor: "default",
                }}
              >
                {lesson.title}
              </Link>
            ) : lesson.status === "locked" ? (
              <Link
                onClick={(e) => e.preventDefault()}
                style={{
                  color: "gray",
                  textDecoration: "none",
                  cursor: "default",
                }}
              >
                <div className={styles.wrapper}>
                  <p>{lesson.title}</p>
                  <LockClosedIcon className={styles.icon} />
                </div>
              </Link>
            ) : (
              <Link
                onClick={(e) => {
                  setVideoUrl(lesson.link);
                  setProgress({
                    courseId: params.courseId,
                    lastLessonId: lesson.id,
                  });
                  e.target.style.color = "yellow";
                }}
                style={{
                  color: videoUrl === lesson.link ? "yellow" : "black",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = "none";
                }}
              >
                {lesson.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};
