import React, { useState, useEffect, useContext, useCallback } from "react";
import { Platform, Text, View, StyleSheet, Alert, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapStyle from "../components/MarkerStyle";
import axios from "axios";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locList, setLocList] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android") {
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

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        maximumAge: 10000,
      });
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      console.log(longitude, latitude);
      let list = [];
      let length = 0;
      await axios
        .get(
          "https://dapi.kakao.com/v2/local/search/keyword?query=즉석사진" +
            "&x=" +
            longitude +
            "&y=" +
            latitude +
            "&radius=5000",
          {
            headers: {
              Authorization: "KakaoAK 593cba0bc3ea7f52024615b72630d3ee",
            },
          }
        )
        .then((res) => {
          const result = res.data.documents;
          for (let i = 0; i < result.length; i++) {
            list.push({
              id: i,
              lat: Number(result[i].y),
              lng: Number(result[i].x),
              name: result[i].place_name,
            });
          }
          length = result.length;
        })
        .catch((err) => {
          Alert.alert(err);
        });

      await axios
        .get(
          "https://dapi.kakao.com/v2/local/search/keyword?query=대여사진관" +
            "&x=" +
            longitude +
            "&y=" +
            latitude +
            "&radius=5000",
          {
            headers: {
              Authorization: "KakaoAK 593cba0bc3ea7f52024615b72630d3ee",
            },
          }
        )
        .then((res) => {
          const result = res.data.documents;
          for (let i = 0; i < result.length; i++) {
            list.push({
              id: length + i,
              lat: Number(result[i].y),
              lng: Number(result[i].x),
              name: result[i].place_name,
            });
          }
          setLocList(list);
        })
        .catch((err) => {
          Alert.alert(err);
        });
    })();
  }, [location]);

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
        showsMyLocationButton={true}
        showsUserLocation={true}
        customMapStyle={MapStyle}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005, //위도 확대(1에 가까워질 수록 zoom out)
          longitudeDelta: 0.001, //경도 확대
        }}
      >
        {locList.map((marker) => {
          return (
            <Marker
              key={marker.id}
              pinColor="#1E90FF"
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lng,
              }}
              title={marker.name}
              description={marker.name + "입니다"}
            >
              <Image
                source={require("../../storage/images/marker6.png")}
                style={{ height: 30, width: 23 }}
              />
            </Marker>
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
    marginBottom: 20,
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
