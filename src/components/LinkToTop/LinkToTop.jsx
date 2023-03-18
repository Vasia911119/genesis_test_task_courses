import React, { useState, useEffect } from "react";
import { ArrowLongUpIcon } from "@heroicons/react/24/outline";
import { Link } from "react-scroll";
import styles from "./LinkToTop.module.css";
import { scrollTop } from "../../helpers/scrollTop";

const LinkToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <>
      {show && (
        <Link
          to="#"
          onClick={scrollTop}
          className={styles.link}
          aria-label="scroll to Top"
          aria-controls="scroll to Top"
        >
          <ArrowLongUpIcon className={styles.icon} />
        </Link>
      )}
    </>
  );
};

export default LinkToTop;
