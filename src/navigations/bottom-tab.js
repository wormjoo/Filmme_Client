import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import PhotoStory from "../screens/PhotoStory";
import Pose from "../screens/Pose";
import SelectFrame from "../screens/SelectFrame";
import Location from "../screens/Location";
import MyPage from "../screens/MyPage";

const Tab = createBottomTabNavigator();

const BottomTabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="PhotoStory"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 65,
        },

        tabBarIcon: ({ focused, size, colour }) => {
          let iconName;
          if (route.name === "PhotoStory") {
            iconName = "picture";
            size = focused ? 15 : 18;
            colour = focused ? "#505050" : "#C8C8C8";
          } else if (route.name === "Pose") {
            iconName = "angelist";
            size = focused ? 19 : 22;
            colour = focused ? "#505050" : "#C8C8C8";
          } else if (route.name === "SelectFrame") {
            iconName = "camera";
            size = focused ? 16 : 19;
            colour = focused ? "#505050" : "#C8C8C8";
          } else if (route.name === "Location") {
            iconName = "map-marker-alt";
            size = focused ? 17 : 20;
            colour = focused ? "#505050" : "#C8C8C8";
          } else if (route.name === "MyPage") {
            iconName = "person";
            size = focused ? 17 : 20;
            colour = focused ? "#505050" : "#C8C8C8";
          }

          return <Fontisto name={iconName} size={size} color={colour} />;
        },
      })}
    >
      <Tab.Screen
        name="PhotoStory"
        component={PhotoStory}
        options={{
          title: "포토스토리",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
              <AntDesign
                name="plussquareo"
                style={{ fontSize: 22, marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Pose"
        component={Pose}
        options={{
          title: "포즈자랑",
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("UploadPose")}>
              <AntDesign
                name="plussquareo"
                style={{ fontSize: 22, marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="SelectFrame"
        component={SelectFrame}
        options={{
          title: "프레임선택",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          title: "포토부스위치",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          title: "마이페이지",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
              <Feather name="menu" style={{ fontSize: 22, marginRight: 15 }} />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
