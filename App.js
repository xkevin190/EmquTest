import React, { Component } from "react";
import store from "./src/store";
import { Provider } from "react-redux";
import { AppRegistry } from "react-native";
import AppContainer from "./src";
import { verifyLoaded } from "./src/actions/setActions";

export default class App extends Component {
  constructor() {
    super();
    console.ignoredYellowBox = ["Setting a timer"];
  }
  render() {
    store.dispatch(verifyLoaded());

    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("EmquProject", () => App);
