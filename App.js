import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Switch,
} from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
            trackColor={{ false: "#767577", true: "#CFFDE1" }}
            thumbColor={isEnabled ? "#68B984" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
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
});

export default App;
