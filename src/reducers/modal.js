//@flow
import { TOGGLE_MODAL, HIDE_MODAL } from "../constants";

type stateType = {
  modalIsVisible: boolean,
  typeModal: ?string
};

const initialState: stateType = {
  modalIsVisible: false,
  typeModal: null
};

export function modal(state: stateType = initialState, action: Object) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modalIsVisible: !state.modalIsVisible,
        typeModal: action.payload.typeModal
      };
    case HIDE_MODAL:
      return {
        ...state,
        modalIsVisible: false,
        typeModal: null
      };
    default:
      return state;
  }
}
