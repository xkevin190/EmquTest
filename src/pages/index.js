import React, { Component } from "react";
import Login from "./LoginScreen";
import { connect } from "react-redux";
import { login, register, loaded, getliveData } from "../actions/setActions";
import Home from './Home'


class DualComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
  }

  componentDidMount= ()=>{
    console.log("ejecuto")
    this.props.getliveData()
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
  }

  static navigationOptions = {
    header: null
  };

  render() {
    console.log("loaded", this.props.userLoaded)
    return (
      <>
        {!this.props.userLoaded && <Login {...this.props} />}
        {this.props.userLoaded  && <Home match={this.props.match}/>}
      </>
    );
  }
}

const mapStateToProps = state => ({
  userLoaded: state.init.loaded,
  loading: state.init.loading,
  match: state.init.match
});
const mapDispatchToProps = dispatch => ({
  login: (values, navigation, callback) => {
    dispatch(login(values, navigation, callback));
  },
  register: (values, navigation, callback) =>
    dispatch(register(values, navigation, callback)),
  loaded: () => dispatch(loaded()),
  getliveData: ()=>dispatch(getliveData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DualComponent);
