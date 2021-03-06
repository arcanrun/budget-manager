//@flow
import React from "react";

import style from "./OperationType.module.css";
import { Icon } from "../index";

type PROPS = {
  children: string
};

const OperationType = ({ children }: PROPS) => {
  let typeOper = "";
  switch (children) {
    case "common":
      typeOper = "50%";
      break;
    case "fun":
      typeOper = "30%";
      break;
    case "invest":
      typeOper = "20%";
      break;
    case "budget":
      typeOper = <Icon color="#5281b9" icon="money-bag-2" />;
      break;
    default:
      typeOper = "?";
      break;
  }
  return <div className={style.type}>{typeOper}</div>;
};

export { OperationType };
