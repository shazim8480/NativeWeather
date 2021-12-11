import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
// get the screen width //
const { width: SCREEN_WIDTH } = Dimensions.get("window");
// console.log(SCREEN_WIDTH);

//Api key for weather////////////////////////////////
const API_KEY = "934438edd5b84908df49f12cf8458950";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  // get address////////////////////////////////
  const [address, setAddress] = useState("...Patient");
  ////////////////////////////////
  const [forecast, setForecast] = useState([]);
  const [ok, setOk] = useState(false);

  //function for location + weather management//
  const getWeather = async () => {
    // ask for user permission to use location //
    //inside the returned object there is "granted"//
    // if permission is granted
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // if permission is not granted
    if (!granted) {
      setOk(false);
    }

    // get the user location after permission is granted
    //inside the returned object named "coords", we'll take "latitude", "longitude"//
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: 5,
    });
    // console.log(userLocation);

    // take the latitude, longitude and then use ReverseGeoCode to find the actual location details//
    // in short = Reverse geocode a location to postal address //
    const postalLocation = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    // console.log(postalLocation);
    setAddress(postalLocation[0]);

    //  get openWeatherMap API response/////////////
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=alerts,minutely&appid=${API_KEY}`
    );
    const json = await response.json();
    setForecast(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      {/* city container */}
      <View style={styles.city}>
        <Text style={styles.cityName}>
          {address.city}, {address.country}
        </Text>
        {/* street Container */}
        <View style={styles.street}>
          <Text style={styles.streetName}>{address.street}</Text>
        </View>
      </View>

      {/* weather container */}
      <ScrollView
        pagingEnabled
        horizontal
        contentContainerStyle={styles.weather}
      >
        {/* day containers */}
        {forecast.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#151629" />
          </View>
        ) : (
          forecast.map((day, idx) => (
            <View key={idx} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="#151629"
                />
              </View>
              <Text style={styles.description}>
                {day.weather[0].description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "oldlace",
  },
  city: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  cityName: {
    marginTop: 100,
    fontWeight: "600",
    fontSize: 35,
    color: "#2c3285",
  },
  streetName: {
    marginTop: 40,
    fontWeight: "500",
    fontSize: 22,
    marginTop: 10,
    color: "#151629",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
    color: "#2c3285",
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    fontWeight: "500",
    color: "#252752",
  },
});
