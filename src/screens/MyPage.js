import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";

export default function MyPage() {
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
          source={require("../../storage/images/basic-profile-img.png")}
          style={{ height: 120, width: 120 }}
          imageStyle={{ borderRadius: 100 }}
        >
          <TouchableOpacity style={styles.cameraIcon}>
            <AntDesign name='camerao' style={{ fontSize: 22, color: "#505050" }} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.nickname}>
          <Text style={{ fontSize: 22, color: "#505050", fontWeight: 'bold' }}>
            닉네임
          </Text>
          <TouchableOpacity style={styles.editIcon}>
            <Feather name="edit-2" style={{ fontSize: 12, color: "#505050" }} />
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
        <TouchableOpacity style={{margin:5}}>
          <Text style={{fontSize:13, color:'#A8A8A8'}}>로그아웃</Text>
        </TouchableOpacity>
      </View>

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
