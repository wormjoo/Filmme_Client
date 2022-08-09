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
  const [locList, setLocList] = useState([]);

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
    })();
    try {
      axios({
        method: "get",
        url:
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
          "key=" +
          mApiKey +
          "&location=" +
          latitude +
          "," +
          longitude +
          "&radius=5000" +
          "&name=인생네컷",
      })
        .then(function (response) {
          console.log(response.data.results[0].geometry.location.lat);
          const result = response.data.results;
          const list = [];
          for (let i = 0; i < result.length; i++) {
            list.push({
              lat: result[i].geometry.location.lat,
              lng: result[i].geometry.location.lng,
            });
          }
          setLocList(list);
        })
        .catch(function (error) {
          console.log(error);
          alert(error);
        });
    } catch (e) {
      alert(e);
    } finally {
    }
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const mark = (locList) => {
    for (let i = 0; i < locList.length; i++) {
      <Marker
        pinColor="#1E90FF"
        coordinate={{ latitude: locList[i].lat, longitude: locList[i].lng }}
      />;
    }
  };

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
        {locList.map((data, index) => {
          return (
            <Marker
              key={index}
              pinColor="#1E90FF"
              coordinate={{ latitude: data.lat, longitude: data.lng }}
            />
          );
        })}
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
    flex: 1,
    top: 20,
    width: "100%",
    height: "100%",
  },
});
