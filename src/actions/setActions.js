import { AsyncStorage } from "react-native";
import axios from "axios";

const urlLive = `https://livescore-api.com/api-client/scores/live.json?key=ykBg0rnFwIS6pynm&secret=yTkQJWmbgo397jzGDbXECkk83dfsLDOk&country=187`;

export const loaded = () => {
  return {
    type: "LOADED"
  };
};

export const loading = () => {
  return {
    type: "LOADING"
  };
};

export const login = (values, cb) => async dispatch => {
  const res = await AsyncStorage.getItem("user");
  const result = JSON.parse(res);
  if (
    result.username === values.username &&
    result.password === values.password
  ) {
    dispatch({
      type: "VERIFYING",
      payload: { loaded: true }
    });
  } else {
    cb("incorrect username or password");
    dispatch({
      type: "VERIFYING",
      payload: { loaded: false }
    });
  }
};

export const register = (values, cb) => async dispatch => {
  try {
    AsyncStorage.setItem("user", JSON.stringify(values));
    cb("Successful registration");
  } catch (error) {
    console.log("err", error);
  }
};

export const getliveData = () => async dispatch => {
  setInterval(() => {
    axios
      .get(urlLive)
      .then(res => {
        AsyncStorage.setItem("match", JSON.stringify(res.data.data.match));

        dispatch({
          type: "LIVE_MATCH",
          payload: res.data.data.match
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, 10000);
};
