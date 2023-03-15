import React from "react";
import * as s from "./Spinner.module.css";

const Spinner = () => (
  <div className={s.spinnerWrapper}>
    <div className={s.spinner}></div>
  </div>
);

export default Spinner;
