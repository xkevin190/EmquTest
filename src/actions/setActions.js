import { AsyncStorage } from "react-native";
import axios from "axios";

const urlLive = `https://livescore-api.com/api-client/scores/live.json?key=ykBg0rnFwIS6pynm&secret=yTkQJWmbgo397jzGDbXECkk83dfsLDOk&country=187`;
//const urlLive = `https://livescore-api.com/api-client/scores/live.json?key=ykBg0rnFwIS6pynm&secret=yTkQJWmbgo397jzGDbXECkk83dfsLDOk`;

const getLoaded = async () => {
  const result = await AsyncStorage.getItem("loaded");
  return result;
};

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
  if (values.username === "admin" && values.password === "admin") {
    AsyncStorage.setItem("loaded", "1");
    dispatch({
      type: "VERIFYING",
      payload: { loaded: true }
    });
  } else {
    cb("usuario o clave incorrecta");
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

export const verifyLoaded = () => async dispatch => {
  const res = await AsyncStorage.getItem("loaded");
  if (res) {
    dispatch({
      type: "VERIFYING",
      payload: { loaded: true }
    });
  } else {
    dispatch({
      type: "VERIFYING",
      payload: { loaded: false }
    });
  }
};

export const sesionOff = () => async dispatch => {
  await AsyncStorage.removeItem("loaded");
  dispatch({
    type: "VERIFYING",
    payload: { loaded: false }
  });
};

verifyStorage = async matchs => {
  const res = await AsyncStorage.getItem("match");
  const parse = JSON.parse(res) === null ? [] : JSON.parse(res);

  if (matchs.length === 0) {
    return parse;
  }
  matchs.map(match => {
    if (parse) {
      const index = parse.findIndex(storage => storage.id === match.id);
      if (index === -1) {
        parse.push({ ...match, date: new Date() });
      } else {
        parse[index] = { ...match, date: new Date() };
      }
    }
  });

  AsyncStorage.setItem("match", JSON.stringify(parse));
  return parse;
};

export const getliveData = () => dispatch => {
  const timer = AsyncStorage.getItem("loaded", (err, result) => {
    setInterval(
      () =>
        axios
          .get(urlLive)
          .then(async res => {
            const result = await this.verifyStorage(res.data.data.match);
            dispatch({
              type: "LIVE_MATCH",
              payload: result
            });
          })
          .catch(err => {
            console.log(err);
          }),

      10000
    );
    dispatch({
      type: "TIMER",
      payload: timer
    });
  });
};
