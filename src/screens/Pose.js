import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Image, Modal, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const Images = [
  {
    id: '1',
    img: require("../../storage/images/photo-1.png"),
  },
  {
    id: '2',
    img: require("../../storage/images/photo-2.png"),
  },
  // {
  //   id: '3',
  //   img: require("../../storage/images/photo-3.png"),
  // },
  // {
  //   id: '4',
  //   img: require("../../storage/images/photo-4.png"),
  // },
];

const devWidth = Dimensions.get("window").width;
const userID = 'USER';


export default function Pose({ navigation }) {

  const Tab = createMaterialTopTabNavigator();

  const PopularPose = () => {
    //사진 있는지 여부
    const [hasImg, setHasImg] = useState(true);
    return (
      <View>
        {
          hasImg ? (
            <View style={styles.content_hasImg}>
              <FlatList
                data={Images}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ margin: 1 }}
                    onPress={() => navigation.navigate("Detail_Pose", {
                      img: item.img
                    })}
                    onLongPress={popup}
                  >
                    <Image source={item.img} style={styles.img} />
                  </TouchableOpacity>
                )}
                numColumns={3}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View style={styles.content_noImg}>
              <AntDesign name='camerao' style={{ fontSize: 85 }} />
              <Text style={{ fontSize: 22 }}>사진 없음</Text>
            </View>
          )
        }
      </View>
    );
  };

  const RecentPose = () => {
    //사진 있는지 여부
    const [hasImg, setHasImg] = useState(true);
    return (
      <View>
        {
          hasImg ? (
            <View style={styles.content_hasImg}>
              <FlatList
                data={Images}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ margin: 1 }}
                    onPress={() => navigation.navigate("Detail_Pose", {
                      img: item.img
                    })}
                    onLongPress={popup}
                  >
                    <Image source={item.img} style={styles.img} />
                  </TouchableOpacity>
                )}
                numColumns={3}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View style={styles.content_noImg}>
              <AntDesign name='camerao' style={{ fontSize: 85 }} />
              <Text style={{ fontSize: 22 }}>사진 없음</Text>
            </View>
          )
        }
      </View>
    );
  };

  //modal
  const [modalVisible, setModalVisible] = useState(false); //본인
  const [others_modalVisible, setOthers_ModalVisible] = useState(false); //상대방
  const devHeight = Dimensions.get("window").height;
  const popup = () => {
    if (userID === 'USER') {
      setModalVisible(!modalVisible);
    } else {
      setOthers_ModalVisible(!others_modalVisible);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />

      <View style={styles.header}>
        <View style={{ width: 40 }}></View>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>포즈자랑</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
          <AntDesign name='plussquareo' style={{ fontSize: 22, marginRight: 15 }} />
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={() => ({
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#C8C8C8",
            height: 1.5,
          },
        })}>
        <Tab.Screen name="인기 포즈" component={PopularPose} />
        <Tab.Screen name="최근 포즈" component={RecentPose} />
      </Tab.Navigator>

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
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#505050" }} >
                나의 포즈
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
              <TouchableOpacity>
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
              <TouchableOpacity>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={others_modalVisible}
        onRequestClose={() => {
          setOthers_ModalVisible(!others_modalVisible);
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
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#505050" }} >
                다른 사용자의 포즈
              </Text>
              <TouchableOpacity
                onPress={() => setOthers_ModalVisible(!others_modalVisible)}
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
              <TouchableOpacity>
                <AntDesign
                  name="sharealt"
                  style={{ fontSize: 65, color: "#505050" }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "#505050",
                  }}
                >
                  공유
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign
                  name="link"
                  style={{ fontSize: 65, color: "#505050" }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "#505050",
                  }}
                >
                  링크
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign
                  name="exclamationcircle"
                  style={{ fontSize: 65, color: "red" }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "#505050",
                  }}
                >
                  신고
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
  content_hasImg: {
    height: '100%',
    backgroundColor: '#fff',
    //alignItems: 'center',
    marginBottom: 65,
  },
  img: {
    width: devWidth / 3.1,
    height: 150,
  },
  content_noImg: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});