import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Detail_Pose({ route }) {

  const nickname = '닉네임';

  const devWidth = Dimensions.get("window").width;
  const devHeight = Dimensions.get("window").height;

  const { img } = route.params;

  //좋아요 클릭 여부
  const [likes, setLikes] = useState(false);
  //좋아요 수
  const num_of_likes = 0;
  //조회수
  const views = 123;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />

      <View style={styles.header}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>포즈자랑</Text>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity>
          <Image
            source={require("../../storage/images/basic-profile-img.png")}
            style={styles.profile} />
        </TouchableOpacity>
        <Text style={styles.nickname}>{nickname}</Text>
      </View>

      <View style={styles.photoSection}>
        <ImageBackground
          source={require("../../storage/images/detail-pose.png")}
          style={{ height: devHeight - 270, width: devWidth - 20, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={img} style={styles.img} />
        </ImageBackground>
      </View>

      <View style={styles.likesSection}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => setLikes(!likes)}>
            <AntDesign
              name={likes ? "heart" : "hearto"}
              style={[{ color: likes ? 'tomato' : 'black' }, styles.heart]} />
          </TouchableOpacity>
          <Text>{likes ? num_of_likes + 1 : num_of_likes}개</Text>
        </View>
        <Text>조회수 {views}회</Text>
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
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: '#AAAAAA',
    borderWidth: 3,
  },
  nickname: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  photoSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 150,
    height: 360,
    marginTop: 30,
  },
  likesSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  heart: {
    fontSize: 20,
    marginHorizontal: 7,
  },
});
