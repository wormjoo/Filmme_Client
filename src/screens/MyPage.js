import React, {useState, useCallback, useContext, useEffect} from "react";
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
    FlatList,
    Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import Tooltip from "react-native-walkthrough-tooltip";
import LottieView from 'lottie-react-native';
import {UserContext} from "../contexts/User";
import axios from "axios";

const devWidth = Dimensions.get("window").width;

const Item = ({stamp, final, totalstamp}) => {
    const [showTip, setTip] = useState(false);
    return (
        <Tooltip
            isVisible={showTip}
            content={
                stamp ? (
                    <View>
                        <Text>스탬프 적립이 완료되었습니다!</Text>
                    </View>
                ) : (
                    <View>
                        <Text> 다음 레벨까지 {9 - totalstamp}개 남았습니다! </Text>
                    </View>
                )
            }
            onClose={() => setTip(false)}
            placement="bottom"
            //topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
        >
            <TouchableOpacity
                style={{
                    margin: 7,
                    borderWidth: 2,
                    borderRadius: 100,
                    borderColor: stamp ? "#505050" : "#C8C8C8",
                    backgroundColor: stamp ? "#E8E8E8" : "#FFFFFF",
                    padding: 15,
                    justifyContent: "center",
                }}
                onPress={() => setTip(true)}
            >
                {final ? (
                    <Text
                        style={{
                            textAlign: "center",
                            color: stamp ? "#505050" : "#C8C8C8",
                            fontSize: 15,
                            fontWeight: "900",
                        }}
                    >
                        Level {"\n"} UP
                    </Text>
                ) : (
                    <FontAwesome
                        name="hand-peace-o"
                        style={{
                            fontSize: devWidth * 0.11,
                            color: stamp ? "#505050" : "#C8C8C8",
                        }}
                    />
                )}
            </TouchableOpacity>
        </Tooltip>
    );
};

