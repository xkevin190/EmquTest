import { Map, List } from "immutable";

setState = (state, newState) => state.mergeDeep(newState);

setdata = (state, node, payload) =>
  state.set(node, Array.isArray(payload) ? List(payload) : Map(payload));
search = (state, node, payload) => state.set(node, payload);

setList = (state, node, payload) => {
  return state.set(node, state.get(node).push(payload));
};

resetAll = (state, node) => state.set(node, Map());

const InitialState = {
  loaded: undefined,
  loading: undefined,
  match: []
};

const test = (state = InitialState, action) => {
  switch (action.type) {
    case "VERIFYING": {
      return { ...state, ...action.payload };
    }

    case "LIVE_MATCH": {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!live!!!!!!!!!!!!! ");
      return { ...state, match: action.payload };
    }

    case "TIMER": {
      return { ...state, timer: action.payload };
    }

    default:
      return state;
  }
};

export default test;
