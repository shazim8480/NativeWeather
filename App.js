import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
// get the screen width //
const { width: SCREEN_WIDTH } = Dimensions.get("window");
// console.log(SCREEN_WIDTH);

export default function App() {
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(false);

  //function for location management//
  const ask = async () => {
    // ask for user permission to use location //
    //inside the returned object there is "granted"//
    // if permission is granted
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // if permission is not granted
    if (!granted) {
      setOk(false);
    }

    // get the user location after permission is granted
    const userLocation = await Location.getCurrentPositionAsync({
      accuracy: 5,
    });
    console.log(userLocation);
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      {/* city container */}
      <View style={styles.city}>
        <Text style={styles.cityName}>Dhaka</Text>
      </View>
      {/* weather container */}
      <ScrollView
        pagingEnabled
        horizontal
        contentContainerStyle={styles.weather}
      >
        {/* day containers */}
        <View style={styles.day}>
          <Text style={styles.temp}>25</Text>
          <Text style={styles.description}>Clear</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>25</Text>
          <Text style={styles.description}>Clear</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>25</Text>
          <Text style={styles.description}>Clear</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>25</Text>
          <Text style={styles.description}>Clear</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  cityName: {
    marginTop: 40,
    fontWeight: "500",
    fontSize: 60,
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    fontSize: 60,
    marginTop: -30,
  },
});
