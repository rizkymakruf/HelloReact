import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Switch,
  Button,
  Alert,
} from "react-native";
import axios from "axios";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const createTwoButtonAlert = () =>
    Alert.alert("Continue", "Want to continue this action ?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#68B984" : "#CFFDE1";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <>
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      </>
    );
  };

  const [data, setData] = useState([]);
  // fetch data API with axios
  const getUsers = async () => {
    try {
      const result = await axios(`https://jsonplaceholder.typicode.com/users"`);
      setData(result.data);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  // call function
  useEffect(() => {
    getUsers();
  }, []);
  // log data
  console.log("hihi", data);
  // initial
  const DATA = data;

  return (
    <SafeAreaView
      style={styles.container}
      backgroundColor={isEnabled ? "#434242" : "white"}
    >
      <View
        style={styles.nav}
        backgroundColor={isEnabled ? "black" : "#3D5656"}
      >
        <View style={styles.navLT}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <Text style={styles.navText}>React Native</Text>
        </View>
        <View>
          <Switch
            trackColor={{ false: "black", true: "#F49D1A" }}
            thumbColor={isEnabled ? "#FFE15D" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <FlatList
        data={DATA.name}
        renderItem={renderItem}
        keyExtractor={(data) => data.id}
        extraData={selectedId}
      />
      <View style={styles.containerButton}>
        <Button
          title={"Continue"}
          style={styles.btnAlret}
          onPress={createTwoButtonAlert}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 40,
  },
  title: {
    fontSize: 22,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    marginBottom: 10,
  },
  navLT: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navText: {
    color: "white",
    fontSize: 20,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  btnAlret: {
    padding: 20,
  },
});

export default App;
