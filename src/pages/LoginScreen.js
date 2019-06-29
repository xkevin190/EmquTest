import React, { Component } from "react";
import InputField from "../components/Input";
import Button from "../components/Button";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { AsyncStorage } from "react-native";
import { banderas, noPhoto, data } from "../state/banderas";

const initialValues = {
  username: "",
  password: ""
};

export default class Equilibrio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "login",
      visible: false
    };
  }

  componentDidMount() {
    this.props.loaded();
    // this.setLocalStorage();
  }

  handleTest = async () => {
    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ userName: "admin", password: "admin" })
      );
    } catch (error) {
      console.log("err", error);
    }
  };

  handleView = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  handleSubmit = async (values, { resetForm }) => {
    this.state.view === "login"
      ? await this.props.login(values, message => {
          ToastAndroid.showWithGravityAndOffset(
            message,
            1,
            ToastAndroid.CENTER,
            25,
            60
          );
        })
      : await this.props.register(values, message => {
          ToastAndroid.showWithGravityAndOffset(
            message,
            1,
            ToastAndroid.CENTER,
            25,
            60
          );
          this.setState({ view: "login" });
        });

    resetForm(initialValues);
  };

  static navigationOptions = {
    header: null
  };

  componentWillUpdate() {
    if (this.state.visible) {
      setTimeout(() => {
        this.setState({ visible: false });
      }, 1);
    }
  }

  setLocalStorage = async () => {
    await AsyncStorage.setItem("match", JSON.stringify(data.match));
  };

  render() {
    let validationSchema;
    if (this.state.view === "register") {
      validationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup
          .string()
          .label()
          .required()
      });
    } else {
      validationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
      });
    }

    return (
      <>
        <Formik
          InitialValues={initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}
          render={({ values, handleSubmit, setFieldValue, errors }) => (
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                paddingBottom: 40
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 65,
                    paddingBottom: 40,
                    paddingTop: 15,
                    color: "#004d40"
                  }}
                >
                  S I P F
                </Text>
              </View>
              <View style={{ width: "90%" }}>
                <InputField
                  label="Username"
                  value={values.username}
                  onChange={setFieldValue}
                  name="username"
                  keyboardType="email-address"
                  error={errors.username}
                />
                <InputField
                  label="Password"
                  value={values.password}
                  onChange={setFieldValue}
                  name="password"
                  error={errors.password}
                  secureTextEntry
                />
              </View>
              {this.state.view === "register" && (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    title="BACK"
                    type="secondary"
                    handleSubmit={() => {
                      this.setState({ view: "login" });
                    }}
                  />

                  <Button
                    title="SAVE"
                    type="primary"
                    handleSubmit={handleSubmit}
                  />
                </View>
              )}

              {this.state.view === "login" && (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    title="REGISTRAR"
                    type="primary"
                    handleSubmit={() => {
                      this.setState({ view: "register" });
                    }}
                  />

                  <Button
                    title="LOGIN"
                    type="primary"
                    handleSubmit={handleSubmit}
                  />
                </View>
              )}
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  width: "100%",
                  alignItems: "center"
                }}
              />
            </ScrollView>
          )}
        />
      </>
    );
  }
}
