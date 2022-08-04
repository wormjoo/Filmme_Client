import React, { useState, useEffect, useContext, useCallback } from "react";
import { Platform, Text, View, StyleSheet, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import axios from "axios";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [disabled, setDisabled] = useState(true);
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const _handleDetailAddressChange = (address) => {
    setDetailAddress(address);
  };

  const mApiKey = "AIzaSyBCIAtcRlEpIlXq1Rv9xYlsXz_Xav5mq0I";
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(Number(location.coords.latitude));
      setLongitude(Number(location.coords.longitude));
      console.log(latitude);
    })();
    try {
      axios({
        method: "fetch",
        url:
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          latitude +
          "," +
          longitude +
          "&key=" +
          mApiKey +
          "&language=ko",
        params: {},
        headers: {},
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(
            "udonPeople " + responseJson.results[0].formatted_address
          );
        })
        .catch((err) => console.log("udonPeople error : " + err));
    } finally {
    }
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005, //위도 확대(1에 가까워질 수록 zoom out)
          longitudeDelta: 0.001, //경도 확대
        }}
      >
        <Marker
          pinColor="#1E90FF"
          coordinate={{ latitude: latitude, longitude: longitude }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  map: {
    flex: 0.6,
    top: 20,
    width: "100%",
    height: "100%",
  },
});
