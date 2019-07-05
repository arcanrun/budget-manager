//@flow
import connect from "@vkontakte/vkui-connect-promise";

import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_STOP_GUIDE
} from "../constants";
import { API } from "../API";

export const stopGuide = () => ({
  type: SIGNUP_STOP_GUIDE
});

const requestSignUp = () => ({
  type: SIGNUP_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successSignUp = (res: Object) => ({
  type: SIGNUP_SUCCESS,
  payload: res
});
export const failureSignUp = (res: Object) => ({
  type: SIGNUP_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message: res.error_message
  }
});

export const signUp = () => {
  return (dispatch: Function) => {
    dispatch(requestSignUp());
    let toDay = new Date();
    toDay = toDay.toLocaleDateString();
    let vkRes = {
      errors: false,
      error_message: undefined,
      vk_id: undefined,
      name: undefined,
      sure_name: undefined,
      avatar: undefined,
      email: undefined,
      toDay
    };

    connect
      .send("VKWebAppInit", {})
      .then(data => console.log(data))
      .catch(error => console.log(error));

    connect
      .send("VKWebAppGetUserInfo", {})
      .then(res => {
        console.log(res);
        vkRes.vk_id = res.data.id;
        vkRes.name = res.data.first_name;
        vkRes.sure_name = res.data.last_name;
        vkRes.avatar = res.data.photo_200;
        vkRes.errors = false;
        vkRes.error_message = undefined;
        fetch(API.SIGN_UP, {
          method: "POST",
          body: JSON.stringify(vkRes)
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            dispatch(successSignUp(res.PAYLOAD));
            return res;
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        vkRes.errors = true;
        vkRes.error_message = err;
        dispatch(failureSignUp(vkRes));
      });
  };
};

// export const signUp = () => {
//   return dispatch =>
//     dispatch(
//       successSignUp({
//         vk_id: 65122543
//       })
//     );
// };