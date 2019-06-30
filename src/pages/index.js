import React, { Component } from "react";
import Login from "./LoginScreen";
import { connect } from "react-redux";
import {
  login,
  register,
  loaded,
  getliveData,
  sesionOff
} from "../actions/setActions";
import Home from "./Home";

class DualComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <>
        {this.props.userLoaded === false && <Login {...this.props} />}
        {this.props.userLoaded === true && (
          <Home
            sesionOff={this.props.sesionOff}
            getliveData={this.props.getliveData}
            match={this.props.match}
            timer={this.props.timer}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  userLoaded: state.init.loaded,
  loading: state.init.loading,
  match: state.init.match,
  timer: state.init.timer
});
const mapDispatchToProps = dispatch => ({
  login: (values, navigation, callback) => {
    dispatch(login(values, navigation, callback));
  },
  register: (values, navigation, callback) =>
    dispatch(register(values, navigation, callback)),
  loaded: () => dispatch(loaded()),
  getliveData: () => dispatch(getliveData()),
  sesionOff: () => dispatch(sesionOff())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DualComponent);
