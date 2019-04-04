//@flow
import React from "react";

import style from "./History.module.css";
import { OperationSign, OperationType, OperationValue } from "../index";

type PROPS = {
  vk_id: number,
  getHistory: Function,
  history: Array<Object>
};
class History extends React.Component<PROPS, {}> {
  componentDidMount() {
    const { vk_id } = this.props;
    this.props.getHistory(vk_id);
  }
  render() {
    const { history } = this.props;
    console.log(history);
    return (
      <div className={style.container}>
        <div className={style.verticalLine} />
        <div className={style.content}>
          {history.map((item, i) => {
            const day = Object.keys(item)[0];

            return (
              <div key={i}>
                <div className={style.day}>{day}</div>
                {item[day].map((elem, j) => (
                  <div key={j} className={style.operation}>
                    <OperationType>{elem.type_cost}</OperationType>
                    <OperationSign>{elem.operation}</OperationSign>
                    <OperationValue sign={elem.operation}>
                      {elem.value}
                    </OperationValue>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export { History };
