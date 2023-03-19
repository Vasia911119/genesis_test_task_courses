import React from "react";
import { Skills } from "..";
import styles from "./Description.module.css";

export const Description = ({ course }) => {
  return (
    <>
      <p className={styles.desc}>{course.description}</p>
      <Skills course={course} />
    </>
  );
};
