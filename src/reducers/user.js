//@flow
import {
  ADD_BUDGET_FAILURE,
  ADD_BUDGET_REQUEST,
  ADD_BUDGET_SUCCESS,
  ADD_PAYDAY_FAILURE,
  ADD_PAYDAY_SUCCESS,
  ADD_PAYDAY_REQUEST,
  GET_PAYDAY_FAILURE,
  GET_PAYDAY_REQUEST,
  GET_PAYDAY_SUCCESS,
  GET_ALL_COSTS_FAILURE,
  GET_ALL_COSTS_SUCCESS,
  GET_ALL_COSTS_REQUEST,
  GET_BUDGET_SUCCESS
} from "../constants";
import { msToDays } from "../components/Calendar/calendarHelper";

type UserState = {
  vk_id: number,
  avatar: string,
  name: string,
  sure_name: string,
  history?: Array<any>,
  isFetching_pyaday: boolean, // temp solutions...
  calc?: any
};

export const initialState: UserState = {
  vk_id: 123456,
  avatar: "",
  name: "Pavel",
  sure_name: "Durov",
  isFetching_pyaday: false,
  history: [],
  calc: {
    pay_day: undefined,
    daysToPayday: undefined,
    budget: undefined,
    isFetching: false,
    error: false,
    error_message: undefined,
    common: {
      maxToday: {
        value: undefined,
        temp: undefined
      }
    },
    fun: {
      maxToday: {
        value: undefined,
        temp: undefined
      }
    },
    invest: {
      maxToday: {
        value: undefined,
        temp: undefined
      }
    }
  }
};

export function user(state: UserState = initialState, action: Object) {
  switch (action.type) {
    case ADD_BUDGET_REQUEST:
      return {
        ...state,
        calc: {
          ...state.calc,
          isFetching: action.payload.isFetching
        }
      };

    case ADD_BUDGET_FAILURE:
      return {
        ...state,
        calc: { ...state.calc, isFetching: false, error: true }
      };

    case ADD_PAYDAY_REQUEST:
      return {
        ...state,
        calc: {
          ...state.calc,
          isFetching: action.payload.isFetching
        }
      };

    case ADD_PAYDAY_FAILURE:
      return { ...state, calc: { ...state.calc, error: true } };

    case GET_ALL_COSTS_REQUEST:
      return {
        ...state,
        calc: {
          ...state.calc,

          isFetching: true,
          error: false,
          error_message: undefined
        }
      };
    case GET_ALL_COSTS_FAILURE:
      return {
        ...state,
        calc: {
          ...state.calc,
          isFetching: false,
          error: true,
          error_message: action.error.message
        }
      };
    case GET_ALL_COSTS_SUCCESS:
    case ADD_PAYDAY_SUCCESS:
    case ADD_BUDGET_SUCCESS:
      return {
        ...state,

        calc: {
          ...state.calc,
          budget: action.payload.payload.budget,
          pay_day: action.payload.payload.pay_day,
          daysToPayday: action.payload.payload.days_to_payday,
          isFetching: false,
          error: false,
          error_message: undefined,
          common: {
            ...state.calc.common,
            maxToday: {
              ...state.calc.common.maxToday,
              value: action.payload.payload.common.maxToday,
              temp: action.payload.payload.common.temp
            }
          },
          fun: {
            ...state.calc.fun,
            maxToday: {
              ...state.calc.fun.maxToday,
              value: action.payload.payload.fun.maxToday,
              temp: action.payload.payload.fun.temp
            }
          },
          invest: {
            ...state.calc.invest,
            maxToday: {
              ...state.calc.invest.maxToday,
              value: action.payload.payload.invest.maxToday,
              temp: action.payload.payload.invest.temp
            }
          }
        }
      };

    default:
      return state;
  }
}
