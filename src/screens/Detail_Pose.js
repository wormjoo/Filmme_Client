import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { UserContext } from "../contexts/User";
import axios from "axios";

export default function Detail_Pose({ route, navigation }) {
  const devWidth = Dimensions.get("window").width;
  const devHeight = Dimensions.get("window").height;

  const { idx } = route.params;
  const [userIdx, setUserIdx] = useState();
  const [profile, setProfile] = useState();
  const [nickname, setNickname] = useState();
  const [img, setImg] = useState();
  const [likeCnt, setLikeCnt] = useState();
  const [views, setViews] = useState();
  const [isLike, setIsLike] = useState(0);
  const { dispatch, user } = useContext(UserContext);

  useEffect(() => {
    try {
      axios({
        method: "get",
        headers: {
          "x-access-token": `${user?.token}`,
        },
        url: `http://13.125.249.247/filme/pose/${idx}`,
      })
        .then(function (response) {
          const result = response.data;
          console.log(result);
          setUserIdx(result[0].idx);
          setProfile(result[0].profileURL);
          setNickname(result[0].name);
          setImg(result[0].imageURL);
          setLikeCnt(result[0].likeCnt);
          setViews(result[0].views);
          setIsLike(result[0].isLike);
          console.log(isLike);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
    }
  }, []);

  const _handleLikePress = useCallback(async () => {
    try {
      axios({
        method: "post",
        url: "http://13.125.249.247/filme/like/" + idx,
        headers: {
          "x-access-token": `${user?.token}`,
        },
      })
        .then(function (response) {
          if (isLike == 0) {
            setIsLike(1);
            setLikeCnt(likeCnt + 1);
          } else {
            setIsLike(0);
            setLikeCnt(likeCnt - 1);
          }
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
  }, [user, idx, setIsLike, isLike, setLikeCnt, likeCnt]);

  /////////
  const [userNickname, setUserNickname] = useState("");
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

          setUserNickname(result.nickname);
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
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity
          onPress={
            userNickname === nickname
              ? () => navigation.navigate("MyPage")
              : () =>
                  navigation.navigate("FriendProfile", {
                    nickname: nickname,
                    profile: profile,
                  })
          }
        >
          <Image source={{ uri: `${profile}` }} style={styles.profile} />
        </TouchableOpacity>
        <Text style={styles.nickname}>{nickname}</Text>
      </View>

      <View style={styles.photoSection}>
        <ImageBackground
          source={require("../../storage/images/detail-pose.png")}
          style={{
            height: devHeight - 230,
            width: devWidth - 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={{ uri: img }} style={styles.img} />
        </ImageBackground>
      </View>

      <View style={styles.likesSection}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <AntDesign
              name={isLike ? "heart" : "hearto"}
              style={[{ color: isLike ? "tomato" : "black" }, styles.heart]}
              onPress={_handleLikePress}
            />
          </TouchableOpacity>
          <Text>{likeCnt}개</Text>
        </View>
        <Text>조회수 {views}회</Text>
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
    justifyContent: "center",
  },
  profileSection: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: "#AAAAAA",
    borderWidth: 3,
  },
  nickname: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 10,
  },
  photoSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    resizeMode: "contain",
    position: "relative",
    width: 220,
    height: 330,
    marginTop: 30,
  },
  likesSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  heart: {
    fontSize: 20,
    marginHorizontal: 7,
  },
});
