import React, { useContext } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { UserContext } from "../contexts/User";

const devWidth = Dimensions.get("window").width;

export default function Menu({ navigation }) {

    const { dispatch, user } = useContext(UserContext);

    // 로그아웃
    const _handleLogoutButtonPress = async () => {
        dispatch({});
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />

            <View style={styles.menuSection}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate("MyPage_ProudPose")}
                >
                    <Fontisto
                        name="angelist"
                        style={[styles.menuFont, { fontSize: 21 }]}
                    />
                    <Text style={styles.menuFont}> 내가 자랑한 포즈</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate("MyPage_LikedPose")}
                >
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
                <TouchableOpacity
                    onPress={_handleLogoutButtonPress}
                    style={{ margin: 10 }}
                >
                    <Text style={{ fontSize: 13, color: "#A8A8A8" }}>로그아웃</Text>
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
    menuSection: {
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    menuItem: {
        alignItems: "center",
        width: devWidth - 30, //350,
        padding: 15,
        borderBottomColor: "#E8E8E8",
        borderBottomWidth: 1,
        flexDirection: "row",
    },
    menuFont: {
        fontSize: 18,
        marginHorizontal: 5,
    },
});
