import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserContext } from "../contexts/User";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";

export default function Upload({ route, navigation }) {
  //이미지 업로드 여부
  const [upload, setupload] = useState(false);

  let storyIdx;
  if (route.params != undefined) {
    storyIdx = route.params.idx;
  }
  const { user, dispatch } = useContext(UserContext);

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const devHeight = Dimensions.get("window").height;

  //업로드 이미지@
  const [image, setImage] = useState(null);

  //메모 내용@
  const [content, setContent] = useState("");

  //달력
  const [date, setDate] = useState(new Date()); //날짜@
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  useEffect(() => {
    let isMount = true;
    try {
      if (storyIdx > 0) {
        axios({
          method: "get",
          url: "http://13.125.249.247/filme/story/" + storyIdx,
        })
          .then(function (response) {
            if (isMount) {
              const result = response.data;
              console.log(result);
              setDate(new Date(result[0].date.replace(/[.]/g, "-")));
              setImage(result[0].imageURL);
              setContent(result[0].content);
              setupload(true);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
      return () => {
        isMount = false;
      };
    }
  }, [storyIdx]);

  //이미지 가져오는 함수
  const pickImage = async () => {
    setupload(true);
    setModalVisible(!modalVisible);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
  };

  //메모 입력 함수
  const _handleContent = (content) => {
    setContent(content);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // 업로드버튼 클릭시
  const uploadButton = useCallback(async () => {
    try {
      if (!image) {
        Alert.alert("이미지를 포함하여 업로드해주세요.");
        return;
      }

      const form = new FormData();
      const filename = image.split("/").pop();
      const match = /\.(\w+)$/.exec(filename ?? "");
      const type = match ? `image/${match[1]}` : `image`;

      form.append(
        "date",
        date.getFullYear() +
          "-" +
          (date.getMonth() + 1 > 9
            ? (date.getMonth() + 1).toString()
            : "0" + (date.getMonth() + 1)) +
          "-" +
          (date.getDate() > 9
            ? date.getDate().toString()
            : "0" + date.getDate().toString())
      );
      form.append("content", content);
      form.append("image", { uri: image, name: filename, type });

      axios
        .post("http://13.125.249.247/filme/story/", form, {
          headers: {
            "x-access-token": `${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          dispatch({
            userIdx: user.userIdx,
            identification: user.identification,
            token: user.token,
          });
          navigation.dispatch(CommonActions.navigate("PhotoStory"));
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          alert("Error", error);
        });
    } catch (e) {
      alert(e);
    } finally {
    }
  }, [image, content, date, user, dispatch]);

  // 수정버튼 클릭시
  const editButton = useCallback(() => {
    try {
      axios
        .put("http://13.125.249.247/filme/story/" + storyIdx, {
          imageURL: `${image}`,
          content: `${content}`,
          date: `${
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1 > 9
              ? (date.getMonth() + 1).toString()
              : "0" + (date.getMonth() + 1)) +
            "-" +
            (date.getDate() > 9
              ? date.getDate().toString()
              : "0" + date.getDate().toString())
          }`,
        })
        .then(function (response) {
          dispatch({
            userIdx: user.userIdx,
            identification: user.identification,
            token: user.token,
          });
          navigation.dispatch(CommonActions.navigate("PhotoStory"));
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          alert("Error", error);
        });
    } catch (e) {
      alert(e);
    } finally {
    }
  }, [image, content, date, user, dispatch, storyIdx]);

  if (storyIdx > 0) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.photoSection}>
          <View style={styles.photoBox}>
            {upload ? null : (
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign
                  name="camerao"
                  style={{ fontSize: 30, color: "#505050" }}
                />
              </TouchableOpacity>
            )}
            {image && (
              <ImageBackground
                source={{ uri: image }}
                style={{ width: 330, height: 400, borderRadius: 10 }}
              ></ImageBackground>
            )}
          </View>
        </View>

        <View style={styles.memoSection}>
          <Text
            style={{
              alignSelf: "flex-start",
              marginLeft: 15,
              color: "#505050",
            }}
          >
            Memo
          </Text>
          <View style={styles.memoBox}>
            <TextInput
              style={{ width: "95%", margin: 10 }}
              value={content}
              multiline
              numberOfLines={8}
              onChangeText={_handleContent}
            />
          </View>
        </View>

        <View style={styles.dateSection}>
          <Text
            style={{
              alignSelf: "flex-start",
              marginLeft: 15,
              color: "#505050",
            }}
          >
            Date
          </Text>
          <View style={styles.dateBox}>
            <Text style={{ fontSize: 15 }}>{date.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={showDatepicker}>
              <AntDesign
                name="down"
                style={{ fontSize: 15, padding: 3, paddingLeft: 5 }}
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ButtonSection}>
          <TouchableOpacity style={styles.ButtonBox} onPress={editButton}>
            <Text style={{ fontSize: 15, color: "#505050" }}>수정</Text>
          </TouchableOpacity>
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
                  사진 첨부하기
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Ionic
                    name="close"
                    style={{
                      fontSize: 20,
                      color: "#505050",
                      textAlign: "right",
                    }}
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
                <TouchableOpacity
                  onPress={() => navigation.navigate("SelectFrame")}
                >
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
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.photoSection}>
          <View style={styles.photoBox}>
            {upload ? null : (
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign
                  name="camerao"
                  style={{ fontSize: 30, color: "#505050" }}
                />
              </TouchableOpacity>
            )}
            {image && (
              <ImageBackground
                source={{ uri: image }}
                style={{ width: 330, height: 400, borderRadius: 10 }}
              >
                {upload ? (
                  <TouchableOpacity onPress={delete_image}>
                    <AntDesign
                      name="minuscircle"
                      style={{
                        textAlign: "right",
                        fontSize: 25,
                        color: "rgba(90,90,90,0.8)",
                        padding: 5,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
              </ImageBackground>
            )}
          </View>
        </View>

        <View style={styles.memoSection}>
          <Text
            style={{
              alignSelf: "flex-start",
              marginLeft: 15,
              color: "#505050",
            }}
          >
            Memo
          </Text>
          <View style={styles.memoBox}>
            <TextInput
              style={{ width: "95%", margin: 10 }}
              value={content}
              multiline
              numberOfLines={8}
              onChangeText={_handleContent}
            />
          </View>
        </View>

        <View style={styles.dateSection}>
          <Text
            style={{
              alignSelf: "flex-start",
              marginLeft: 15,
              color: "#505050",
            }}
          >
            Date
          </Text>
          <View style={styles.dateBox}>
            <Text style={{ fontSize: 15 }}>{date.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={showDatepicker}>
              <AntDesign
                name="down"
                style={{ fontSize: 15, padding: 3, paddingLeft: 5 }}
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ButtonSection}>
          <TouchableOpacity style={styles.ButtonBox} onPress={uploadButton}>
            <Text style={{ fontSize: 15, color: "#505050" }}>업로드</Text>
          </TouchableOpacity>
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
                  사진 첨부하기
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Ionic
                    name="close"
                    style={{
                      fontSize: 20,
                      color: "#505050",
                      textAlign: "right",
                    }}
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
                <TouchableOpacity
                  onPress={() => navigation.navigate("SelectFrame")}
                >
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
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  photoSection: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  photoBox: {
    width: 350,
    height: 420,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  memoSection: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  memoBox: {
    width: 350,
    height: 80,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
  },
  dateSection: {
    margin: 10,
  },
  dateBox: {
    margin: 5,
    marginLeft: 17,
    flexDirection: "row",
  },
  ButtonSection: {
    marginBottom: 10,
    marginRight: 15,
    alignSelf: "flex-end",
  },
  ButtonBox: {
    width: 75,
    height: 35,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
