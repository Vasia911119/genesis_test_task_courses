import React from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>&copy;</span>
      <span>{new Date().getFullYear()}</span>
      <p className={styles.subText}>COURSES</p>
    </footer>
  );
};
