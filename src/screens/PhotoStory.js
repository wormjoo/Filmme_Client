import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Modal,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { UserContext } from "../contexts/User";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;

const Item = React.memo(({ item: { id, img, date, content } }) => {
  //modal
  const [modalVisible, setModalVisible] = useState(false);

  const { user, dispatch } = useContext(UserContext);

  const navigation = useNavigation();

  const _handleEditPress = useCallback(() => {
    navigation.navigate("Upload", {
      idx: id,
      img: img,
      memo: content,
      date: date,
    });
  }, []);

  const _handleDeletePress = useCallback(() => {
    try {
      axios({
        method: "patch",
        url: "http://13.125.249.247/filme/story/" + id,
      })
        .then(function (response) {
          dispatch({
            userIdx: user.userIdx,
            identification: user.identification,
            token: user.token,
          });
          setModalVisible(!modalVisible);
          alert("삭제되었습니다.");
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
  }, [user, dispatch]);

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <TouchableOpacity
        style={{ margin: 1 }}
        onPress={() =>
          navigation.navigate("Detail_PhotoStory", {
            idx: id,
            date: date,
          })
        }
        onLongPress={() => setModalVisible(!modalVisible)}
      >
        <Image source={{ uri: img }} style={styles.img} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000AA",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              paddingHorizontal: 10,
              maxHeight: devHeight * 0.4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#505050" }}
              >
                수정/삭제
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Ionic
                  name="close"
                  style={{ fontSize: 20, color: "#505050", textAlign: "right" }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginHorizontal: 10,
                marginVertical: 20,
              }}
            >
              <TouchableOpacity onPress={_handleEditPress}>
                <Feather
                  name="edit-2"
                  style={{ fontSize: 60, color: "#505050" }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "#505050",
                  }}
                >
                  수정
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={_handleDeletePress}>
                <Feather
                  name="trash-2"
                  style={{ fontSize: 60, color: "#505050" }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "#505050",
                  }}
                >
                  삭제
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
});

export default function PhotoStory({ navigation }) {
  //사진 있는지 여부
  const [hasImg, setHasImg] = useState(true);

  const [story, setStory] = useState([]);
  const { user, dispatch } = useContext(UserContext);

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: "http://13.125.249.247/filme/story",
        headers: {
          "x-access-token": `${user?.token}`,
        },
      })
        .then(function (response) {
          const result = response.data;
          const list = [];
          for (let i = 0; i < result.length; i++) {
            list.push({
              id: result[i].idx,
              img: result[i].imageURL,
              content: result[i].content,
              date: result[i].date,
              memberIdx: result[i].memberIdx,
            });
          }
          setStory(list);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {hasImg ? (
        <FlatList
          data={story}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Item item={item} />}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.content_noImg}>
          <AntDesign name="camerao" style={{ fontSize: 85 }} />
          <Text style={{ fontSize: 22 }}>사진 없음</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  content_hasImg: {
    alignItems: "center",
    marginBottom: 65,
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    width: devWidth / 3.2,
    height: devWidth / 3.2,
    position: "relative",
  },
  content_noImg: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
