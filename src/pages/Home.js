import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Tab,
  Tabs,
  TabHeading,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  View
} from "native-base";
import { StyleSheet, AsyncStorage, Image, BackHandler } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { banderas, noPhoto, data } from "../state/banderas";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: []
    };
  }

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  getResult = match => {
    const result = match.score.split(" ");

    return {
      homeScore: result[0] === "?" ? "0" : result[0],
      awayScore: result[2] === "?" ? "0" : result[2]
    };
  };

  componentDidMount = () => {
    this.getLocalStorage();
    if (!this.props.timer) {
      this.props.getliveData();
    }
  };

  getLocalStorage = () => {
    AsyncStorage.getItem("match", (err, result) => {
      if (result !== null) {
        this.setState({ match: JSON.parse(result) });
      } else {
        this.setState({ match: [] });
      }
    });
  };

  // setLocalStorage = async () => {
  //   console.log("nuevos datos", data.match);
  //   const res = await AsyncStorage.getItem("match");
  //   const parse = JSON.parse(res);

  //   parse.push(...data.match);

  //   await AsyncStorage.setItem("match", JSON.stringify(parse));
  // };

  getFecha = date => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "short"
    };
    return new Date(date).toLocaleDateString("es-ES", options);
  };

  getGroups = values => {
    if (!values) {
      return [];
    }
    const arrayGroup = [];
    values.map(match => {
      const result = arrayGroup.find(
        group => this.getFecha(group) === this.getFecha(match.date)
      );
      if (!result) {
        arrayGroup.push(match.date);
      }
    });

    console.log("arrayGroups", arrayGroup);
    return arrayGroup.sort((a, b) => {
      return new Date(b) - new Date(a);
    });
  };

  closeSesion = () => {
    console.log("se ejecutowewqeqweqweqweqw");
    this.hideMenu();
    this.props.sesionOff();
  };

  render() {
    const matchs =
      this.props.match.length === 0 ? this.state.match : this.props.match;
    const groups = this.getGroups(matchs);

    return (
      <Container>
        <Header style={styles.Header}>
          <Left>
            <Button transparent>
              <Icon style={styles.colorText} name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.colorText}>Copa América</Title>
          </Body>
          <Right>
            <Menu
              ref={this.setMenuRef}
              button={
                <Button onPress={this.showMenu} transparent>
                  <Icon style={styles.colorText} name="more" />
                </Button>
              }
            >
              <MenuItem
                onPress={() => {
                  this.closeSesion();
                }}
              >
                Cerrar sesión
              </MenuItem>
            </Menu>
          </Right>
        </Header>
        <Content>
          <Tabs
            style={{ display: "flex" }}
            tabBarUnderlineStyle={{
              backgroundColor: "red",
              width: "30%",
              position: "absolute",
              left: "36%"
            }}
          >
            <Tab
              heading={
                <TabHeading
                  style={{ backgroundColor: "#fff" }}
                  activeTabStyle={{ borderBottomColor: "red" }}
                >
                  <Text style={{ color: "red" }}>Partidos</Text>
                </TabHeading>
              }
            >
              <View style={{ backgroundColor: "#2979ff", height: 50 }} />
              {groups.map((group, key) => {
                return (
                  <View key={key}>
                    <View style={styles.FechaContainer}>
                      <Text style={{ color: "#fff", fontSize: 14 }}>
                        {" "}
                        {this.getFecha(group)}
                      </Text>
                    </View>
                    {matchs.map((match, key) => {
                      const score = this.getResult(match);
                      if (this.getFecha(match.date) === this.getFecha(group))
                        return (
                          <View
                            key={key}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              borderBottomWidth: 0.5
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                flex: 1
                              }}
                            >
                              <Image
                                source={
                                  banderas[match.home_name]
                                    ? banderas[match.home_name].url
                                    : noPhoto.url
                                }
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                  marginLeft: 20
                                }}
                              />
                              <Text style={{ maxWidth: "68%" }}>
                                {match.home_name}
                              </Text>
                            </View>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                minHeight: 60,
                                flex: 0.5,
                                paddingHorizontal: 10
                              }}
                            >
                              <Text style={{ fontSize: 20 }}>
                                {score.homeScore}
                              </Text>
                              {match.status === "IN PLAY" && (
                                <Text
                                  style={{
                                    fontSize: 12,
                                    paddingHorizontal: 10,
                                    color: "#4caf50",
                                    fontWeight: "bold"
                                  }}
                                >
                                  Live
                                </Text>
                              )}

                              {match.status !== "IN PLAY" && (
                                <Text
                                  style={{
                                    fontSize: 12,
                                    paddingHorizontal: 17,
                                    color: "#4caf50"
                                  }}
                                >
                                  --
                                </Text>
                              )}
                              <View
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  flexDirection: "row"
                                }}
                              >
                                <Text style={{ fontSize: 20 }}>
                                  {score.awayScore}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                flex: 1,
                                justifyContent: "flex-end"
                              }}
                            >
                              <Text style={{ maxWidth: "68%" }}>
                                {match.away_name}
                              </Text>
                              <Image
                                source={
                                  banderas[match.away_name]
                                    ? banderas[match.away_name].url
                                    : noPhoto.url
                                }
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 20,
                                  marginLeft: 10
                                }}
                              />
                            </View>
                          </View>
                        );
                    })}
                  </View>
                );
              })}
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Header: {
    backgroundColor: "#fff"
  },
  colorText: {
    color: "black"
  },

  FechaContainer: {
    backgroundColor: "#5393ff",
    height: 25,
    marginTop: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
