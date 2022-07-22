import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function Pose() {

  const Tab = createMaterialTopTabNavigator();

  const PopularPose = () => {
    return (
      <View style={styles.content}>
        <AntDesign name='camerao' style={{fontSize:85}}/>
        <Text style={{fontSize:22}}>사진 없음</Text>
      </View>
    );
  };

  const RecentPose = () => {
    return (
      <View style={styles.content}>
        <AntDesign name='camerao' style={{fontSize:85}}/>
        <Text style={{fontSize:22}}>사진 없음</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />

      <View style={styles.header}>
        <View style={{ width: 40 }}></View>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>포즈자랑</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
          <AntDesign name='plussquareo' style={{ fontSize: 22, marginRight: 15 }} />
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={() => ({
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#C8C8C8",
            height: 1.5,
          },
        })}>
        <Tab.Screen name="인기 포즈" component={PopularPose} />
        <Tab.Screen name="최근 포즈" component={RecentPose} />
      </Tab.Navigator>

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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});