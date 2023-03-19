import React from "react";
import styles from "./Header.module.css";

export const Header = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};
