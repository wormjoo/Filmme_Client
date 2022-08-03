import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import PhotoStory from "./src/screens/PhotoStory";
import Pose from "./src/screens/Pose";
import SelectFrame from "./src/screens/SelectFrame";
import Location from "./src/screens/Location";
import MyPage from "./src/screens/MyPage";
import Upload from "./src/screens/Upload";
import TakePic from "./src/screens/TakePic";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Detail_PhotoStory from "./src/screens/Detail_PhotoStory";
import Detail_Pose from "./src/screens/Detail_Pose";
import Photo from "./src/screens/Photo";
import MyPage_ProudPose from "./src/screens/MyPage_ProudPose";
import MyPage_LikedPose from "./src/screens/MyPage_LikedPose";
import UploadPose from "./src/screens/UploadPose";
import { UserContext, UserProvider } from "./src/contexts/User";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const BottomTabScreen = ({ navigation }) => {
    return (
      <Tab.Navigator
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
              fontSize: 17,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
                <AntDesign
                  name="plussquareo"
                  style={{ fontSize: 22, marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
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
              fontSize: 17,
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("UploadPose")}
              >
                <AntDesign
                  name="plussquareo"
                  style={{ fontSize: 22, marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="SelectFrame"
          component={SelectFrame}
          options={{
            title: "프레임선택",
            headerShown: true,
            headerTitleStyle: {
              fontSize: 17,
            },
          }}
        />
        <Tab.Screen
          name="Location"
          component={Location}
          options={{
            title: "포토부스위치",
            headerShown: true,
            headerTitleStyle: {
              fontSize: 17,
            },
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPage}
          options={{
            title: "마이페이지",
            headerShown: true,
            headerTitleStyle: {
              fontSize: 17,
            },
            headerRight: () => (
              <TouchableOpacity>
                <Feather
                  name="menu"
                  style={{ fontSize: 22, marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const { user } = useContext(UserContext);
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "로그인",
              headerShown: true,
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: 17,
              },
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: "회원가입",
              headerShown: true,
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: 17,
              },
            }}
          />
          <Stack.Screen name="Bottom" component={BottomTabScreen} />
          <Stack.Screen name="Upload" component={Upload} />
          <Stack.Screen name="TakePic" component={TakePic} />
          <Stack.Screen
            name="Detail_PhotoStory"
            component={Detail_PhotoStory}
          />
          <Stack.Screen name="Detail_Pose" component={Detail_Pose} />
          <Stack.Screen name="Photo" component={Photo} />
          <Stack.Screen name="MyPage_ProudPose" component={MyPage_ProudPose} />
          <Stack.Screen name="MyPage_LikedPose" component={MyPage_LikedPose} />
          <Stack.Screen name="UploadPose" component={UploadPose} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
