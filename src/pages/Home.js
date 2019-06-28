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
import { StyleSheet, AsyncStorage, Image } from "react-native";
import { banderas } from "../state/banderas";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getResult = match => {
    const result = match.score.split(" ");

    return {
      homeScore: result[0],
      awayScore: result[2]
    };
  };

  getLocalStorage = async () => {
    const res = await AsyncStorage.getItem("match");
    const result = JSON.parse(res);

    console.log("!!!!!!!!!!!!!!!!!!!", result);
  };

  render() {
    this.getLocalStorage();
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
          <Right />
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

              <View style={styles.FechaContainer}>
                <Text style={{ color: "#fff", fontSize: 14 }}>
                  {" "}
                  jueves 27 de junio
                </Text>
              </View>
              {this.props.match.map((match, key) => {
                const score = this.getResult(match);
                console.log("score", banderas[match.home_name]);
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
                        alignItems: "center"
                      }}
                    >
                      <Image
                        source={banderas[match.home_name].url}
                        style={{ width: 30, height: 30, marginHorizontal: 10 }}
                      />
                      <Text>{match.home_name}</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minHeight: 60
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{score.homeScore}</Text>
                      <Text
                        style={{
                          fontSize: 12,
                          paddingHorizontal: 10
                        }}
                      >
                        {match.status === "IN PLAY" ? "live" : "--"}
                      </Text>
                      <View>
                        <Text style={{ fontSize: 20 }}>{score.awayScore}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <Text>{match.away_name}</Text>
                      <Image
                        source={banderas[match.away_name].url}
                        style={{ width: 30, height: 30, marginHorizontal: 10 }}
                      />
                    </View>
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
