import React, { Component } from "react";
import Login from "./LoginScreen";
import { setData } from "../firebase/index";
import { connect } from "react-redux";
import { login, register, loaded } from "../actions/setActions";
import { Text } from "react-native";


const auth = new setData();

class DualComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
  }

  static navigationOptions = {
    header: null
  };

  render() {
    console.log(this.props)
    return (
      <>
        {!this.props.userLoaded && <Login {...this.props} />}

        {this.props.userLoaded  && <Text>hello word</Text>}
      </>
    );
  }
}

const mapStateToProps = state => ({
  userLoaded: state.init.loaded,
  loading: state.init.loading
});
const mapDispatchToProps = dispatch => ({
  login: (values, navigation, callback) => {
    dispatch(login(values, navigation, callback));
  },
  register: (values, navigation, callback) =>
    dispatch(register(values, navigation, callback)),
  loaded: () => dispatch(loaded())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DualComponent);
