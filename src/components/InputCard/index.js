//@flow

import React from "react";
import { CSSTransition } from "react-transition-group";

import style from "./InputCard.module.css";
import "./animations.css";
import "./animate.css";
import { Button, ButtonGroup } from "../index";

type PROPS = {
  onClick: Function,
  handleInput: Function,
  handleOK: Function,
  isErrorValidation: boolean,
  typeModal: string
};

type STATE = {
  in: boolean
};

class InputCard extends React.Component<PROPS, STATE> {
  state = {
    in: false
  };

  componentDidMount() {
    this.toggleAnimation();
  }
  componentWillUnmount() {
    this.toggleAnimation();
  }

  toggleAnimation = () => {
    this.setState({ in: !this.state.in });
  };
  render() {
    const {
      isErrorValidation,
      typeModal,
      handleInput,
      onClick,
      handleOK
    } = this.props;
    let inputType = "text";

    const btnBlock = (
      <div className={style.cardBtnsBlock}>
        <button onClick={() => onClick(typeModal)}>отмена</button>
        <button onClick={handleOK}>ок</button>
      </div>
    );
    const btnBlock2 = (
      <div className={style.cardBtnsBlock}>
        <ButtonGroup>
          <Button
            btnColor="red"
            onClick={() => onClick(typeModal)}
            text="отмена"
          />
          <Button btnColor="green" onClick={handleOK} text="ок" />
        </ButtonGroup>
      </div>
    );
    let isInputRequired = false;
    switch (true) {
      case typeModal.includes("minus"):
      case typeModal.includes("plus"):
      case typeModal === "budget":
        isInputRequired = true;
        inputType = "number";
        break;
      default:
        isInputRequired = false;
        break;
    }
    const input = (
      <input
        placeholder="0000.00"
        className={
          isErrorValidation
            ? [style.cardInputError, style.cardInput].join(" ")
            : style.cardInput
        }
        autoFocus
        onChange={e => handleInput(e, typeModal)}
        type={inputType}
      />
    );

    let text = "EMPTY";
    switch (true) {
      case typeModal.includes("profile_delete"):
        text = "Вы действительно хотите удалить профиль?";
        break;
      default:
        text = "NOT MATCHING";
        break;
    }

    const title = (
      <div className={style.title}>
        {typeModal === "budget" ? "Введите бюджет" : ""}
        {typeModal.includes("minus") ? "Расходы" : ""}
        {typeModal.includes("plus") ? "Доходы" : ""}
        {typeModal.includes("profile_delete") ? "Удалить профиль" : ""}
      </div>
    );
    return (
      <CSSTransition
        in={this.state.in}
        timeout={1500}
        classNames={"alert_input"}
        mountOnEnter
        unmountOnExit
      >
        <div className={style.card}>
          {title}
          {isInputRequired ? input : text}
          {btnBlock2}
        </div>
      </CSSTransition>
    );
  }
}

export { InputCard };
