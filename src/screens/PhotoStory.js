import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";

export default function PhotoStory ({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' barStyle='dark-content'/>

      <View style={styles.header}>
        <View style={{width:40}}></View>
        <Text style={{fontSize:22, fontWeight:'bold'}}>포토스토리</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
          <AntDesign name='plussquareo' style={{fontSize:22, marginRight:15}}/>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <AntDesign name='camerao' style={{fontSize:85}}/>
        <Text style={{fontSize:22}}>사진 없음</Text>
      </View>

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
      alignItems: 'center',
      justifyContent: 'center',
    },
  });