import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";

export default function Detail_PhotoStory({ route, navigation }) {
  const storyIdx = route.params.idx;
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState();

  const devWidth = Dimensions.get("window").width;
  const devHeight = Dimensions.get("window").height;

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: "http://13.125.249.247/filme/story/" + storyIdx,
      })
        .then(function (response) {
          const result = response.data;
          console.log(result);
          setDate(result[0].date);
          setImage(result[0].imageURL);
          setContent(result[0].content);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
    }
  }, [storyIdx]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.header}>
        <View style={{ width: 40 }}></View>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>{date}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
            <Feather
              name="edit-2"
              style={{ fontSize: 22, marginRight: 15, color: "#505050" }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather
              name="trash-2"
              style={{ fontSize: 22, marginRight: 15, color: "#505050" }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <ImageBackground
          source={require("../../storage/images/detail-photoStory.png")}
          style={{
            height: devHeight - 60,
            width: devWidth - 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={{ uri: image }} style={styles.img} />
          <View style={{ height: 70 }}></View>
          <Text style={{ color: "#505050" }}>{content}</Text>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    width: 150,
    height: 380,
  },
});
