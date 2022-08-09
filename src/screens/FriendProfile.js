import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { UserContext } from "../contexts/User";
import axios from "axios";

const devWidth = Dimensions.get("window").width;

export default function FriendProfile({ route }) {

    const { nickname, profile } = route.params;

    //레벨
    const [level, setLevel] = useState(1);

    //사진 있는지 여부
    const [hasImg, setHasImg] = useState(true);

    const [story, setStory] = useState([]);
    const { user } = useContext(UserContext);
    //임시
    useEffect(() => {
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
                            date: result[i].date,
                        });
                    }
                    setStory(list);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (e) {
            console.log(e);
            alert("Error", e);
        } finally {
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />

            <View style={styles.profileSection}>
                <Image
                    source={{ uri: `${profile}` }}
                    style={{ height: 120, width: 120, borderRadius: 100 }}
                />
                <View style={styles.nickname}>
                    <View style={{ marginRight: 10 }}>
                        <Text style={{ fontSize: 18, color: "#505050", fontWeight: "600" }}>
                            Lv {level}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 22, color: "#505050", fontWeight: "bold" }}>
                            {nickname}
                        </Text>
                    </View>
                </View>
            </View>

            {hasImg ? (
                <FlatList
                    data={story}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ margin: 1 }}
                            onPress={() =>
                                navigation.navigate("Detail_PhotoStory", {
                                    idx: item.id,
                                    date: item.date,
                                })
                            }
                            onLongPress={() => setModalVisible(!modalVisible)}
                        >
                            <Image source={{ uri: item.img }} style={styles.img} />
                        </TouchableOpacity>
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

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    profileSection: {
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
    },
    nickname: {
        flexDirection: "row",
        marginVertical: 10,
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
