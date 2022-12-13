import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Alert, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import SelectDropdown from "react-native-select-dropdown";
import * as Location from "expo-location";
import AntDesign from "react-native-vector-icons/AntDesign";
import MapStyle from "../components/MarkerStyle";
import axios from "axios";

export default function App({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(37.3229201258147);
  const [longitude, setLongitude] = useState(127.12706581005759);
  const [locList, setLocList] = useState([]);
  const photobox = ["전체", "인생네컷", "포토이즘", "하루필름", "포토시그니처"];

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
              address: result[i].road_address_name,
              url: result[i].place_url,
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
              address: result[i].road_address_name,
              url: result[i].place_url,
            });
          }
          setLocList(list);
        })
        .catch((err) => {
          Alert.alert(err);
        });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const getPhotoBox = async (photoName) => {
    let list = [];
    let length = 0;
    if (photoName == "전체") {
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
              address: result[i].road_address_name,
              url: result[i].place_url,
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
              address: result[i].road_address_name,
              url: result[i].place_url,
            });
          }
          setLocList(list);
        })
        .catch((err) => {
          Alert.alert(err);
        });
    } else {
      await axios
        .get(
          "https://dapi.kakao.com/v2/local/search/keyword?query=" +
            photoName +
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
              address: result[i].road_address_name,
              url: result[i].place_url,
            });
          }
          setLocList(list);
        })
        .catch((err) => {
          Alert.alert(err);
        });
    }
  };

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
        <SelectDropdown
          data={photobox}
          onSelect={(selectedItem, index) => {
            getPhotoBox(selectedItem);
          }}
          defaultValue={"전체"}
          dropdownIconPosition={"right"}
          buttonStyle={styles.locBtn}
          buttonTextStyle={styles.locBtnText}
          rowTextStyle={styles.rowText}
          renderDropdownIcon={() => (
            <AntDesign
              name="caretdown"
              style={styles.icon}
              color={"grey"}
              size={12}
            />
          )}
        />
        {locList.map((marker) => {
          return (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lng,
              }}
              title={marker.name}
              description={marker.address}
              onPress={() =>
                navigation.navigate("Detail_Location", {
                  url: marker.url,
                  name: marker.name,
                })
              }
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
  locBtn: {
    width: 150,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8e8e8",
  },
  locBtnText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 5,
  },
  rowText: {
    fontSize: 15,
  },
});
