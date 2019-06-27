import { AsyncStorage } from "react-native";
import { setData } from "../firebase";

const setActions = new setData();
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
      type:"VERIFYING",
      payload: {loaded:true}
    })
  }else{
    cb("incorrect username or password")
    dispatch({
      type:"VERIFYING",
      payload: {loaded:false}
    })
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
