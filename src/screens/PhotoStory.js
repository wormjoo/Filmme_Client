import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Dimensions, Image, Modal } from 'react-native';
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


export default function PhotoStory({ navigation }) {

  //사진 있는지 여부
  const [hasImg, setHasImg] = useState(true);

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const devHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />

      <View style={styles.header}>
        <View style={{ width: 40 }}></View>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>포토스토리</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
          <AntDesign name='plussquareo' style={{ fontSize: 22, marginRight: 15 }} />
        </TouchableOpacity>
      </View>

      {hasImg ? (
        <FlatList
          data={Images}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ margin: 1 }}
              onPress={() => navigation.navigate("Detail_PhotoStory", { img: item.img })}
              onLongPress={() => setModalVisible(!modalVisible)}
            >
              <Image source={item.img} style={styles.img} />
            </TouchableOpacity>
          )}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.content_noImg}>
          <AntDesign name='camerao' style={{ fontSize: 85 }} />
          <Text style={{ fontSize: 22 }}>사진 없음</Text>
        </View>
      )}

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
    alignItems: 'center',
    marginBottom: 65,
  },
  img: {
    width: devWidth / 3.1,
    height: 150,
  },
});