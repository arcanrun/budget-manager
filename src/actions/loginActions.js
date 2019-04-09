//@flow
import connect from "@vkontakte/vkui-connect-promise";

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants";
import { API } from "../API";

const requestLogIn = () => ({
  type: LOGIN_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successLogIn = (res: Object) => ({
  type: LOGIN_SUCCESS,
  payload: res
});
export const failureLogIn = (msg: string) => ({
  type: LOGIN_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message: msg
  }
});

export const logIn = () => {
  return (dispatch: Function) => {
    dispatch(requestLogIn());
    let vkRes = {
      errors: false,
      error_message: undefined,
      vk_id: undefined,
      name: undefined,
      sure_name: undefined,
      avatar: undefined,
      email: undefined
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
        fetch(API.LOG_IN, {
          method: "POST",
          body: JSON.stringify(vkRes)
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            let response = res.RESPONSE;
            if (response === "LOGIN_ERROR") {
              dispatch(failureLogIn(response));
            } else {
              dispatch(successLogIn(res.PAYLOAD));
            }

            return res;
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        vkRes.errors = true;
        vkRes.error_message = err;
        dispatch(failureLogIn(vkRes.error_message));
      });
    //   .catch(err => console.log(Error(err)));
    // connect
    //   .send("VKWebAppGetEmail", {})
    //   .then(res => {
    //     console.log(res);
    //     vkRes.email = res.data.email;
    //     vkRes.errors = false;
    //     vkRes.error_message = undefined;
    //     return res;
    //   })
    //   .catch(err => console.log(Error(err)));

    // !vkRes.errors
    //   ? dispatch(successLogIn(vkRes))
    //   : dispatch(failureLogIn(vkRes));
  };
};