export default function MyPage({navigation}) {

    //이미지 업로드 여부
    const [upload, setupload] = useState(false);

    //modal
    const [modalVisible, setModalVisible] = useState(false);
    const devHeight = Dimensions.get("window").height;

    //좋아요,조회수 modal
    const [todayModalVisible, setTodayModalVisible] = useState(true);

    //업로드 이미지@
    const [updateImage, setUpdateImage] = useState(null);
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
            setUpdateImage(result.uri);
            updateProfileImage(updateImage);
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
            setUpdateImage(result.uri);
        }
    };

    //수정 발생 시
    const updateProfileImage = async (updateImage) => {
        console.log(updateImage);

        const form = new FormData();
        const filename = updateImage.split("/").pop();

        form.append("image", {
            uri: updateImage,
            name: filename,
            type: "multipart/form-data",
        });
        console.log(form);
        console.log(updateImage);

        axios
            .post("http://13.125.249.247/filme/mypage/edit-image", form, {
                headers: {
                    "x-access-token": `${user?.token}`,
                    "Content-Type": "multipart/form-data",
                },
            })

            .then((res) => {
                Alert.alert("변경 완료!");
                dispatch({
                    userIdx: user.userIdx,
                    identification: user.identification,
                    token: user.token,
                });
                navigation.navigate("MyPage");
            })
            .catch((err) => {
                console.log(err);
                Alert.alert("포즈 업로드 중 에러 발생");
                navigation.navigate("MyPage");
            });
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
    //레벨
    const [level, setLevel] = useState("");
    //도장개수
    const [totalstamp, setTotalstamp] = useState(0);

    const [stamp, setStamp] = useState([]);

    //오늘의 조회수
    const [todayView, setTodayView] = useState(17);
    //오늘의 좋아요수
    const [todayLikes, setTodayLikes] = useState(103);

    const renderItem = ({item}) => (
        <Item stamp={item.stamp} final={item.final} totalstamp={totalstamp}/>
    );

    const {dispatch, user} = useContext(UserContext);

    useEffect(() => {
        try {

            // 마이페이지 정보 조회 API 사용
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
                    setTotalstamp(result.totalStamp);
                    let list = [];

                    for (let i = 0; i < 9; i++) {
                        let status = false;
                        if (totalstamp > i) {
                            status = true;
                        }
                        list.push({
                            id: i + 1,
                            stamp: status,
                            final: i == 8,
                        });
                    }
                    setStamp(list);
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error);
                });

            // 오늘의 조회수, 좋아요 수 조회 API 사용
            axios({
                method: "get",
                url: "http://13.125.249.247/filme/mypage/today",
                headers: {
                    "x-access-token": `${user?.token}`,
                },
            })
                .then(function (response) {
                    const result = response.data[0];

                    setTodayView(result.viewCount);
                    setTodayLikes(result.likeCount);
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
    }, [user, stamp, setStamp, totalstamp]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content"/>

            <View style={styles.profileSection}>
                <ImageBackground
                    source={
                        image
                            ? {uri: image}
                            : require("../../storage/images/basic-profile-img.png")
                    }
                    style={{height: 120, width: 120}}
                    imageStyle={{borderRadius: 100}}
                >
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        style={styles.cameraIcon}
                    >
                        <AntDesign
                            name="camerao"
                            style={{fontSize: 22, color: "#505050"}}
                        />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.nickname}>
                    <View style={{marginRight: 10}}>
                        <Text style={{fontSize: 18, color: "#505050", fontWeight: "600"}}>
                            Lv {level}
                        </Text>
                    </View>
                    {editName ? (
                        <View
                            style={{borderBottomColor: "#C8C8C8", borderBottomWidth: 2}}
                        >
                            <TextInput
                                value={nickname}
                                onChangeText={(text) => {
                                    setNickname(text);
                                }}
                                placeholder="닉네임"
                                placeholderTextColor="#C8C8C8"
                                autoCorrect={false}
                                style={{fontSize: 22, color: "#505050", fontWeight: "bold"}}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text
                                style={{fontSize: 22, color: "#505050", fontWeight: "bold"}}
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
                                style={{fontSize: 12, color: "#505050"}}
                            />
                        ) : (
                            <Feather
                                name="edit-2"
                                style={{fontSize: 12, color: "#505050"}}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/*
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
      </View> */}

            <View style={styles.stampSection}>
                <View style={styles.stampBox}>
                    <View style={styles.stampText}>
                        <Text style={{fontSize: 15}}>스탬프 적립</Text>
                        <Text style={{fontSize: 12, color: "#505050"}}>
                            {totalstamp}/9
                        </Text>
                    </View>
                    <View style={styles.stamp}>
                        <FlatList
                            data={stamp}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                        />
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
                                style={{fontSize: 18, fontWeight: "600", color: "#505050"}}
                            >
                                프로필 사진 변경
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Ionic
                                    name="close"
                                    style={{fontSize: 20, color: "#505050", textAlign: "right"}}
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
                                    style={{fontSize: 65, color: "#505050"}}
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
                                    style={{fontSize: 65, color: "#505050"}}
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
                                    style={{fontSize: 60, color: "#505050"}}
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

            <Modal
                animationType="fade"
                transparent={true}
                visible={todayModalVisible}
                onRequestClose={() => {
                    setTodayModalVisible(!todayModalVisible);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "#000000AA",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            width: devWidth - 90,
                            height: devHeight * 0.33,
                            borderRadius: 20,
                        }}
                    >
                        <TouchableOpacity onPress={() => setTodayModalVisible(!todayModalVisible)}>
                            <Ionic
                                name="close"
                                style={{
                                    fontSize: 20,
                                    color: "#505050",
                                    textAlign: "right",
                                    padding: 5,
                                }}
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <LottieView
                                source={require("../../storage/images/11272-party-popper.json")}
                                style={{width: devWidth * 0.3,}}
                                autoPlay
                                loop
                            />
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                }}
                            >
                                <Text style={{color: 'red'}}>C</Text>
                                <Text style={{color: 'orange'}}>o</Text>
                                <Text style={{color: 'gold'}}>n</Text>
                                <Text style={{color: 'green'}}>g</Text>
                                <Text style={{color: 'skyblue'}}>r</Text>
                                <Text style={{color: 'navy'}}>a</Text>
                                <Text style={{color: 'purple'}}>t</Text>
                                <Text style={{color: 'red'}}>u</Text>
                                <Text style={{color: 'orange'}}>l</Text>
                                <Text style={{color: 'gold'}}>a</Text>
                                <Text style={{color: 'green'}}>t</Text>
                                <Text style={{color: 'skyblue'}}>i</Text>
                                <Text style={{color: 'navy'}}>o</Text>
                                <Text style={{color: 'purple'}}>n</Text>
                                <Text style={{color: 'red'}}>s</Text>
                                <Text style={{color: 'orange'}}>!</Text>
                                {'\n'}
                            </Text>
                            <Text style={{color: '#505050', fontSize: 15}}>오늘의 조회 수: {todayView}</Text>
                            <Text style={{color: '#505050', fontSize: 15}}>오늘의 좋아요 수: {todayLikes}</Text>
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
    stampSection: {
        margin: 10,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    stampBox: {
        width: devWidth - 60, //350,
        //backgroundColor: "#fff",
        borderRadius: 20,
        borderColor: "#E8E8E8",
        borderWidth: 2,
    },
    stampText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginTop: 15,
    },
    stamp: {
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
});
