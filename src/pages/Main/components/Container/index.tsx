import React from "react";
import style from "./index.module.scss";

const index: React.FC = ({ children }) => {
  return <div className={style.main}>{children}</div>;
};

export default index;
