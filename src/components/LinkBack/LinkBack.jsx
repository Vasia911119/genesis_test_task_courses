import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import styles from "./LinkBack.module.css";

export const LinkBack = () => {
  return (
    <Link className={styles.link} to="/courses">
      <ChevronLeftIcon className={styles.icon} />
      Back to courses
    </Link>
  );
};
