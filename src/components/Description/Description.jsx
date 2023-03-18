import Skills from "../Skills/Skills";
import styles from "./Description.module.css";

const Description = ({ course }) => {
  return (
    <>
      <p className={styles.desc}>{course.description}</p>
      <Skills course={course} />
    </>
  );
};

export default Description;
