import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { UserContext } from "../contexts/User";
import axios from "axios";

export default function Detail_PhotoStory({ route, navigation }) {
  const storyIdx = route.params.idx;
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState();

  const { user, dispatch } = useContext(UserContext);

  useEffect(() => {
    let isMount = true;
    try {
      axios({
        method: "get",
        url: "http://13.125.249.247/filme/story/" + storyIdx,
      })
        .then(function (response) {
          const result = response.data;
          console.log(result);
          if (isMount) {
            setDate(result[0].date);
            setImage(result[0].imageURL);
            setContent(result[0].content);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
      return () => {
        isMount = false;
      };
    }
  }, [storyIdx]);

  const _handleDeletePress = useCallback(async () => {
    try {
      axios({
        method: "patch",
        url: "http://13.125.249.247/filme/story/" + storyIdx,
      })
        .then(function (response) {
          dispatch({
            userIdx: user.userIdx,
            identification: user.identification,
            token: user.token,
          });
          alert("삭제되었습니다.");
          navigation.navigate("PhotoStory");
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
    }
  }, [user, dispatch, storyIdx]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Upload", {
                idx: storyIdx,
                img: image,
                memo: content,
                date: date,
              })
            }
          >
            <Feather
              name="edit-2"
              style={{ fontSize: 22, marginRight: 15, color: "#505050" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={_handleDeletePress}>
            <Feather
              name="trash-2"
              style={{ fontSize: 22, marginRight: 15, color: "#505050" }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ImageBackground
          source={require("../../storage/images/detail-photoStory.png")}
          style={{
            height: 620,
            width: 350,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={{ uri: image }} style={styles.img} />
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
    marginTop: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    resizeMode: "contain",
    position: "relative",
    top: -50,
    width: 230,
    height: 350,
  },
});
