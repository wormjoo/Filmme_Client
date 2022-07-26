import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Fontisto from "react-native-vector-icons/Fontisto";
import PhotoStory from './src/screens/PhotoStory';
import Pose from './src/screens/Pose';
import SelectFrame from './src/screens/SelectFrame';
import Location from './src/screens/Location';
import MyPage from './src/screens/MyPage';
import Upload from "./src/screens/Upload";
import TakePic from './src/screens/TakePic';
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Detail_PhotoStory from "./src/screens/Detail_PhotoStory";
import Detail_Pose from "./src/screens/Detail_Pose";

export default function App() {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const BottomTabScreen = () => {
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
              size = focused ? 25 : 22;
              colour = focused ? "#505050" : "#C8C8C8";
            } else if (route.name === "Pose") {
              iconName = "angelist";
              size = focused ? 25 : 22;
              colour = focused ? "#505050" : "#C8C8C8";
            } else if (route.name === "SelectFrame") {
              iconName = "camera";
              size = focused ? 25 : 22;
              colour = focused ? "#505050" : "#C8C8C8";
            } else if (route.name === "Location") {
              iconName = "map-marker-alt";
              size = focused ? 25 : 22;
              colour = focused ? "#505050" : "#C8C8C8";
            } else if (route.name === "MyPage") {
              iconName = "person";
              size = focused ? 25 : 22;
              colour = focused ? "#505050" : "#C8C8C8";
            }

            return <Fontisto name={iconName} size={size} color={colour} />;
          },

        })}
      >
        <Tab.Screen name="PhotoStory" component={PhotoStory} />
        <Tab.Screen name="Pose" component={Pose} />
        <Tab.Screen name="SelectFrame" component={SelectFrame} />
        <Tab.Screen name="Location" component={Location} />
        <Tab.Screen name="MyPage" component={MyPage} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup}
          options={({ }) => ({
            title: "회원가입",
            headerShown: true,
            headerBackTitleVisible: false,
          })} /> */}
        <Stack.Screen name="Bottom" component={BottomTabScreen} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="TakePic" component={TakePic} />
        <Stack.Screen name="Detail_PhotoStory" component={Detail_PhotoStory} />
        <Stack.Screen name="Detail_Pose" component={Detail_Pose} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}