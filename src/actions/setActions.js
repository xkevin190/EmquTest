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
  console.log(values);
  console.log(result);
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

verifyStorage = async matchs => {
  const res = await AsyncStorage.getItem("match");
  const parse = JSON.parse(res);
  if (matchs.lenth === 0) {
    console.log("entro en el 0");
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

  await AsyncStorage.setItem("match", JSON.stringify(parse));

  return parse;
};

export const getliveData = () => dispatch => {
  setInterval(() => {
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
      });
  }, 20000);
};
