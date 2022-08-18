import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Upload from "../screens/Upload";
import TakePic from "../screens/TakePic";
import Detail_PhotoStory from "../screens/Detail_PhotoStory";
import Detail_Pose from "../screens/Detail_Pose";
import Detail_Location from "../screens/Detail_Location";
import Photo from "../screens/Photo";
import MyPage_ProudPose from "../screens/MyPage_ProudPose";
import MyPage_LikedPose from "../screens/MyPage_LikedPose";
import UploadPose from "../screens/UploadPose";
import SelectPhotoStory from "../screens/SelectPhotoStory";
import Menu from "../screens/Menu";
import FriendProfile from "../screens/FriendProfile";
import BottomTabScreen from "./bottom-tab";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Bottom"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Bottom" component={BottomTabScreen} />
      <Stack.Screen
        name="Upload"
        component={Upload}
        options={{
          title: "New Photo",
          headerShown: true,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="TakePic" component={TakePic} />
      <Stack.Screen
        name="Detail_PhotoStory"
        component={Detail_PhotoStory}
        options={({ route }) => ({
          title: route.params.date,
          headerShown: true,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="Detail_Pose"
        component={Detail_Pose}
        options={{
          title: " ",
          headerShown: true,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen
        name="MyPage_ProudPose"
        component={MyPage_ProudPose}
        options={{
          title: "내가 자랑한 포즈",
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="MyPage_LikedPose"
        component={MyPage_LikedPose}
        options={{
          title: "좋아요한 포즈",
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },

          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="UploadPose"
        component={UploadPose}
        options={{
          title: "New Pose",
          headerShown: true,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="SelectPhotoStory"
        component={SelectPhotoStory}
        options={{
          title: "스토리 선택",
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          title: "메뉴",
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="FriendProfile"
        component={FriendProfile}
        options={({ route }) => ({
          title: route.params.nickname + "'s pose",
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#636363",
          },
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="Detail_Location"
        component={Detail_Location}
        options={({ route }) => ({
          title: route.params.name,
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#636363",
          },
          headerTitleAlign: "center",
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
