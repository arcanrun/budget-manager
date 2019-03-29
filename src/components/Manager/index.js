//@flow
import React from "react";

import { Card } from "../index";
import { PayDay, Modal, WholeBudget } from "../index";
import { addPayDay, getWholeBudget, getPayDay } from "../../actions";

type PROPS = {
  getWholeBudget: Function,
  onClickToggleModal: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  getPayDay: Function,
  typeModal: string,
  wholeBudget: number,
  payday: string,
  wholeBudget_isFetching: boolean,
  payday_isFetching: boolean,
  modalIsVisible: boolean
};

class Manager extends React.Component<PROPS, {}> {
  componentDidMount() {
    if (!this.props.wholeBudget) this.props.getWholeBudget();
    if (!this.props.payday) this.props.getPayDay();
  }
  render() {
    const {
      modalIsVisible,
      onClickToggleModal,
      typeModal,
      wholeBudget,
      payday,
      wholeBudget_isFetching,
      payday_isFetching
    } = this.props;
    return (
      <>
        <Card
          headerTitle={"общий бюджет"}
          icon={"money-bag"}
          rightIcon={"pencil"}
          onClick={() => onClickToggleModal("budget")}
        >
          <WholeBudget
            onClick={() => onClickToggleModal("budget")}
            wholeBudget={wholeBudget}
            isFetching={wholeBudget_isFetching}
          />
        </Card>
        <Card
          headerTitle={"календарь"}
          icon={"calendar"}
          rightIcon={"pencil"}
          onClick={() => onClickToggleModal("payday")}
        >
          <PayDay
            onClick={() => onClickToggleModal("payday")}
            isFetching={payday_isFetching}
            payday={payday}
          />
        </Card>
        {!modalIsVisible || (
          <Modal
            onClick={onClickToggleModal}
            typeModal={typeModal}
            {...this.props}
          />
        )}
      </>
    );
  }
}
export { Manager };
