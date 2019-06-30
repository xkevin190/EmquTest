import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import RouteContainer from "./routes";
import Spinner from "./components/Spinner";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {this.props.loading === undefined && <Spinner />}
        <RouteContainer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.init.loaded
});

export default connect(mapStateToProps)(AppContainer);
