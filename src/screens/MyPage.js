import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../contexts/User";
import axios from "axios";

const devWidth = Dimensions.get("window").width;

export default function MyPage({ navigation }) {
  //이미지 업로드 여부
  const [upload, setupload] = useState(false);

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const devHeight = Dimensions.get("window").height;

  //업로드 이미지@
  const [image, setImage] = useState(null);

  //이미지 가져오는 함수
  const pickImage = async () => {
    setupload(true);
    setModalVisible(!modalVisible);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    } else if (result.cancelled) {
      setupload(false);
    }
  };

  //카메라 함수
  const camera = async () => {
    setupload(true);
    setModalVisible(!modalVisible);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    } else if (result.cancelled) {
      setupload(false);
    }
  };

  //이미지 삭제 함수
  const delete_image = async () => {
    setImage(null);
    setupload(false);
    setModalVisible(!modalVisible);
  };

  //닉네임 편집 버튼 클릭 여부
  const [editName, setEditName] = useState(false);

  //닉네임
  const [nickname, setNickname] = useState("");
  const [level, setLevel] = useState("");

  const { dispatch, user } = useContext(UserContext);

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: "http://13.125.249.247/filme/mypage/myinfo",
        headers: {
          "x-access-token": `${user?.token}`,
        },
      })
        .then(function (response) {
          const result = response.data[0];

          setNickname(result.nickname);
          setImage(result.profileURL);
          setLevel(result.level);
        })
        .catch(function (error) {
          console.log(error);
          alert(error);
        });
    } catch (e) {
      console.log(e);
      alert(e);
    } finally {
    }
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.profileSection}>
        <ImageBackground
          source={
            image
              ? { uri: image }
              : require("../../storage/images/basic-profile-img.png")
          }
          style={{ height: 120, width: 120 }}
          imageStyle={{ borderRadius: 100 }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.cameraIcon}
          >
            <AntDesign
              name="camerao"
              style={{ fontSize: 22, color: "#505050" }}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.nickname}>
          {editName ? (
            <View
              style={{ borderBottomColor: "#C8C8C8", borderBottomWidth: 2 }}
            >
              <TextInput
                value={nickname}
                onChangeText={(text) => {
                  setNickname(text);
                }}
                placeholder="닉네임"
                placeholderTextColor="#C8C8C8"
                autoCorrect={false}
                style={{ fontSize: 22, color: "#505050", fontWeight: "bold" }}
              />
            </View>
          ) : (
            <View>
              <Text
                style={{ fontSize: 22, color: "#505050", fontWeight: "bold" }}
              >
                {nickname}
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => setEditName(!editName)}
            style={styles.editIcon}
          >
            {editName ? (
              <Feather
                name="check"
                style={{ fontSize: 12, color: "#505050" }}
              />
            ) : (
              <Feather
                name="edit-2"
                style={{ fontSize: 12, color: "#505050" }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.levelSection}>
        <View style={styles.levelBox}>
          <View style={styles.levelText}>
            <Text style={{ fontSize: 15 }}>
              6{" "}
              <AntDesign
                name="camera"
                style={{ fontSize: 17, color: "#505050" }}
              />{" "}
              until next Level
            </Text>
            <Text>Level {level}</Text>
          </View>
          <View style={styles.levelBar}>
            <View style={styles.level}></View>
          </View>
        </View>
      </View>


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
                프로필 사진 변경
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
              <TouchableOpacity onPress={pickImage}>
                <AntDesign
                  name="picture"
                  style={{ fontSize: 65, color: "#505050" }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "#505050",
                  }}
                >
                  갤러리
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={camera}>
                <AntDesign
                  name="camerao"
                  style={{ fontSize: 65, color: "#505050" }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "#505050",
                  }}
                >
                  카메라
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={delete_image}>
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
                  사진 삭제
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  profileSection: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  cameraIcon: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    backgroundColor: "rgba(200,200,200,0.85)",
    borderRadius: 100,
  },
  nickname: {
    flexDirection: "row",
    marginTop: 10,
  },
  editIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    marginLeft: 2,
    backgroundColor: "rgba(200,200,200,0.85)",
    borderRadius: 100,
  },
  levelSection: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  levelBox: {
    width: devWidth - 60, //350,
    height: 70,
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
  },
  levelText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 15,
  },
  levelBar: {
    alignSelf: "center",
    width: devWidth - 90, //320,
    height: 10,
    margin: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  level: {
    width: 120, //
    height: 10,
    backgroundColor: "#C8C8C8",
    borderRadius: 20,
  },
});
