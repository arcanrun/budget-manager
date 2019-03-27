//@flow
import React from "react";
import { connect } from "react-redux";

import { Manager } from "../components";
import { toggleModal, addWholeBudget } from "../actions/";

const mapStateToProps = state => ({
  modalIsVisible: state.modal.modalIsVisible,
  typeModal: state.modal.typeModal
});

export const ManagerContainer = connect(
  mapStateToProps,
  { onClickToggleModal: toggleModal, addWholeBudget }
)(Manager);