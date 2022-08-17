import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useLayoutEffect,
} from "react";
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
  ImageBackground,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { UserContext } from "../contexts/User";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const devWidth = Dimensions.get("window").width;

const Item = React.memo(
  ({ item: { id, img }, edit, count, setCount, storyIdx, setStoryIdx }) => {
    const [check, setCheck] = useState(false);
    const { user } = useContext(UserContext);

    const navigation = useNavigation();

    return (
      <View style={{ backgroundColor: "#fff" }}>
        <TouchableOpacity
          style={{ margin: 1 }}
          onPress={() => {
            setCheck(!check);
            console.log("start", check);
            check ? setCount(--count) : setCount(++count);
            check ? (storyIdx = null) : (storyIdx = id);
            setStoryIdx(storyIdx);
          }}
          disabled={count >= 1 && !check ? true : false}
        >
          <ImageBackground source={{ uri: img }} style={styles.img}>
            <TouchableOpacity
              style={{ alignItems: "flex-end", padding: 5 }}
              disabled={count >= 1 && !check ? true : false}
              onPress={() => {
                setCheck(!check);
                console.log("start", check);
                check ? setCount(--count) : setCount(++count);
                check ? (storyIdx = null) : (storyIdx = id);
                setStoryIdx(storyIdx);
              }}
            >
              <AntDesign
                name={check ? "checkcircle" : "checkcircleo"}
                style={{ fontSize: 20, color: "#C8C8C8" }}
              />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
);

export default function PhotoStory({ navigation }) {
  //사진 있는지 여부
  const [hasImg, setHasImg] = useState(true);

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const devHeight = Dimensions.get("window").height;

  const [story, setStory] = useState([]);
  const { dispatch, user } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [storyIdx, setStoryIdx] = useState();
  const [count, setCount] = useState(0);

  const _handleEditPress = useCallback(() => {
    try {
      const body = {
        storyIdx: storyIdx,
      };
      axios
        .post("http://13.125.249.247/filme/poseStory", body, {
          headers: {
            "x-access-token": `${user?.token}`,
          },
        })
        .then(function (response) {
          dispatch({
            userIdx: user.userIdx,
            identification: user.identification,
            token: user.token,
          });
          navigation.navigate("Pose");
          return;
        })
        .catch(function (error) {
          console.log(error);
          alert("Error", error);
        });
    } catch (e) {
    } finally {
    }
  }, [user, dispatch, storyIdx]);

  useEffect(() => {
    let isMount = true;
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
            });
          }
          if (isMount) {
            setStory(list);
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
  }, [user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={edit ? _handleEditPress : () => setEdit(!edit)}
          disabled={count == 1 ? false : true}
        >
          <Text style={{ fontSize: 18, color: "gray" }}>{"업로드"}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, edit, count]);

  return (
    <View style={styles.container}>
      {hasImg ? (
        <FlatList
          data={story}
          keyExtractor={(item) => item["id"].toString()}
          renderItem={({ item }) => (
            <Item
              item={item}
              edit={edit}
              count={count}
              setCount={setCount}
              storyIdx={storyIdx}
              setStoryIdx={setStoryIdx}
            />
          )}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.content_noImg}>
          <AntDesign name="camerao" style={{ fontSize: 85 }} />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
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
