import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground, Modal, Dimensions, TextInput } from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionic from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

export default function MyPage() {

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
  const [nickname, setNickname] = useState('User_1');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />

      <View style={styles.header}>
        <View style={{ width: 40 }}></View>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>마이페이지</Text>
        <TouchableOpacity>
          <Feather name='menu' style={{ fontSize: 22, marginRight: 15 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <ImageBackground
          source={image ? { uri: image } : require("../../storage/images/basic-profile-img.png")}
          style={{ height: 120, width: 120 }}
          imageStyle={{ borderRadius: 100 }}
        >
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.cameraIcon}>
            <AntDesign name='camerao' style={{ fontSize: 22, color: "#505050" }} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.nickname}>
          {editName ? (
            <View style={{ borderBottomColor: "#C8C8C8", borderBottomWidth: 2 }}>
              <TextInput
                value={nickname}
                onChangeText={(text) => { setNickname(text); }}
                placeholder="닉네임"
                placeholderTextColor="#C8C8C8"
                autoCorrect={false}
                style={{ fontSize: 22, color: "#505050", fontWeight: 'bold' }}
              />
            </View>
          ) : (
            <View>
              <Text style={{ fontSize: 22, color: "#505050", fontWeight: 'bold' }}>
                {nickname}
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={() => setEditName(!editName)} style={styles.editIcon}>
            {editName ?
              <Feather name="check" style={{ fontSize: 12, color: "#505050" }} />
              : <Feather name="edit-2" style={{ fontSize: 12, color: "#505050" }} />}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.levelSection}>
        <View style={styles.levelBox}>
          <View style={styles.levelText}>
            <Text style={{ fontSize: 15 }}>
              6{" "}
              <AntDesign name='camera' style={{ fontSize: 17, color: "#505050" }} />
              {" "}until next Level
            </Text>
            <Text>
              Level 1
            </Text>
          </View>
          <View style={styles.levelBar}>
            <View style={styles.level}></View>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Fontisto name="angelist" style={[styles.menuFont, { fontSize: 21 }]} />
          <Text style={styles.menuFont}>  내가 자랑한 포즈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Fontisto name="heart-alt" style={styles.menuFont} />
          <Text style={styles.menuFont}> 좋아요한 포즈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <AntDesign name="notification" style={styles.menuFont} />
          <Text style={styles.menuFont}> 공지사항</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <AntDesign name="questioncircleo" style={styles.menuFont} />
          <Text style={styles.menuFont}> 문의하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 10 }}>
          <Text style={{ fontSize: 13, color: '#A8A8A8' }}>로그아웃</Text>
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

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  cameraIcon: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: "rgba(200,200,200,0.85)",
    borderRadius: 100,
  },
  nickname: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  editIcon: {
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 350,
    height: 70,
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
  },
  levelText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 15,
  },
  levelBar: {
    alignSelf: 'center',
    width: 320,
    height: 10,
    margin: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  level: {
    width: 120,
    height: 10,
    backgroundColor: "#C8C8C8",
    borderRadius: 20,
  },
  menuSection: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    alignItems: 'center',
    width: 350,
    padding: 15,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  menuFont: {
    fontSize: 18,
    marginHorizontal: 5,
  },
});
