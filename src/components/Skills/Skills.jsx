import React from "react";
import styles from "./Skills.module.css";

export const Skills = ({ course }) => {
  return (
    <>
      <p className={styles.text}>Skills:</p>
      <ul>
        {course?.meta?.skills?.map((skill, index) => (
          <li className={styles.item} key={index}>
            {skill}
          </li>
        ))}
      </ul>
    </>
  );
};
