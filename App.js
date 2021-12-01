import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      {/* city container */}
      <View style={styles.city}>
        <Text style={styles.cityName}>Dhaka</Text>
      </View>
      {/* weather container */}
      <View style={styles.weather}>
        {/* day container */}
        <View style={styles.day}>
          <Text style={styles.temp}>25</Text>
          <Text style={styles.description}>Clear</Text>
        </View>
      </View>
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
  weather: {
    flex: 3,
  },
  day: {
    flex: 1,
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
