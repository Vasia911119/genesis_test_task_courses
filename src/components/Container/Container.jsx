import styles from "./Container.module.css";

const Container = ({ children }) => {
  return <div className={`container ${styles.wrapper}`}>{children}</div>;
};

export default Container;
